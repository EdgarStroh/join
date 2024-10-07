/**
 * Handles the user signup process.
 * Prevents the default form submission, validates the form, collects user data,
 * posts the data, adds the user to contacts, and handles signup success.
 *
 * @param {Event} event - The event object representing the form submission.
 */
function signUpUser(event) {
  event.preventDefault();

  if (!isFormValid()) return;

  const userData = collectUserData();
  postDataUsers("", userData);
  addUserToContacts(userData);
  handleSignUpSuccess();
  // updateContacts();
}

/**
 * Validates if the email has the correct format.
 *
 * @returns {boolean} True if the email format is valid; otherwise, false.
 */
function isEmailValid() {
  const email = document.getElementById("inputEmail").value.trim();
  const emailError = document.getElementById("emailError");

  // Simple regex pattern to validate email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;    

  if (!emailPattern.test(email)) {
    emailError.innerHTML = "Please enter a valid email address.";
    return false;
  } else {
    emailError.innerHTML = "";
    return true;
  }
}

/**
 * Validates the signup form by checking if the checkbox is checked,
 * passwords match, all fields are filled, and the email is valid.
 *
 * @returns {boolean} True if the form is valid; otherwise, false.
 */
function isFormValid() {
  const isChecked = document.getElementById("checkboxLogin1").checked;
  const passwordsMatch = checkPasswords();
  const fieldsFilled = areFieldsFilled();
  const emailValid = isEmailValid();

  return isChecked && passwordsMatch && fieldsFilled && emailValid;
}

/**
 * Checks if the password and confirm password fields match.
 *
 * @returns {boolean} True if passwords match; otherwise, false.
 */
function checkPasswords() {
  const password = document.getElementById("signupPassword").value;
  const confirmPassword = document.getElementById(
    "signupConfirmPassword"
  ).value;
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

/**
 * Sets the input error class on password fields based on the error state.
 *
 * @param {boolean} hasError - Indicates whether there is an error.
 */
function setInputError(hasError) {
  const action = hasError ? "add" : "remove";

  document.getElementById("signupPassword").classList[action]("input-error");
  document
    .getElementById("signupConfirmPassword")
    .classList[action]("input-error");
}

/**
 * Checks if all required fields are filled in the signup form.
 *
 * @returns {boolean} True if all fields are filled; otherwise, false.
 */
function areFieldsFilled() {
  return (
    document.getElementById("inputName").value.trim() !== "" &&
    document.getElementById("inputEmail").value.trim() !== "" &&
    document.getElementById("signupPassword").value.trim() !== "" &&
    document.getElementById("signupConfirmPassword").value.trim() !== ""
  );
}

/**
 * Collects user data from the signup form.
 *
 * @returns {Object} An object containing the user's name, email, password, and a random color.
 */
function collectUserData() {
  return {
    name: document.getElementById("inputName").value.trim(),
    email: document.getElementById("inputEmail").value.trim(),
    password: document.getElementById("signupPassword").value.trim(),
    color: getRandomColor(),
  };
}

/**
 * Adds the newly signed-up user to the contacts.
 *
 * @param {Object} userData - The user data object containing name, email, and color.
 */
function addUserToContacts(userData) {
  const contactData = {
    name: userData.name,
    email: userData.email,
    phone: "", // No phone number in the form
    color: userData.color,
  };
  postDataContacts("", contactData);
}

/**
 * Handles the actions to take upon successful signup.
 * Clears the form, closes the popup, and shows the success popup.
 */
function handleSignUpSuccess() {
  clearForm();
  // closePopup();
  showPopupRegister();
}

/**
 * Clears all fields in the signup form.
 */
function clearForm() {
  document.getElementById("inputName").value = "";
  document.getElementById("inputEmail").value = "";
  document.getElementById("signupPassword").value = "";
  document.getElementById("signupConfirmPassword").value = "";
  document.getElementById("checkboxLogin1").checked = false;
}

/**
 * Checks if the password confirmation matches the password.
 *
 * @returns {void}
 */
function checkPasswordConfirmation() {
  const password = document.getElementById("signupPassword").value;
  const confirmPassword = document.getElementById(
    "signupConfirmPassword"
  ).value;
  const input = document.getElementById("signupConfirmPassword");

  input.setCustomValidity(
    password === confirmPassword ? "" : "Password must match"
  );
}

/**
 * Displays a success popup after user registration.
 */
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

/**
 * Closes the success popup and hides the overlay.
 */
function closePopupSuccess() {
  document.getElementById("popupOverlay").style.display = "none";
  document.getElementById("popupSuccess").style.display = "none";
  loadDataUsers("");
}

/**
 * Enables or disables the signup button based on form validation.
 */
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

/**
 * Adds input event listeners to form fields to enable the signup button
 * based on the current form state.
 */
function addInputEventListeners() {
  document
    .getElementById("inputName")
    .addEventListener("input", enableSignupButton);
  
  // Add the email validation event listener here
  document
    .getElementById("inputEmail")
    .addEventListener("input", () => {
      isEmailValid(); // Validate email format on input
      enableSignupButton();
    });
  
  document.getElementById("signupPassword").addEventListener("input", () => {
    checkPasswords();
    enableSignupButton();
    toggleIcon("signupPassword", "toggleSignupPasswordIcon");
  });
  
  document
    .getElementById("signupConfirmPassword")
    .addEventListener("input", () => {
      checkPasswords();
      enableSignupButton();
      toggleIcon("signupConfirmPassword", "toggleSignupConfirmPasswordIcon");
    });
  
  document
    .getElementById("checkboxLogin1")
    .addEventListener("change", enableSignupButton);
}

/**
 * Toggles the visibility icon based on the input field's content.
 *
 * @param {string} inputId - The ID of the input field.
 * @param {string} iconId - The ID of the icon element to toggle.
 */
function toggleIcon(inputId, iconId) {
  const inputField = document.getElementById(inputId);
  const icon = document.getElementById(iconId);

  if (inputField.value.length > 0) {
    icon.src = "../assets/icons/visibility_off.svg";
  } else {
    icon.src = "../assets/icons/lock.svg";
  }
}

/**
 * Toggles the visibility of the password input field.
 *
 * @param {string} inputId - The ID of the password input field.
 * @param {string} iconId - The ID of the icon element to toggle.
 */
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

// Add input event listeners once the DOM is fully loaded
document.addEventListener("DOMContentLoaded", addInputEventListeners);
