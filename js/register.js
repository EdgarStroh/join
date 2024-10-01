function signUpUser(event) {
  event.preventDefault();

  if (!isFormValid()) return;

  const userData = collectUserData();
  postDataUsers("", userData);
  addUserToContacts(userData);
  handleSignUpSuccess();
  updateContacts();
}

function isFormValid() {
  const isChecked = document.getElementById("checkboxLogin1").checked;
  const passwordsMatch = checkPasswords();
  const fieldsFilled = areFieldsFilled();

  return isChecked && passwordsMatch && fieldsFilled;
}

function checkPasswords() {
  const password = document.getElementById("signupPassword").value;
  const confirmPassword = document.getElementById("signupConfirmPassword").value;
  const passwordError = document.getElementById("passwordError");

  if (password !== confirmPassword) {
    passwordError.innerHTML = "Your passwords don't match. Please try again.";
    setInputError(true);
  } else {
    passwordError.innerHTML = "";
    setInputError(false);
  }
  return password === confirmPassword;
}

function setInputError(hasError) {
  const action = hasError ? "add" : "remove";

  document.getElementById("signupPassword").classList[action]("input-error");
  document.getElementById("signupConfirmPassword").classList[action]("input-error");
}

function areFieldsFilled() {
  return (
    document.getElementById("inputName").value.trim() !== "" &&
    document.getElementById("inputEmail").value.trim() !== "" &&
    document.getElementById("signupPassword").value.trim() !== "" &&
    document.getElementById("signupConfirmPassword").value.trim() !== ""
  );
}

function collectUserData() {
  return {
    name: document.getElementById("inputName").value.trim(),
    email: document.getElementById("inputEmail").value.trim(),
    password: document.getElementById("signupPassword").value.trim(),
    color: getRandomColor(),
  };
}

function addUserToContacts(userData) {
  const contactData = {
    name: userData.name,
    email: userData.email,
    phone: "", // Keine Telefonnummer im Formular
    color: userData.color,
  };
  postDataContacts("", contactData);
}

function handleSignUpSuccess() {
  clearForm();
  closePopup();
  showPopupRegister();
}

function clearForm() {
  document.getElementById("inputName").value = "";
  document.getElementById("inputEmail").value = "";
  document.getElementById("signupPassword").value = "";
  document.getElementById("signupConfirmPassword").value = "";
  document.getElementById("checkboxLogin1").checked = false;
}

function checkPasswordConfirmation() {
  const password = document.getElementById("signupPassword").value;
  const confirmPassword = document.getElementById("signupConfirmPassword").value;
  const input = document.getElementById("signupConfirmPassword");

  input.setCustomValidity(
    password === confirmPassword ? "" : "Passwort muss übereinstimmen"
  );
}

function showPopupRegister() {
  const overlay = document.getElementById("popupOverlay");
  const success = document.getElementById("popupSuccess");

  overlay.style.display = "flex";
  success.style.display = "flex";
  success.style.opacity = "0"; 

  setTimeout(() => {
    success.style.opacity = "1"; 
  }, 1);

  setTimeout(closePopupSuccess, 1250);
}

function closePopupSuccess() {
  document.getElementById("popupOverlay").style.display = "none";
  document.getElementById("popupSuccess").style.display = "none";
  loadDataUsers("");
}

function enableSignupButton() {
  const isChecked = document.getElementById("checkboxLogin1").checked;
  const passwordsMatch = checkPasswords(); 
  const fieldsFilled = areFieldsFilled();

  document.getElementById("signUpButton").disabled = !(
    isChecked &&
    passwordsMatch &&
    fieldsFilled
  );
}

function addInputEventListeners() {
  document.getElementById("inputName").addEventListener("input", enableSignupButton);
  document.getElementById("inputEmail").addEventListener("input", enableSignupButton);
  document.getElementById("signupPassword").addEventListener("input", () => {
    checkPasswords(); 
    enableSignupButton();
    toggleIcon("signupPassword", "toggleSignupPasswordIcon");
  });
  document.getElementById("signupConfirmPassword").addEventListener("input", () => {
      checkPasswords(); 
      enableSignupButton();
      toggleIcon("signupConfirmPassword", "toggleSignupConfirmPasswordIcon");
    });
  document.getElementById("checkboxLogin1").addEventListener("change", enableSignupButton);
}

function toggleIcon(inputId, iconId) {
  const inputField = document.getElementById(inputId);
  const icon = document.getElementById(iconId);

  if (inputField.value.length > 0) {
    icon.src = "../assets/icons/visibility_off.svg";
  } else {
    icon.src = "../assets/icons/lock.svg";
  }
}

function togglePasswordVisibility(inputId, iconId) {
  const inputField = document.getElementById(inputId);
  const icon = document.getElementById(iconId);

  if (inputField && icon) {
    if (inputField.type === "password") {
      inputField.type = "text";
      icon.src = "../assets/icons/visibility.svg"; 
    } else {
      inputField.type = "password";
      icon.src = "../assets/icons/visibility_off.svg"; 
    }
  } else {
    console.error("Input field or icon not found. Check the IDs.");
  }
}

document.addEventListener("DOMContentLoaded", addInputEventListeners);
