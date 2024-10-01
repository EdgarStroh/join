let differentColors = [
    "#FF7A00", "#FF5EB3", "#6E52FF",
    "#9327FF", "#00BEE8", "#1FD7C1",
    "#FF745E", "#FFA35E", "#FC71FF",
    "#FFC701", "#0038FF", "#C3FF2B",
    "#FFE62B", "#FF4646", "#FFBB2B"
] ;

function getRandomColor() {
    let randomIndex = Math.floor(Math.random() * differentColors.length);
    return differentColors[randomIndex];
}

function getInitials(name) {
  return name.split(" ").map((n) => n[0]).join("");
}

function toggleBackground(element) {
  let contacts = document.querySelectorAll(".single_contact");
  contacts.forEach(function (contact) {
    contact.classList.remove("active");
  });

  element.classList.add("active");
}

function togglePopup(popupOverlayId, popupModalId, show = true) {
  const popupOverlay = document.getElementById(popupOverlayId);
  const popupModal = document.getElementById(popupModalId);

  if (show) {
    popupOverlay.style.display = "flex";
    popupModal.style.display = "block";
    popupModal.classList.remove("hide");
    popupModal.classList.add("show");
  } else {
    popupOverlay.style.display = "none";
    popupModal.classList.remove("show");
    popupModal.classList.add("hide");

    setTimeout(() => {
      popupModal.style.display = "none";
    }, 120);
  }
}

function openPopup() {
  togglePopup("popupOverlay", "popupModal", true);
}

function closePopup() {
  togglePopup("popupOverlay", "popupModal", false);
}

 function goBack() {
   const referrer = document.referrer;
   if (referrer) {
     window.location.href = referrer; // Geht zurück zur Seite, von der der Benutzer kam
   } else {
     window.location.href = "index.html"; // Falls kein Referrer vorhanden ist
   }
 }

 function checkLogin() {
   if (!localStorage.getItem("loggedInUser")) {
     window.location.href = "index.html";
   }
 }

//  function checkOrientation() {
//   if (window.matchMedia("(orientation: landscape)").matches) {
//       alert("Bitte wechsle in den Hochformatmodus für eine bessere Benutzererfahrung.");
//       // Hier kannst du auch eine Umleitung zu einer anderen Seite hinzufügen, wenn du möchtest
//       // window.location.href = "deine-seite.html";
//   }
// }

// // Überwache die Änderung der Bildschirmorientierung
// window.addEventListener("orientationchange", checkOrientation);

// // Überprüfe die aktuelle Orientierung beim Laden der Seite
// checkOrientation();