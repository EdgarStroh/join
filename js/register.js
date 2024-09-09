function signUpUser(event) {
  const checkbox = document.getElementById("checkboxLogin1");
  if (!checkbox.checked) {
    event.preventDefault();
    return false;
  }

  event.preventDefault();

  let userColor = getRandomColor();
  let email = document.getElementById("inputEmail").value;
  let name = document.getElementById("inputName").value;
  let password = document.getElementById("inputPassword").value;

  let UserData = {
    color: userColor,
    email: email,
    name: name,
    password: password,
  };
  // Speichern des Benutzernamens in localStorage
  // localStorage.setItem("inputName", name);

  postDataUsers("", UserData);

  document.getElementById("inputName").value = "";
  document.getElementById("inputEmail").value = "";
  document.getElementById("inputPassword").value = "";
  document.getElementById("inputConfirmPassword").value = "";
  document.getElementById("sign_up_button_div").classList.remove("displayNone");
  checkbox.checked = false;
  closePopup();
  showPopup();
}

function check() {
    var input = document.getElementById('inputConfirmPassword');
    if (input.value !== document.getElementById('inputPassword').value) {
        input.setCustomValidity('Passwort muss übereinstimmen');
    } else {
        input.setCustomValidity('');  // Korrekt: Nachricht wird entfernt, wenn Passwörter übereinstimmen
    }
}

function showPopup() {
    const overlay = document.getElementById('popupOverlay');
    const success = document.getElementById('popupSuccess');

    overlay.style.display = 'flex';
    success.style.display = 'flex';
    success.style.opacity = '0'; // Setze die Sichtbarkeit auf 0, bevor die Animation startet

    // Füge eine kurze Verzögerung hinzu, um die Animation zu starten
    setTimeout(() => {
        success.style.opacity = '1'; // Zeige die Animation
    }, 1);

    setTimeout(function() {
        closePopupSuccess();
    }, 1000);
}

function closePopupSuccess() {
    document.getElementById('popupOverlay').style.display = 'none';
    document.getElementById('popupSuccess').style.display = 'none';
}
