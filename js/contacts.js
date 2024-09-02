function openContact() {
    document.getElementById("extended_contact").classList.remove('hidden');
    document.getElementById("extended_contact").classList.add("slideIn");
    document.getElementById("extended_contact").classList.add("show");
}

function openPopup() {
    const popupOverlay = document.getElementById('popupOverlay');
    const popupModal = document.getElementById('popupModal');

    // Zeige das Overlay und das Popup an
    popupOverlay.style.display = 'flex';
    popupModal.style.display = 'block';

    // Entferne die `hide`-Klasse (falls vorhanden) und füge die `show`-Klasse hinzu
    popupModal.classList.remove('hide');
    popupModal.classList.add('show');
}

function closePopup() {
    const popupOverlay = document.getElementById('popupOverlay');
    const popupModal = document.getElementById('popupModal');

    // Verstecke das Overlay sofort
    popupOverlay.style.display = 'none';

    // Entferne die `show`-Klasse und füge die `hide`-Klasse hinzu, um die Animation zu starten
    popupModal.classList.remove('show');
    popupModal.classList.add('hide');

    // Verstecke das Popup nach der Animation (120ms)
    setTimeout(() => {
        popupModal.style.display = 'none';
    }, 120); // 120ms entspricht der Dauer der Animation
}

function addContact() {
    // Get input values from the form
    let name = document.getElementById("inputName");
    let email = document.getElementById("inputEmail");
    let phone = document.getElementById("inputPhone");
    // Prepare the data to be sent
    let contactData = {
        "name": name.value,
        "email": email.value,
        "phone": phone.value
    };
    // Call the function to post data
    postDataContacts("", contactData);
    name.value = "";
    email.value = "";
    phone.value = "";
    closePopup();
    loadDataContacts("");
}

// diese function wird im edgar.js function onloadFunctionData() aufgerufen
function render(contactsObject) {
    let contacts = document.getElementById("contacts");
    contacts.innerHTML = ""; // Clear existing content

    // Iterate over each key in the contactsObject
    for (let key in contactsObject) {
        if (contactsObject.hasOwnProperty(key)) {
            let contact = contactsObject[key];
            contacts.innerHTML += htmlTemplateContactContent(contact.name, contact.email);
        }
    }
}

function htmlTemplateContactContent(name, email) {
    return `
        <div onclick="openContact()" class="single_contact flex">
            <div class="profil_badge flex">
                <span>${getInitials(name)}</span> <!-- Initials -->
            </div>
            <div class="contact_info flex">
                <h3>${name}</h3> <!-- Rendered Name -->
                <p>${email}</p> <!-- Rendered Email -->
            </div>
        </div>
    `;
}
function getInitials(name) {
    return name.split(" ").map(n => n[0]).join("");
}



// reste vom aufbau der contact liste im html

// <div onclick="openContact()" class="single_contact flex">
// <!-- hier muss noch das onclick eingefügt werden, um ein pop up zu öfnnen mit den Kontaktdetails -->
// <div class="profil_badge flex">
//     <span>AM</span>
//     <!-- Initialien werden gerendert, background-color (im CSS) muss auch gerendert werden -->
// </div>
// <div class="contact_info flex">
//     <h3>Anton Mayer</h3>
//     <p>antom@gmail.com</p> <!-- Name und Email werden reingerendert -->
// </div>
// </div>
