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

  const name = document.getElementById("inputEditName").value;
  const email = document.getElementById("inputEditEmail").value;
  const phone = document.getElementById("inputEditPhone").value;

  const originalContact = allContacts.find((contact) => contact.Uid === id);
  const originalIndex = allContacts.findIndex((contact) => contact.Uid === id);

  if (!originalContact) {
    console.error("Kontakt mit ID", id, "nicht gefunden!");
    return;
  }

  const updatedContact = {
    ...originalContact,
    name: name,
    email: email,
    phone: phone,
  };

  allContacts[originalIndex] = updatedContact;
  updateDataContact(id, updatedContact);
  closeEditContact();
  renderExtendedContact(originalIndex);
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

function toggleMenuMobile(uid, id) {
  let menuHidden = document.getElementById("mobileSubMenu");
  let menuContainer = document.getElementById("renderEditDelete");

  // Überprüfen, ob das Submenü bereits existiert
  if (menuHidden) {
    // Sichtbarkeit umschalten
    menuHidden.classList.toggle("hidden");
  } else {
    // Submenü erstellen
    menuHidden = document.createElement("div");
    menuHidden.id = "mobileSubMenu";
    menuHidden.className = "hidden"; // Hier kannst du die Klassen hinzufügen

    // Submenü-Inhalt hinzufügen
    menuHidden.innerHTML = `
      <a href="#" onclick="openEditContact('${id}')"><img src="../assets/icons/edit.svg">Edit</a>
      <a href="#" onclick="deleteDataContact('${uid}')"><img src="../assets/icons/delete.svg">Delete</a>
    `;
    
    // Submenü zum Container hinzufügen
    menuContainer.appendChild(menuHidden);
    // Sichtbarkeit des Submenüs jetzt einstellen
    menuHidden.classList.remove("hidden");
  }
}