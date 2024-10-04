/**
 * Opens the popup modal and hides the sign-up button div.
 */
function openPopup() {
  document.getElementById("popupModal").style.display = "block";
  document.getElementById("sign_up_button_div").classList.add("displayNone");
}

/**
 * Closes the popup modal and shows the sign-up button div.
 */
function closePopup() {
  document.getElementById("popupModal").style.display = "none";
  document.getElementById("sign_up_button_div").classList.remove("displayNone");
}

/**
 * Toggles the checked state of a checkbox label.
 *
 * @param {string} labelId - The ID of the label element to toggle.
 */
function toggleCheckbox(labelId) {
  const label = document.getElementById(labelId);

  if (label.classList.contains("checked")) {
    label.classList.remove("checked");
  } else {
    label.classList.add("checked");
  }
}

/**
 * Logs in the user as a guest.
 * Sets the logged-in user to "Guest" in local storage and redirects to the summary page.
 */
function guestLogin() {
  localStorage.setItem("loggedInUser", "Guest");
  window.location.href = "summary.html";
}

/**
 * Checks if the provided email and password match a registered user.
 *
 * @param {string} email - The email of the user attempting to log in.
 * @param {string} password - The password of the user attempting to log in.
 * @returns {boolean} True if the user exists and the password matches; otherwise, false.
 */
function checkUser(email, password) {
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

/**
 * Checks the user's login credentials and handles the login process.
 *
 * @param {...HTMLElement} inputs - Optional input elements to remove error styling from.
 */
function checkLogin(...inputs) {
  const emailInput = document.getElementById("loginEmail");
  const passwordInput = document.getElementById("loginPassword");
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  inputs.forEach((input) => input.classList.remove("input-error"));

  if (checkUser(email, password)) {
    window.location.href = "summary.html";
  } else {
    handleLoginError(emailInput, passwordInput);
  }
}

/**
 * Handles login errors by displaying an error message and highlighting input fields.
 *
 * @param {HTMLElement} emailInput - The email input field.
 * @param {HTMLElement} passwordInput - The password input field.
 */
function handleLoginError(emailInput, passwordInput) {
  document.getElementById("loginError").innerHTML = generateErrorLogin();
  emailInput.classList.add("input-error");
  passwordInput.classList.add("input-error");
}

/**
 * Updates the visibility icon based on the input field's content.
 */
function updateLoginIcon() {
  let inputField = document.getElementById("loginPassword");
  let icon = document.getElementById("toggleLoginPasswordIcon");

  if (inputField.value.length > 0) {
    icon.src = "../assets/icons/visibility_off.svg";
  } else {
    icon.src = "../assets/icons/lock.svg";
  }
}

/**
 * Toggles the visibility of the password input field.
 * Changes the input type and updates the icon accordingly.
 */
function toggleLoginPasswordVisibility() {
  let inputField = document.getElementById("loginPassword");
  let icon = document.getElementById("toggleLoginPasswordIcon");

  if (inputField.type === "password") {
    inputField.type = "text";
    icon.src = "../assets/icons/visibility.svg";
  } else {
    inputField.type = "password";
    icon.src = "../assets/icons/visibility_off.svg";
  }
}
