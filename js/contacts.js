/**
 * Updates the list of contacts by loading them and rendering the contact list.
 *
 * @returns {Promise<void>} - A promise that resolves when the contacts are updated.
 */
async function updateContacts() {
  await loadDataContacts("");
  renderContactList();
  checkLogin();
}

/**
 * Opens the contact details for a specific contact.
 *
 * @param {number} id - The ID of the contact to open.
 */
function openContact(id) {
  renderExtendedContact(id);
  toggleMenuMobile(id);
}

/**
 * Adds a new contact and updates the contact list.
 *
 * @param {boolean} [isMobile=false] - Indicates if the action is on mobile.
 * @returns {Promise<void>} - A promise that resolves when the contact is added.
 */


async function addContact(isMobile = false) {
  let contactData = collectContactInputData(isMobile);
  try {
    await postDataContacts("", contactData);
    resetContactForm(isMobile);
    closePopup();
    await updateContacts();
    showPopupContact();
  } catch (error) {
    console.error("Fehler beim Hinzufügen des Kontakts:", error);
    alert("Es gab ein Problem beim Hinzufügen des Kontakts.");
  }
}
function validatePhoneInput(input) {
  // Remove all non-numeric characters
  input.value = input.value.replace(/\D/g, '');
}

/**
 * Closes the popup modal.
 */
function closePopup() {
  const popupOverlay = document.getElementById("popupOverlay");
  const popupModal = document.getElementById("popupModal");
  popupOverlay.style.display = "none";
  popupModal.classList.remove("show");
  popupModal.classList.add("hide");

  setTimeout(() => {
    popupModal.style.display = "none";
  }, 120);
}

/**
 * Collects contact input data from the form.
 *
 * @param {boolean} isMobile - Indicates if the form is on mobile.
 * @returns {Object} - The collected contact data.
 */
function collectContactInputData(isMobile) {
  return {
    name: document.getElementById(isMobile ? "inputNameMobile" : "inputName")
      .value,
    email: document.getElementById(isMobile ? "inputEmailMobile" : "inputEmail")
      .value,
    phone: document.getElementById(isMobile ? "inputPhoneMobile" : "inputPhone")
      .value,
    color: getRandomColor(),
  };
}

/**
 * Resets the contact form fields.
 *
 * @param {boolean} isMobile - Indicates if the form is on mobile.
 */
function resetContactForm(isMobile) {
  document.getElementById(isMobile ? "inputNameMobile" : "inputName").value =
    "";
  document.getElementById(isMobile ? "inputEmailMobile" : "inputEmail").value =
    "";
  document.getElementById(isMobile ? "inputPhoneMobile" : "inputPhone").value =
    "";
}

/**
 * Renders the extended view of a contact.
 *
 * @param {number} id - The ID of the contact to render.
 */
function renderExtendedContact(id) {
  const extendedContact = document.getElementById("extended_contact");

  resetContact(extendedContact);
  renderContactDetails(extendedContact, id);
  animateContact(extendedContact);
}

/**
 * Resets the extended contact view.
 *
 * @param {HTMLElement} extendedContact - The container for the extended contact view.
 */
function resetContact(extendedContact) {
  extendedContact.innerHTML = "";
  extendedContact.classList.remove("slideIn", "show");
}

/**
 * Renders the details of a contact into the extended contact view.
 *
 * @param {HTMLElement} extendedContact - The container for the extended contact view.
 * @param {number} id - The ID of the contact to display.
 */
function renderContactDetails(extendedContact, id) {
  extendedContact.innerHTML += generateExtendedContact(
    allContacts[id].name,
    allContacts[id].email,
    allContacts[id].phone,
    allContacts[id].color,
    allContacts[id].Uid,
    id
  );
}

/**
 * Animates the extended contact view to slide in.
 *
 * @param {HTMLElement} extendedContact - The container for the extended contact view.
 */
function animateContact(extendedContact) {
  requestAnimationFrame(() => {
    extendedContact.classList.add("slideIn");
    requestAnimationFrame(() => {
      extendedContact.classList.add("show");
    });
  });
}

/**
 * Renders the list of contacts.
 */
function renderContactList() {
  let contactsContainer = document.getElementById("contacts");
  contactsContainer.innerHTML = "";

  let currentLetter = "";
  let html = "";

  allContacts = Object.values(allContacts).sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  allContacts.forEach((contact, id) => {
    const firstLetter = contact.name.charAt(0).toUpperCase();

    if (firstLetter !== currentLetter) {
      currentLetter = firstLetter;
      html += generateLetterSectionHTML(currentLetter);
    }
    html += generateContactContent(
      contact.name,
      contact.email,
      id,
      contact.color
    );
  });

  contactsContainer.innerHTML = html;
}

