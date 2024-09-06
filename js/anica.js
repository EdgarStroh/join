async function deleteDataContact(uid) {
  console.log("Lösche Kontakt mit UID:", uid); // Überprüfe die UID

  // Bestätigungsdialog anzeigen
  const confirmed = confirm("Möchtest du diesen Kontakt wirklich löschen?");

  if (confirmed) {
    try {
      // Löschanfrage an Firebase senden
      let response = await fetch(`${BASE_URL_Contact}/${uid}.json`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(
          "Fehler beim Löschen des Kontakts: " + response.statusText
        );
      }

      let responseToJson = await response.json();
      console.log("Kontakt erfolgreich gelöscht:", responseToJson);

      // Kontakt aus der Benutzeroberfläche entfernen
      removeContactFromUI(uid);
      // Leere den extended_contact Bereich
      clearExtendedContact();
      // Kontaktliste neu laden und rendern
      loadDataContacts(); // Sicherstellen, dass diese Funktion die gesamte Kontaktliste neu lädt
    } catch (error) {
      console.error("Fehler beim Löschen des Kontakts:", error);
      alert("Es gab ein Problem beim Löschen des Kontakts.");
    }
  }
}

function removeContactFromUI(uid) {
  const contactElement = document.getElementById(`${uid}`);
  if (contactElement) {
    contactElement.remove();
    console.log("Kontakt wurde aus der UI entfernt.");
  } else {
    console.log(`Kein Element mit der ID '${uid}' gefunden.`);
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

  updateDataContact(id, updatedContact);
  closeEditContact();
}

// Funktion, um den Kontakt zu bearbeiten und das Formular anzuzeigen
function renderEditContact(id) {
    console.log(`renderEditContact aufgerufen mit ID: ${id}`);
    console.log(`allContacts Inhalt in renderEditContact:`, allContacts);

    // Sicherstellen, dass die ID im Array vorhanden ist
    const selectedContact = allContacts[id];

    // Debugging-Ausgabe: Prüfen, ob der Kontakt korrekt geladen wurde
    console.log("Kontakt mit ID", id, "in renderEditContact:", selectedContact);

    // Falls kein Kontakt gefunden wurde, Debugging und Rückgabe einer Fehlermeldung
    if (!selectedContact) {
        console.error("Kontakt mit ID", id, "nicht gefunden!");
        return "<p>Kontakt nicht gefunden</p>";
    }

    // Generierung des Editierformulars
    const editContactHTML = generateEditContact(selectedContact);
    document.getElementById('popupEditModal').innerHTML = editContactHTML;
}

// Funktion zur Erstellung des HTMLs für das Editierformular
function generateEditContact(contact) {
  return `
        <div class="flex">
            <div class="popup-bg">
                <img class="popupLogo" src="../assets/img/logo.svg">
                <h1 class="white">Edit contact</h1>
                <img class="underline" src="../assets/icons/vector_login.svg">
            </div>
            <div class="popup-Right-Side-Content">
                <div class="close_container">
                    <img class="close" onclick="closeEditContact()" src="../assets/icons/close.svg" alt="Icon close">
                </div>
                <img class="profileImg" src="../assets/img/profileImg.svg">
                <div class="popup-Right-Side">
                    <form>
                        <div class="input_login flex">
                            <input class="name" type="text" id="inputEditName" placeholder="Name" value="${contact.name}" required>
                            <input class="email" type="email" id="inputEditEmail" placeholder="Email" value="${contact.email}" required>
                            <input class="phone" type="tel" id="inputEditPhone" placeholder="Phone" value="${contact.phone}" required>
                        </div>
                        <div class="button-line flex">
                            <button type="button" class="button-white" onclick="closeEditContact()">Cancel <img src="../assets/icons/cancel.svg" alt="Icon cancel"></button>
                            <button type="button" class="button-DB" onclick="editContact('${contact.Uid}')">Save <img src="../assets/icons/create.svg" alt="Icon create"></button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;
}


// Funktion zur Aktualisierung eines Kontakts in Firebase
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

    // Den aktualisierten Kontakt zurückgeben (optional)
    console.log("Kontakt erfolgreich aktualisiert:", await response.json());

    // Kontakte neu laden und aktualisieren
    await loadDataContacts(); // Annahme: Dies lädt alle Kontakte erneut
    renderContactList(); // UI neu rendern
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
  console.log(`openEditContact aufgerufen mit ID: ${id}`);
  console.log(`allContacts Inhalt in openEditContact:`, allContacts);

  // Sicherstellen, dass die ID im Array vorhanden ist
  const selectedContact = allContacts[id];

  // Debugging-Ausgabe: Prüfen, ob der Kontakt korrekt geladen wurde
  console.log("Kontakt mit ID", id, "in openEditContact:", selectedContact);

  if (!selectedContact) {
    console.error("Kontakt mit ID", id, "nicht gefunden!");
    return;
  }

  // Rendern des Editierformulars
  const editContactHTML = generateEditContact(selectedContact);
  document.getElementById("popupEditModal").innerHTML = editContactHTML;

  // Popup anzeigen
  togglePopup("popupEditOverlay", "popupEditModal", true);
}

// Funktion zum Schließen des Editiermodals
function closeEditContact() {
    togglePopup("popupEditOverlay", "popupEditModal", false);
}

