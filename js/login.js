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
function guestLogin() {
  // Weiterleitung zur summary.html ohne Validierung der Eingabefelder
  localStorage.setItem("loggedInUser", "Guest");
  window.location.href = "summary.html";
}

function checkUser(email, password){
  const originalUser = allUsers.find((user) => user.email === email);

  if (!originalUser) {
    return false;
  }

  if (originalUser.password === password) {
    localStorage.setItem("loggedInUser", originalUser.name);
    return true;
  }
  return false;
}

function checkLogin(){
  let email = document.getElementById('loginEmail').value;
  let password = document.getElementById("loginPassword").value;

  if (checkUser(email, password)){
    window.location.href = "summary.html";
  } else {
    document.getElementById('loginError').innerHTML = generateErrorLogin();
    // alert("ACHTUNG FEHLER");
  }
}
// Ändert das Icon beim Fokussieren des Passwortfelds
function updateIcon() {
  let inputField = document.getElementById("loginPassword");
  let icon = document.getElementById("togglePasswordIcon");

  if (icon.src.includes("lock.svg")) {
    icon.src = "../assets/icons/visibility_off.svg"; // Wechsel zu visibility_off
  }
}

// Funktion zum Toggeln der Passwortsichtbarkeit
function togglePasswordVisibility() {
  let inputField = document.getElementById("loginPassword");
  let icon = document.getElementById("togglePasswordIcon");

  if (inputField.type === "password") {
    inputField.type = "text"; // Passwort sichtbar machen
    icon.src = "../assets/icons/visibility.svg"; // Icon zu "sichtbar" wechseln
  } else {
    inputField.type = "password"; // Passwort unsichtbar machen
    icon.src = "../assets/icons/visibility_off.svg"; // Icon zu "nicht sichtbar" wechseln
  }
}





