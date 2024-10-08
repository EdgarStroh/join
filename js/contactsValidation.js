/**
 * Checks if both name fields are empty and displays error messages if necessary.
 *
 * @param {string} name - The value of the regular name field.
 * @param {string} nameEdit - The value of the editable name field.
 * @param {HTMLElement} nameError - The element to display the error message for the regular name field.
 * @param {HTMLElement} nameErrorEdit - The element to display the error message for the editable name field.
 * @returns {boolean} - Returns true if both fields are empty, otherwise false.
 */
function areNameFieldsEmpty(name, nameEdit, nameError, nameErrorEdit) {
  if (!name && !nameEdit) {
    if (nameError) nameError.innerHTML = "Name cannot be empty.";
    if (nameErrorEdit) nameErrorEdit.innerHTML = "Name cannot be empty.";
    return true;
  }
  return false;
}

/**
 * Validates a name field against a given pattern and displays an error message if necessary.
 *
 * @param {string} nameValue - The value of the name field to be validated.
 * @param {HTMLElement} errorElement - The element to display the error message.
 * @param {RegExp} pattern - The regex pattern to validate the name.
 * @returns {boolean} - Returns true if the name is valid, otherwise false.
 */
function validateName(nameValue, errorElement, pattern) {
  if (nameValue && !pattern.test(nameValue)) {
    if (errorElement) errorElement.innerHTML = "Please enter a name.";
    return false;
  } else if (errorElement) {
    errorElement.innerHTML = ""; // Clears the error message if the name is valid
  }
  return true;
}

/**
 * Validates the name fields in the input elements.
 *
 * @returns {boolean} - Returns true if both names are valid, otherwise false.
 */
function isNameValid() {
  const name = document.getElementById("inputName")
    ? document.getElementById("inputName").value.trim()
    : null;
  const nameEdit = document.getElementById("inputEditName")
    ? document.getElementById("inputEditName").value.trim()
    : null;

  const nameError = document.getElementById("nameError");
  const nameErrorEdit = document.getElementById("nameErrorEdit");

  const namePattern = /[a-zA-Z]/;

  // Check if both name fields are empty
  if (areNameFieldsEmpty(name, nameEdit, nameError, nameErrorEdit)) {
    return false;
  }

  // Validate the regular name
  const isNameValid = validateName(name, nameError, namePattern);

  // Validate the editable name
  const isNameEditValid = validateName(nameEdit, nameErrorEdit, namePattern);

  return isNameValid && isNameEditValid;
}

/**
 * Checks if both email fields are empty and displays error messages if necessary.
 *
 * @param {string} email - The value of the regular email field.
 * @param {string} emailEdit - The value of the editable email field.
 * @param {HTMLElement} emailError - The element to display the error message for the regular email field.
 * @param {HTMLElement} emailErrorEdit - The element to display the error message for the editable email field.
 * @returns {boolean} - Returns true if both fields are empty, otherwise false.
 */
function areEmailFieldsEmpty(email, emailEdit, emailError, emailErrorEdit) {
  if (!email && !emailEdit) {
    if (emailError) emailError.innerHTML = "Email cannot be empty.";
    if (emailErrorEdit) emailErrorEdit.innerHTML = "Email cannot be empty.";
    return true;
  }
  return false;
}

/**
 * Validates an email address against a given pattern and displays an error message if necessary.
 *
 * @param {string} emailValue - The value of the email field to be validated.
 * @param {HTMLElement} errorElement - The element to display the error message.
 * @param {RegExp} pattern - The regex pattern to validate the email address.
 * @returns {boolean} - Returns true if the email address is valid, otherwise false.
 */
function validateEmailAddress(emailValue, errorElement, pattern) {
  if (emailValue && !pattern.test(emailValue)) {
    if (errorElement)
      errorElement.innerHTML = "Please enter a valid email address.";
    return false;
  } else if (errorElement) {
    errorElement.innerHTML = ""; // Clears the error message if the email address is valid
  }
  return true;
}

/**
 * Validates the email addresses in the input fields.
 *
 * @returns {boolean} - Returns true if both email addresses are valid, otherwise false.
 */
function isEditEmailValid() {
  const email = document.getElementById("inputEmail")
    ? document.getElementById("inputEmail").value.trim()
    : null;
  const emailEdit = document.getElementById("inputEditEmail")
    ? document.getElementById("inputEditEmail").value.trim()
    : null;

  const emailError = document.getElementById("emailError");
  const emailErrorEdit = document.getElementById("emailErrorEdit");

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Check if both email fields are empty
  if (areEmailFieldsEmpty(email, emailEdit, emailError, emailErrorEdit)) {
    return false;
  }

  // Validate the regular email address
  const isEmailValid = validateEmailAddress(email, emailError, emailPattern);

  // Validate the editable email address
  const isEmailEditValid = validateEmailAddress(
    emailEdit,
    emailErrorEdit,
    emailPattern
  );

  return isEmailValid && isEmailEditValid;
}

/**
 * Checks if both phone fields are empty and displays error messages if necessary.
 *
 * @param {string} phone - The value of the regular phone field.
 * @param {string} phoneEdit - The value of the editable phone field.
 * @param {HTMLElement} phoneError - The element to display the error message for the regular phone field.
 * @param {HTMLElement} phoneErrorEdit - The element to display the error message for the editable phone field.
 * @returns {boolean} - Returns true if both fields are empty, otherwise false.
 */
function arePhoneFieldsEmpty(phone, phoneEdit, phoneError, phoneErrorEdit) {
  if (!phone && !phoneEdit) {
    if (phoneError) phoneError.innerHTML = "Phone number cannot be empty.";
    if (phoneErrorEdit)
      phoneErrorEdit.innerHTML = "Phone number cannot be empty.";
    return true;
  }
  return false;
}

