window.addEventListener("load", () => {
  let profileName = document.getElementById("profileName");
  let headerSubMenu = document.getElementById("headerSubMenu");

  if (profileName && headerSubMenu) {
    // Funktion zum Zurückgeben der Initialen
    function returnNameInitials() {
      let userName = localStorage.getItem("inputName") || "Guest";
      let initials = userName.substring(0, 1); // Standardmäßig den ersten Buchstaben

      let spacePosition = userName.indexOf(" ");

      // Falls es einen Nachnamen gibt, nimm den ersten Buchstaben des Nachnamens
      if (spacePosition !== -1) {
        initials += userName.substring(spacePosition + 1, spacePosition + 2);
      }

      return initials.toUpperCase(); // Initialen immer in Großbuchstaben zurückgeben
    }

    // Setze die Initialen im Profilnamen
    profileName.innerHTML = returnNameInitials();

    // Füge den Event-Listener hinzu, um das Menü ein- oder auszublenden
    profileName.addEventListener("click", () => {
      headerSubMenu.classList.toggle("hidden");
    });
  } else {
    console.error("Profilname oder Menü nicht gefunden.");
  }
});