/**
 * Displays the contact in mobile view.
 */
function mobileShowContact() {
  if (window.innerWidth < 800) {
    document.getElementById("contact_content").style.width = "0px";
    document.getElementById("contact_list").style.display = "none";
    document.getElementById("headline_contacts").style.display = "flex";
    document.getElementById("arrow_left_contact").style.display = "flex";
    document.getElementById("mobileAddButton").style.display = "none";
    document.getElementById("renderEditDelete").style.display = "flow";
    document.getElementById("contact_tools").classList.add("hidden");
    document.getElementById("contact_tools1").classList.add("hidden");
  }
}

/**
 * Reverses the mobile contact view to the contact list.
 */
function mobileShowContactReverse() {
  document.getElementById("contact_list").style.display = "flex";
  document.getElementById("contact_tools1").classList.add("hidden");
  document.getElementById("headline_contacts").style.display = "none";
  document.getElementById("arrow_left_contact").style.display = "none";
  document.getElementById("mobileAddButton").style.display = "flow";
  document.getElementById("renderEditDelete").style.display = "none";
  let menu = document.getElementById("mobileSubMenu");
  if (menu && !menu.classList.contains("hidden")) {
    menu.classList.add("hidden");
  }
}

/**
 * Copies the content of the contact tools into another container.
 */
function copyContactToolsContent() {
  const contactTools = document.getElementById("contact_tools");
  const contactTools1 = document.getElementById("contact_tools1");
  contactTools1.innerHTML = contactTools.innerHTML;
}

/**
 * Hides the contact tools with an animation.
 *
 * @param {HTMLElement} contactTools1 - The container for the contact tools.
 */
function hideContactTools(contactTools1) {
  setTimeout(() => {
    contactTools1.classList.add("slideOff");
  }, 1);

  setTimeout(() => {
    contactTools1.classList.add("hidden");
    contactTools1.classList.remove("slideOff");
  }, 400);
}

/**
 * Shows the contact tools.
 *
 * @param {HTMLElement} contactTools1 - The container for the contact tools.
 */
function showContactTools(contactTools1) {
  contactTools1.classList.remove("hidden");
}

/**
 * Toggles the mobile menu for the contact tools.
 */
function toggleMenuMobile() {
  if (window.innerWidth < 800) {
    const contactTools1 = document.getElementById("contact_tools1");
    copyContactToolsContent();

    if (!contactTools1.classList.contains("hidden")) {
      hideContactTools(contactTools1);
    } else {
      showContactTools(contactTools1);
    }
  }
}

/**
 * Deletes a contact from the database and updates the contact list.
 *
 * @param {string} uid - The unique identifier of the contact to delete.
 * @returns {Promise<void>} - A promise that resolves when the contact is deleted.
 */
async function deleteDataContact(uid) {
  try {
    await handleDeleteRequest(`${BASE_URL_Contact}/${uid}.json`);

    clearExtendedContact();
    updateContacts();
    closeEditContact();
  } catch (error) {
    console.error("Fehler beim Löschen des Kontakts:", error);
    alert("Es gab ein Problem beim Löschen des Kontakts.");
  }
}

/**
 * Handles the request to delete a contact from the server.
 *
 * @param {string} url - The URL to send the DELETE request to.
 * @returns {Promise<Response>} - The server response to the DELETE request.
 * @throws {Error} - Throws an error if the response is not successful.
 */
async function handleDeleteRequest(url) {
  let response = await fetch(url, { method: "DELETE" });

  if (!response.ok)
    throw new Error("Fehler beim Löschen des Kontakts: " + response.statusText);
}

/**
 * Clears the extended contact view.
 */
function clearExtendedContact() {
  const extendedContact = document.getElementById("extended_contact");

  if (extendedContact) {
    extendedContact.innerHTML = "";
  }
}

/**
 * Edits a contact's information and updates the contact list.
 *
 * @param {number} id - The ID of the contact to edit.
 */
function editContact(id) {
  const updatedContact = getUpdatedContact(id);
  if (!updatedContact) {
    console.error(`Kontakt mit ID ${id} nicht gefunden!`);
    return;
  }

  updateAllContacts(id, updatedContact);
  updateDataContact(id, updatedContact);
  closeEditContact();
  renderUpdatedContact(id);
}

