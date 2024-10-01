async function updateContacts() {
  await loadDataContacts("");
  renderContactList();
  checkLogin();
}

function openContact(id) {
  renderExtendedContact(id);
  toggleMenuMobile(id);
}

function addContact(isMobile = false) {
  let contactData = collectContactInputData(isMobile);
  postDataContacts("", contactData);
  resetContactForm(isMobile);
  closePopup();
  showPopupContact();
  updateContacts();
}
function closePopup() {
  const popupOverlay = document.getElementById("popupOverlay");
  const popupModal = document.getElementById("popupModal");
  popupOverlay.style.display = "none";
  popupModal.classList.remove("show");
  popupModal.classList.add("hide");
  document.body.classList.add('no-scroll');

  setTimeout(() => {
    popupModal.style.display = "none";
  }, 120);
}

function collectContactInputData(isMobile) {
  return {
    name: document.getElementById(isMobile ? "inputNameMobile" : "inputName").value,
    email: document.getElementById(isMobile ? "inputEmailMobile" : "inputEmail").value,
    phone: document.getElementById(isMobile ? "inputPhoneMobile" : "inputPhone").value,
    color: getRandomColor(),
  };
}

function resetContactForm(isMobile) {
  document.getElementById(isMobile ? "inputNameMobile" : "inputName").value = "";
  document.getElementById(isMobile ? "inputEmailMobile" : "inputEmail").value = "";
  document.getElementById(isMobile ? "inputPhoneMobile" : "inputPhone").value = "";
}

function renderExtendedContact(id) {
  let extendedContact = document.getElementById("extended_contact");

  extendedContact.innerHTML = "";
  extendedContact.classList.remove("slideIn", "show");

  extendedContact.innerHTML += generateExtendedContact(
    allContacts[id].name,
    allContacts[id].email,
    allContacts[id].phone,
    allContacts[id].color,
    allContacts[id].Uid,
    id
  );

  setTimeout(() => {
    extendedContact.classList.add("slideIn", "show");
  }, 10);
}

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

    html += generateContactContent(contact.name, contact.email, id,contact.color);
  });

  contactsContainer.innerHTML = html;
}

function mobileShowContact() {
  if (window.innerWidth < 800) {
    document.getElementById("contact_list").style.display = "none";
    document.getElementById("headline_contacts").style.display = "flex";
    document.getElementById("arrow_left_contact").style.display = "flex";
    document.getElementById("headline_contacts").style.left = "auto";
    document.getElementById("headline_contacts").style.width = "100%";
    document.getElementById("headline_contacts").style.height = "auto";
    document.getElementById("mobileAddButton").style.display = "none";
    document.getElementById("renderEditDelete").style.display = "flow";
    document.getElementById("contact_tools").classList.add("hidden")
  }
}

function mobileShowContactReverse() {
  document.getElementById("contact_list").style.display = "flex";
  document.getElementById("headline_contacts").style.display = "none";
  document.getElementById("arrow_left_contact").style.display = "none";
  document.getElementById("mobileAddButton").style.display = "flow";
  document.getElementById("renderEditDelete").style.display = "none";
  let menu = document.getElementById("mobileSubMenu");
  if (menu && !menu.classList.contains("hidden")) {
    menu.classList.add("hidden");
  }
}

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

async function handleDeleteRequest(url) {
  let response = await fetch(url, { method: "DELETE" });

  if (!response.ok)
    throw new Error("Fehler beim Löschen des Kontakts: " + response.statusText);
}

function clearExtendedContact() {
  const extendedContact = document.getElementById("extended_contact");

  if (extendedContact) {
    extendedContact.innerHTML = "";
  }
}

function editContact(id) {
  console.log(`editContact aufgerufen mit ID: ${id}`);

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

function updateAllContacts(id, updatedContact) {
  const index = allContacts.findIndex((contact) => contact.Uid === id);
  if (index !== -1) {
    allContacts[index] = updatedContact;
  }
}

function renderUpdatedContact(id) {
  const index = allContacts.findIndex((contact) => contact.Uid === id);
  renderExtendedContact(index);
}

function renderEditContact(id) {
  const selectedContact = allContacts[id];

  if (!selectedContact) {
    console.error("Kontakt mit ID", id, "nicht gefunden!");
    return "<p>Kontakt nicht gefunden</p>";
  }

  const editContactHTML = generateEditContact(selectedContact);
  document.getElementById("popupEditModal").innerHTML = editContactHTML;
}

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

function updateLocalContact(id, data) {
  const index = allContacts.findIndex((contact) => contact.Uid === id);
  if (index !== -1) {
    allContacts[index] = { ...allContacts[index], ...data };
  }
}

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

function closeEditContact() {
  togglePopup("popupEditOverlay", "popupEditModal", false);
}

function toggleMenuMobile() {
  if (window.innerWidth < 800) {
    document.getElementById("contact_tools").classList.toggle("hidden")
  }
}