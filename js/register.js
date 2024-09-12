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
    let input = document.getElementById('inputConfirmPassword');
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
    loadDataUsers("");
}

// Deaktivierung SignUp-Button: Funktion zum Überprüfen der Eingaben
function validateForm() {
    let name = document.getElementById("inputName").value.trim();
    let email = document.getElementById("inputEmail").value.trim();
    let password = document.getElementById("inputPassword").value.trim();
    let confirmPassword = document.getElementById("inputConfirmPassword").value.trim();
    let checkbox = document.getElementById("checkboxLogin1").checked;

    // Bedingung: Alle Felder müssen ausgefüllt sein und das Passwort muss übereinstimmen
    if (name !== "" && email !== "" && password !== "" && confirmPassword !== "" && password === confirmPassword && checkbox) {
        document.getElementById("signUpButton").disabled = false; // Button aktivieren
    } else {
        document.getElementById("signUpButton").disabled = true; // Button deaktivieren
    }
}

// Füge das Event bei jeder Eingabe hinzu
document.getElementById("inputName").addEventListener("input", validateForm);
document.getElementById("inputEmail").addEventListener("input", validateForm);
document.getElementById("inputPassword").addEventListener("input", validateForm);
document.getElementById("inputConfirmPassword").addEventListener("input", validateForm);
document.getElementById("checkboxLogin1").addEventListener("change", validateForm);
