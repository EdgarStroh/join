function openContact(id) {
    renderExtendedContact(allContacts[id]);
}

function togglePopup(popupOverlayId, popupModalId, show = true) {
  const popupOverlay = document.getElementById(popupOverlayId);
  const popupModal = document.getElementById(popupModalId);

  if (show) {
    popupOverlay.style.display = "flex";
    popupModal.style.display = "block";
    popupModal.classList.remove("hide");
    popupModal.classList.add("show");
  } else {
    popupOverlay.style.display = "none";
    popupModal.classList.remove("show");
    popupModal.classList.add("hide");

    setTimeout(() => {
      popupModal.style.display = "none";
    }, 120);
  }
}

function openPopup() {
  togglePopup("popupOverlay", "popupModal", true);
}

function closePopup() {
  togglePopup("popupOverlay", "popupModal", false);
}

function openEditContact() {
  togglePopup("popupEditOverlay", "popupEditModal", true);
}

function closeEditContact() {
  togglePopup("popupEditOverlay", "popupEditModal", false);
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
    renderContactList();
}

// diese function wird im edgar.js function onloadFunctionData() aufgerufen
function render(contactsObject) {
    let contacts = document.getElementById("contacts");
    contacts.innerHTML = ""; // Clear existing content

    // Iterate over each key in the contactsObject
    for (let key in contactsObject) {
        if (contactsObject.hasOwnProperty(key)) {
            let contact = contactsObject[key];
            contacts.innerHTML += htmlTemplateContactContent(contact.name, contact.email, key);
        }
    }
}

function htmlTemplateContactContent(name, email, id) {
    return `
        <div onclick="openContact(${id})" class="single_contact flex">
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

function renderExtendedContact(contactsObject) {
  let extendedContact = document.getElementById("extended_contact");
  extendedContact.innerHTML = ""; // Clear existing content

extendedContact.innerHTML += htmlTemplateExtendedContact(
        contactsObject.name,
        contactsObject.email,
        contactsObject.phone
      );
}
 
  
function htmlTemplateExtendedContact(name,email,phone) {
    return `
    <div class="contact_headline flex">
    <div class="contact_content_extended flex">
        <span class="profil_badge_extended flex">${getInitials(name)}</span>
        <div class="contact_info_extended flex">
        <h3>${name}</h3>
        <div class="contact_tools flex">
            <div onclick="openEditContact()" class="edit flex">
                <img src="../assets/icons/edit.svg" alt="Icon edit">
                <span>Edit</span>
            </div>
            <div onclick="deleteContact()" class="delete flex">
                <img src="../assets/icons/delete.svg" alt="Icon delete">
                <span>Delete</span>
            </div>
        </div>
    </div>
    </div>

    <h4>Contact Information</h4>
            <div class="contact_details flex">
                <p>Email</p>
                <p>${email}</p>
                <p>Phone</p>
                <p>${phone}</p>
            </div>
</div>`;

};

function renderContactList() {
  let contactsContainer = document.getElementById("contacts");
  contactsContainer.innerHTML = ""; // Clear existing content

  let currentLetter = "";
  let html = "";

  // Sortiere die Kontakte alphabetisch nach Namen
  allContacts = Object.values(allContacts).sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  allContacts.forEach((contact, id) => {
    const firstLetter = contact.name.charAt(0).toUpperCase();

    // Wenn der Buchstabe anders ist als der aktuelle Abschnittsbuchstabe, erstelle einen neuen Abschnitt
    if (firstLetter !== currentLetter) {
      currentLetter = firstLetter;
      html += generateLetterSectionHTML(currentLetter);
    }

    // Füge den Kontakt dem HTML hinzu
    html += htmlTemplateContactContent(contact.name, contact.email, id);
  });

  // Füge den generierten HTML-Inhalt in das Kontaktelement ein
  contactsContainer.innerHTML = html;
}

// Funktion zur Erstellung des Buchstabenabschnitts
function generateLetterSectionHTML(letter) {
  return `
        <div class="letter_section">
            <h3>${letter}</h3> 
            <img src="../assets/icons/seperator_contacts.svg" alt="Seperator">
        </div>
    `;
}

