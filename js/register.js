function signUpUser(event) {
    // Verhindert das Standard-Formularabsendeverhalten
    event.preventDefault();

    // Eingabewerte aus dem Formular abrufen
    let userColor = getRandomColor();
    let email = document.getElementById("inputEmail").value;
    let name = document.getElementById("inputName").value;
    let password = document.getElementById("inputPassword").value;

    // Daten für den Benutzer vorbereiten, einschließlich der Farbe
    let UserData = {
        "color": userColor,
        "email": email,
        "name": name,
        "password": password
    };

    // Funktion aufrufen, um die Daten zu posten
    postDataUsers("", UserData);

    // Eingabefelder zurücksetzen
    document.getElementById("inputName").value = "";
    document.getElementById("inputEmail").value = "";
    document.getElementById("inputPassword").value = "";
    document.getElementById("inputConfirmPassword").value = "";
    closePopup();
}

function check() {
    var input = document.getElementById('inputConfirmPassword');
    if (input.value !== document.getElementById('inputPassword').value) {
        input.setCustomValidity('Passwort muss übereinstimmen');
    } else {
        input.setCustomValidity('');  // Korrekt: Nachricht wird entfernt, wenn Passwörter übereinstimmen
    }
}