/**
 * Checks a phone number against a pattern and displays an error message if it doesn't match.
 *
 * @param {string} phoneValue - The value of the phone field.
 * @param {HTMLElement} errorElement - The element to display the error message.
 * @param {RegExp} pattern - The pattern to validate the phone number.
 * @returns {boolean} - Returns true if the phone number is valid, otherwise false.
 */
function validatePhoneNumber(phoneValue, errorElement, pattern) {
  if (phoneValue && !pattern.test(phoneValue)) {
    if (errorElement)
      errorElement.innerHTML = "Please enter a valid phone number.";
    return false;
  } else if (errorElement) {
    errorElement.innerHTML = ""; // Clears the error message if the number is valid
  }
  return true;
}

/**
 * Validates the phone numbers in the input fields.
 *
 * @returns {boolean} - Returns true if both phone numbers are valid, otherwise false.
 */
function isEditPhoneValid() {
  const phone = document.getElementById("inputPhone")
    ? document.getElementById("inputPhone").value.trim()
    : null;
  const phoneEdit = document.getElementById("inputEditPhone")
    ? document.getElementById("inputEditPhone").value.trim()
    : null;

  const phoneError = document.getElementById("phoneError");
  const phoneErrorEdit = document.getElementById("phoneErrorEdit");

  const phonePattern = /^\+?[0-9]{1,3}[\s]?[0-9\s]{6,15}$/;

  // Check if both phone fields are empty
  if (arePhoneFieldsEmpty(phone, phoneEdit, phoneError, phoneErrorEdit)) {
    return false;
  }

  // Validate the regular phone number
  const isPhoneValid = validatePhoneNumber(phone, phoneError, phonePattern);

  // Validate the phone number in edit mode
  const isPhoneEditValid = validatePhoneNumber(
    phoneEdit,
    phoneErrorEdit,
    phonePattern
  );

  return isPhoneValid && isPhoneEditValid;
}

/**
 * Handles the form submission for adding a new contact.
 * Prevents the default form submission behavior, validates input fields,
 * and adds the contact if all fields are valid.
 *
 * @param {Event} event - The form submission event.
 * @returns {Promise<void>} - A promise that resolves when the contact is added.
 */
async function handleSubmit(event) {
  event.preventDefault();

  let isFormValid = true;

  isFormValid = nameValidation(isFormValid);
  isFormValid = emailValidation(isFormValid);
  isFormValid = phoneValidation(isFormValid);

  if (!isFormValid) {
    return;
  }
  await addContact();
}

/**
 * Validates the phone number input field.
 * Displays an error message if the phone number is empty or does not match the expected pattern.
 *
 * @param {boolean} isFormValid - The current state of the form's validity.
 * @returns {boolean} - Returns the updated validity state of the form.
 */
function phoneValidation(isFormValid) {
  const phoneInput = document.getElementById("inputPhone");
  const phoneError = document.getElementById("phoneError");
  const phonePattern = /^\+?[0-9]{1,3}[\s]?[0-9\s]{6,15}$/;
  
  if (!phoneInput.value.trim()) {
    phoneError.innerHTML = "Phone number cannot be empty.";
    isFormValid = false;
  } else if (!phonePattern.test(phoneInput.value.trim())) {
    phoneError.innerHTML = "Please enter a valid phone number.";
    isFormValid = false;
  } else {
    phoneError.innerHTML = "";
  }
  
  return isFormValid;
}

/**
 * Validates the email input field.
 * Displays an error message if the email is empty or does not match the expected pattern.
 *
 * @param {boolean} isFormValid - The current state of the form's validity.
 * @returns {boolean} - Returns the updated validity state of the form.
 */
function emailValidation(isFormValid) {
  const emailInput = document.getElementById("inputEmail");
  const emailError = document.getElementById("emailError");
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  if (!emailInput.value.trim()) {
    emailError.innerHTML = "Email cannot be empty.";
    isFormValid = false;
  } else if (!emailPattern.test(emailInput.value.trim())) {
    emailError.innerHTML = "Please enter a valid email address.";
    isFormValid = false;
  } else {
    emailError.innerHTML = "";
  }
  
  return isFormValid;
}

/**
 * Validates the name input field.
 * Displays an error message if the name field is empty.
 *
 * @param {boolean} isFormValid - The current state of the form's validity.
 * @returns {boolean} - Returns the updated validity state of the form.
 */
function nameValidation(isFormValid) {
  const nameInput = document.getElementById("inputName");
  const nameError = document.getElementById("nameError");
  
  if (!nameInput.value.trim()) {
    nameError.innerHTML = "Name cannot be empty.";
    isFormValid = false;
  } else {
    nameError.innerHTML = "";
  }
  
  return isFormValid;
}

/**
 * Handles the form submission for editing an existing contact.
 * Prevents the default form submission behavior, validates input fields,
 * and updates the contact if all fields are valid.
 *
 * @param {Event} event - The form submission event.
 * @returns {Promise<void>} - A promise that resolves when the contact is edited.
 */
async function handleEditContact(event) {
  event.preventDefault(); // Prevents the default form submission behavior

  const isNameValidResult = isNameValid();
  const isEmailValidResult = isEditEmailValid();
  const isPhoneValidResult = isEditPhoneValid();

  // If any validation fails, stop the submission process
  if (!isNameValidResult || !isEmailValidResult || !isPhoneValidResult) {
    return;
  }

  const contactId = event.target.querySelector('button[type="submit"]').dataset
    .contactId;
  await editContact(contactId); // Edits the contact if all validations pass
}