function isNameValid() {
  const name = document.getElementById("inputName") ? document.getElementById("inputName").value.trim() : null; // Value for regular name
  const nameEdit = document.getElementById("inputEditName") ? document.getElementById("inputEditName").value.trim() : null; // Value for edit name

  const nameError = document.getElementById("nameError");
  const nameErrorEdit = document.getElementById("nameErrorEdit");

  // Regular expression to check for at least one letter (case insensitive)
  const namePattern = /[a-zA-Z]/;

  // Check if both inputs are empty or don't contain any letters
  if (!name && !nameEdit) {
    if (nameError) nameError.innerHTML = "Name cannot be empty.";
    if (nameErrorEdit) nameErrorEdit.innerHTML = "Name cannot be empty.";
    return false;
  }

  // Validate regular name
  if (name && !namePattern.test(name)) {
    if (nameError) nameError.innerHTML = "Please enter a name.";
    if (nameErrorEdit) nameErrorEdit.innerHTML = "";
    return false;
  } else {
    if (nameError) nameError.innerHTML = "";
  }

  // Validate edit name
  if (nameEdit && !namePattern.test(nameEdit)) {
    if (nameErrorEdit) nameErrorEdit.innerHTML = "Please enter at least one letter in the name.";
    return false;
  } else {
    if (nameErrorEdit) nameErrorEdit.innerHTML = "";
  }

  return true; // Return true if both names are valid or not present
}

/**
 * Validates if the email in the edit form has the correct format.
 *
 * @returns {boolean} True if the email format is valid; otherwise, false.
 */
function isEditEmailValid() {
  const email = document.getElementById("inputEmail") ? document.getElementById("inputEmail").value.trim() : null; // Value for regular email
  const emailEdit = document.getElementById("inputEditEmail") ? document.getElementById("inputEditEmail").value.trim() : null; // Value for edit email

  const emailError = document.getElementById("emailError");
  const emailErrorEdit = document.getElementById("emailErrorEdit");

  // Simple regex pattern to validate email
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Check if both inputs are empty
  if (!email && !emailEdit) {
    if (emailError) emailError.innerHTML = "Email cannot be empty.";
    if (emailErrorEdit) emailErrorEdit.innerHTML = "Email cannot be empty.";
    return false;
  }

  // Validate regular email
  if (email && !emailPattern.test(email)) {
    if (emailError) emailError.innerHTML = "Please enter a valid email address.";
    if (emailErrorEdit) emailErrorEdit.innerHTML = "";
    return false;
  } else {
    if (emailError) emailError.innerHTML = "";
  }

  // Validate edit email
  if (emailEdit && !emailPattern.test(emailEdit)) {
    if (emailErrorEdit) emailErrorEdit.innerHTML = "Please enter a valid email address.";
    return false;
  } else {
    if (emailErrorEdit) emailErrorEdit.innerHTML = "";
  }

  return true; // Return true if both emails are valid or not present
}

/**
 * Validates if the phone number in the edit form has the correct format.
 *
 * @returns {boolean} True if the phone number format is valid; otherwise, false.
 */
function isEditPhoneValid() {
  const phone = document.getElementById("inputPhone") ? document.getElementById("inputPhone").value.trim() : null; // Value for regular phone
  const phoneEdit = document.getElementById("inputEditPhone") ? document.getElementById("inputEditPhone").value.trim() : null; // Value for edit phone

  const phoneError = document.getElementById("phoneError");
  const phoneErrorEdit = document.getElementById("phoneErrorEdit");

  // Regular expression to validate phone numbers
  const phonePattern = /^\+?[0-9\s]{6,15}$/;

  // Check if both inputs are empty
  if (!phone && !phoneEdit) {
    if (phoneError) phoneError.innerHTML = "Phone number cannot be empty.";
    if (phoneErrorEdit) phoneErrorEdit.innerHTML = "Phone number cannot be empty.";
    return false;
  }

  // Validate regular phone
  if (phone && !phonePattern.test(phone)) {
    if (phoneError) phoneError.innerHTML = "Please enter a valid phone number.";
    if (phoneErrorEdit) phoneErrorEdit.innerHTML = "";
    return false;
  } else {
    if (phoneError) phoneError.innerHTML = "";
  }

  // Validate edit phone
  if (phoneEdit && !phonePattern.test(phoneEdit)) {
    if (phoneErrorEdit) phoneErrorEdit.innerHTML = "Please enter a valid phone number.";
    return false;
  } else {
    if (phoneErrorEdit) phoneErrorEdit.innerHTML = "";
  }

  return true; // Return true if both phone numbers are valid or not present
}


