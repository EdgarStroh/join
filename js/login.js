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
    alert("ACHTUNG FEHLER");
  }
}