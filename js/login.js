function openPopup() {
//   document.getElementById("popupOverlay").style.display = "flex";
  document.getElementById("popupModal").style.display = "block";
}

// Schließe das Pop-up, wenn man auf das Overlay klickt
function closePopup() {
//   document.getElementById("popupOverlay").style.display = "none";
  document.getElementById("popupModal").style.display = "none";
}



// Variable, um den aktuellen Zustand zu speichern
let isChecked = false;

// Toggle-Funktion zum Umschalten des Checkbox-Zustands
function toggleCheckbox() {
    const checkboxLabel = document.getElementById('checkboxLabel');

    // Zustand umschalten
    isChecked = !isChecked;

    // Je nach Zustand das passende Bild setzen
    if (isChecked) {
        checkboxLabel.style.backgroundImage = "url('../assets/icons/checkbox_checked.svg')"; // Angekreuzte Checkbox
    } else {
        checkboxLabel.style.backgroundImage = "url('../assets/icons/checkbox.svg')"; // Nicht angekreuzte Checkbox
    }
}