async function handleSubmit(event) {
  event.preventDefault(); // Prevent the default form submission

  // Validate email, phone number, and name
  if (!isNameValid() || !isEditEmailValid() || !isEditPhoneValid()) {
    return; // Exit the function if any of the validations fail
  }

  await addContact(); // Call the function to add the contact if validation passes
}

/**
 * Handles the edit form submission and updates the contact.
 *
 * @param {Event} event - The form submission event.
 */
async function handleEditContact(event) {
  event.preventDefault(); // Prevent the default form submission

  // Validate email, phone number, and name
  if (!isNameValid() || !isEditEmailValid() || !isEditPhoneValid()) {
    return; // Exit the function if any of the validations fail
  }

  const contactId = event.target.querySelector('button[type="submit"]').dataset.contactId;
  await editContact(contactId); // Call the function to edit the contact
}

/**
 * Retrieves the updated contact information from the edit form.
 *
 * @param {number} id - The ID of the contact to update.
 * @returns {Object|null} - The updated contact information or null if not found.
 */
function getUpdatedContact(id) {
  const name = document.getElementById("inputEditName").value;
  const email = document.getElementById("inputEditEmail").value;
  const phone = document.getElementById("inputEditPhone").value;

  const originalContact = allContacts.find((contact) => contact.Uid === id);
  if (!originalContact) return null;

  return {
    ...originalContact,
    name: name,
    email: email,
    phone: phone,
  };
}

/**
 * Updates the local contact list with the updated contact data.
 *
 * @param {number} id - The ID of the contact to update.
 * @param {Object} updatedContact - The updated contact data.
 */
function updateAllContacts(id, updatedContact) {
  const index = allContacts.findIndex((contact) => contact.Uid === id);
  if (index !== -1) {
    allContacts[index] = updatedContact;
  }
}

/**
 * Renders the updated contact details.
 *
 * @param {number} id - The ID of the contact to render.
 */
function renderUpdatedContact(id) {
  const index = allContacts.findIndex((contact) => contact.Uid === id);
  renderExtendedContact(index);
}

/**
 * Renders the edit form for a contact.
 *
 * @param {number} id - The ID of the contact to edit.
 */
function renderEditContact(id) {
  const selectedContact = allContacts[id];

  if (!selectedContact) {
    console.error("Kontakt mit ID", id, "nicht gefunden!");
    return "<p>Kontakt nicht gefunden</p>";
  }

  const editContactHTML = generateEditContact(selectedContact);
  document.getElementById("popupEditModal").innerHTML = editContactHTML;
}

/**
 * Updates the contact data in the database and the contact list.
 *
 * @param {number} id - The ID of the contact to update.
 * @param {Object} data - The updated contact data.
 * @returns {Promise<void>} - A promise that resolves when the contact is updated.
 */
async function updateDataContact(id, data) {
  try {
    await updateContactInFirebase(id, data);
    updateLocalContact(id, data);
    renderContactList();
  } catch (error) {
    console.error("Fehler beim Aktualisieren des Kontakts:", error);
    alert("Es gab ein Problem beim Aktualisieren des Kontakts.");
  }
}

/**
 * Updates the local contact list with the updated contact data.
 *
 * @param {number} id - The ID of the contact to update.
 * @param {Object} data - The updated contact data.
 */
function updateLocalContact(id, data) {
  const index = allContacts.findIndex((contact) => contact.Uid === id);
  if (index !== -1) {
    allContacts[index] = { ...allContacts[index], ...data };
  }
}

/**
 * Opens the edit modal for a contact.
 *
 * @param {number} id - The ID of the contact to edit.
 */
function openEditContact(id) {
  const selectedContact = allContacts[id];

  if (!selectedContact) {
    console.error("Kontakt mit ID", id, "nicht gefunden!");
    return;
  }

  const editContactHTML = generateEditContact(selectedContact);
  document.getElementById("popupEditModal").innerHTML = editContactHTML;

  togglePopup("popupEditOverlay", "popupEditModal", true);
}

/**
 * Closes the edit modal for a contact.
 */
function closeEditContact() {
  togglePopup("popupEditOverlay", "popupEditModal", false);
}
