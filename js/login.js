function openPopup() {
  document.getElementById("popupModal").style.display = "block";
  document.getElementById("sign_up_button_div").classList.add("displayNone");
}

function closePopup() {
  document.getElementById("popupModal").style.display = "none";
  document.getElementById("sign_up_button_div").classList.remove("displayNone");
}

function toggleCheckbox(labelId) {
  const label = document.getElementById(labelId);

  if (label.classList.contains("checked")) {
    label.classList.remove("checked");
  } else {
    label.classList.add("checked");
  }
}
function guestLogin() {
  localStorage.setItem("loggedInUser", "Guest");
  window.location.href = "summary.html";
}

function checkUser(email, password){
  const originalUser = allUsers.find((user) => user.email === email);

  if (!originalUser) {
    return false;
  }

  if (originalUser.password === password) {
    localStorage.setItem("loggedInUser", originalUser.name);
    return true;
  }
  return false;
}

function checkLogin() {
  let emailInput = document.getElementById("loginEmail");
  let passwordInput = document.getElementById("loginPassword");
  let email = emailInput.value;
  let password = passwordInput.value;

  emailInput.classList.remove("input-error");
  passwordInput.classList.remove("input-error");

  if (checkUser(email, password)) {
    window.location.href = "summary.html";
  } else {
    document.getElementById("loginError").innerHTML = generateErrorLogin();
    emailInput.classList.add("input-error");
    passwordInput.classList.add("input-error");
  }
}

function updateIcon() {
  let icon = document.getElementById("togglePasswordIcon");

  if (icon.src.includes("lock.svg")) {
    icon.src = "../assets/icons/visibility_off.svg";
  }
}

function togglePasswordVisibility() {
  let inputField = document.getElementById("loginPassword");
  let icon = document.getElementById("togglePasswordIcon");

  if (inputField.type === "password") {
    inputField.type = "text"; 
    icon.src = "../assets/icons/visibility.svg"; 
  } else {
    inputField.type = "password";
    icon.src = "../assets/icons/visibility_off.svg"; 
  }
}





