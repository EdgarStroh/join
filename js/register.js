function signUpUser(event) {
    const checkbox = document.getElementById('checkboxLogin1');
    if (!checkbox.checked) {
        alert('Please accept the Privacy policy to sign up.');
        event.preventDefault();
        return false;
    }
    
    event.preventDefault();

    let userColor = getRandomColor();
    let email = document.getElementById("inputEmail").value;
    let name = document.getElementById("inputName").value;
    let password = document.getElementById("inputPassword").value;

    let UserData = {
        "color": userColor,
        "email": email,
        "name": name,
        "password": password
    };

    postDataUsers("", UserData);

    document.getElementById("inputName").value = "";
    document.getElementById("inputEmail").value = "";
    document.getElementById("inputPassword").value = "";
    document.getElementById("inputConfirmPassword").value = "";
    document.getElementById("sign_up_button_div").classList.remove("displayNone");
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
    document.getElementById('popupOverlay').style.display = 'flex';
    document.getElementById('popupSuccess').style.display = 'flex';

    setTimeout(function() {
        closePopupSuccess();
    }, 800);
}

function closePopupSuccess() {
    document.getElementById('popupOverlay').style.display = 'none';
    document.getElementById('popupSuccess').style.display = 'none';
}
