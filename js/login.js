function openPopup() {
//   document.getElementById("popupOverlay").style.display = "flex";
  document.getElementById("popupModal").style.display = "block";
  document.getElementById("sign_up_button_div").classList.add("displayNone");
}

// Schließe das Pop-up, wenn man auf das Overlay klickt
function closePopup() {
//   document.getElementById("popupOverlay").style.display = "none";
  document.getElementById("popupModal").style.display = "none";
  document.getElementById("sign_up_button_div").classList.remove("displayNone");
}


function toggleCheckbox(labelId) {
  const label = document.getElementById(labelId);

  if (label.classList.contains("checked")) {
    label.classList.remove("checked");
  } else {
    label.classList.add("checked");
  }
}
