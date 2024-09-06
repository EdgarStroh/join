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


