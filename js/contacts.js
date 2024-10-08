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
