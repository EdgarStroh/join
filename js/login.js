function openPopup() {
  document.getElementById("popupOverlay").style.display = "flex";
  document.getElementById("popupModal").style.display = "block";
}

// Schließe das Pop-up, wenn man auf das Overlay klickt
function closePopup() {
  document.getElementById("popupOverlay").style.display = "none";
  document.getElementById("popupModal").style.display = "none";
}
