async function updateContacts() {
  await loadDataContacts("");
  renderContactList();
  checkLogin();
}

function openContact(id) {
  renderExtendedContact(id);
  toggleMenuMobile(id);
}

function addContact() {
  let contactData = getContactFormData();
  postDataContacts("", contactData);
  resetContactForm();
  closePopup();
  showPopupContact();
  updateContacts();
}

function addContactMobile() {
  let contactData = getContactFormDataMobile();
  postDataContacts("", contactData);
  resetContactForm();
  closePopup();
  showPopupContact();
  updateContacts();
}

function getContactFormData() {
  return {
    name: document.getElementById("inputName").value,
    email: document.getElementById("inputEmail").value,
    phone: document.getElementById("inputPhone").value,
    color: getRandomColor(),
  };
}

function getContactFormDataMobile() {
  return {
    name: document.getElementById("inputNameMobile").value,
    email: document.getElementById("inputEmailMobile").value,
    phone: document.getElementById("inputPhoneMobile").value,
    color: getRandomColor(),
  };
}

function resetContactForm() {
  document.getElementById("inputName").value = "";
  document.getElementById("inputEmail").value = "";
  document.getElementById("inputPhone").value = "";
}

function resetContactFormMobile() {
  document.getElementById("inputNameMobile").value = "";
  document.getElementById("inputEmailMobile").value = "";
  document.getElementById("inputPhoneMobile").value = "";
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

    html += generateContactContent(
      contact.name,
      contact.email,
      id,
      contact.color
    );
  });

  contactsContainer.innerHTML = html;
}
function openPopupMobile() {
  const popupOverlay = document.getElementById("popupOverlayMobile");
  const popupModal = document.getElementById("popupModalMobile");

  popupOverlay.style.display = "flex";
  popupModal.style.display = "block";
  // popupModal.style.opacity = "1";
  // Entferne die `hide`-Klasse (falls vorhanden) und füge die `show`-Klasse hinzu
  popupModal.classList.remove("hide");
  popupModal.classList.add("show");

}
function closePopupMobile() {
  document.getElementById("popupOverlayMobile").style.display = "none";
  document.getElementById("popupModalMobile").style.display = "none";
}

function showPopupContact() {
  const overlay = document.getElementById("popupOverlay");
  const success = document.getElementById("popupContactSuccess");

  overlay.style.display = "flex";
  success.style.display = "flex";
  success.style.opacity = "0";

  setTimeout(() => {
    success.style.opacity = "1";
  }, 1);

  setTimeout(function () {
    closePopupSuccess();
  }, 1250);
}

function closePopupSuccess() {
  document.getElementById("popupOverlay").style.display = "none";
  document.getElementById("popupContactSuccess").style.display = "none";
  loadDataUsers("");
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

// window.addEventListener("load", () => {
//   let mobileMenuIcon = document.getElementById("mobileMenuIcon");

//   if (mobileMenuIcon) {
//     // Call the correct function toggleMenuMobile, not toggleMenu
//     mobileMenuIcon.addEventListener("click", toggleMenuMobile);
//   } else {
//     console.error("Das Menü-Icon wurde nicht gefunden.");
//   }
// });

async function deleteDataContact(uid) {
  try {
    await handleDeleteRequest(`${BASE_URL_Contact}/${uid}.json`);

    clearExtendedContact();
    updateContacts();
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

//    EDIT CONTACT   //

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

// document.querySelectorAll('.contact-item').forEach(item => {
//   item.addEventListener('click', () => {
//     const uid = item.getAttribute('data-uid'); // UID aus dem DOM-Attribut
//     const id = item.getAttribute('data-id');   // ID aus dem DOM-Attribut
//     toggleMenuMobile(uid, id);
//   });
// });

function toggleMenuMobile(id, uid) {
  // console.log("ID:", id); 
  // console.log("UID:", uid); 

  let menuHidden = document.getElementById("mobileSubMenu");
  let menuContainer = document.getElementById("renderEditDelete");

  if (menuHidden) {
    menuHidden.innerHTML = `
      <a href="#" onclick="openEditContact('${id}')"><img src="../assets/icons/edit.svg">Edit</a>
      <a href="#" onclick="deleteDataContact('${uid}')"><img src="../assets/icons/delete.svg">Delete</a>
    `;
  
    menuHidden.classList.toggle("hidden");
  } else {
    menuHidden = document.createElement("div");
    menuHidden.id = "mobileSubMenu";
    menuHidden.className = "hidden";
    menuHidden.innerHTML = `
      <a href="#" onclick="openEditContact('${id}')"><img src="../assets/icons/edit.svg">Edit</a>
      <a href="#" onclick="deleteDataContact('${uid}')"><img src="../assets/icons/delete.svg">Delete</a>
    `;

    menuContainer.appendChild(menuHidden);
    menuHidden.classList.remove("hidden");
  }
}