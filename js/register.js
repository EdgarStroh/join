function signUpUser() {
    // Eingabewerte aus dem Formular abrufen
    let userColor = getRandomColor();
    let email = document.getElementById("inputEmail");
    let name = document.getElementById("inputName");
    let password = document.getElementById("inputPassword");
    let passwordConfirm = document.getElementById("inputConfirmPassword");
  
    // Daten für den Benutzer vorbereiten, einschließlich der Farbe
    let UserData = {
        "color": userColor ,
        "email": email.value,
        "name": name.value,
        "password": password.value
    };

    // Funktion aufrufen, um die Daten zu posten
    postDataUsers("", UserData);

    // Eingabefelder zurücksetzen
    name.value = "";
    email.value = "";
    password.value = "";
    passwordConfirm.value="";

    // Popup schließen (falls vorhanden)
    closePopup();
}

function check() {
    var input = document.getElementById('inputConfirmPassword');
    if (input.value !== document.getElementById('inputPassword').value) {
        input.setCustomValidity('Password Must be Matching.');
    } else {
        input.setCustomValidity('');  // Korrekt: Nachricht wird entfernt, wenn Passwörter übereinstimmen
    }
}