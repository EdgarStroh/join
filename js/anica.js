async function deleteDataContact(uid) {
  try {
    await handleDeleteRequest(`${BASE_URL_Contact}/${uid}.json`);

    removeContactFromUI(uid);
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

function removeContactFromUI(uid) {
  const contactElement = document.getElementById(`${uid}`);

  if (contactElement) {
    contactElement.remove();
  }
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

async function updateContactInFirebase(id, updatedContact) {
  try {
    const response = await fetch(`${BASE_URL_Contact}/${id}.json`, {
      method: "PUT",
      body: JSON.stringify(updatedContact),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Fehler beim Aktualisieren des Kontakts: ${response.statusText}`
      );
    }

    await updateContacts();
  } catch (error) {
    console.error("Fehler beim Aktualisieren des Kontakts:", error);
    alert("Es gab ein Problem beim Aktualisieren des Kontakts.");
  }
}

async function updateDataContact(id, data) {
  try {
    let response = await fetch(`${BASE_URL_Contact}/${id}.json`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(
        `Fehler beim Aktualisieren des Kontakts: ${response.statusText}`
      );
    }

    console.log("Kontakt erfolgreich aktualisiert:", await response.json());

    // Lokale Kontakte aktualisieren
    const index = allContacts.findIndex((contact) => contact.Uid === id);
    if (index !== -1) {
      allContacts[index] = { ...allContacts[index], ...data };
    }

    // UI aktualisieren
    renderContactList();
  } catch (error) {
    console.error("Fehler beim Aktualisieren des Kontakts:", error);
    alert("Es gab ein Problem beim Aktualisieren des Kontakts.");
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
