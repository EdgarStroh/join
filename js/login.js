function openPopup() {
//   document.getElementById("popupOverlay").style.display = "flex";
  document.getElementById("popupModal").style.display = "block";
}

// Schließe das Pop-up, wenn man auf das Overlay klickt
function closePopup() {
//   document.getElementById("popupOverlay").style.display = "none";
  document.getElementById("popupModal").style.display = "none";
}


// Toggle-Funktion für die Checkbox
function toggleCheckbox(labelId) {

    const label = document.getElementById(labelId);

    if (label.style.backgroundImage.includes('checkbox_checked.svg')) {
        label.style.backgroundImage = "url('../assets/icons/checkbox.svg')";
    } else {
        label.style.backgroundImage = "url('../assets/icons/checkbox_checked.svg')";
    }
}
