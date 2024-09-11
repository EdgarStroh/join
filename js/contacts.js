function openContact(id) {
    renderExtendedContact(id);
}

function addContact() {
  let name = document.getElementById("inputName");
  let email = document.getElementById("inputEmail");
  let phone = document.getElementById("inputPhone");
  let newColor = getRandomColor();

  let contactData = {
    name: name.value,
    email: email.value,
    phone: phone.value,
    color: newColor,
  };

  postDataContacts("", contactData);
  name.value = "";
  email.value = "";
  phone.value = "";
  closePopup();
  showPopupContact();
  loadDataContacts();
  renderContactList();
}

// diese function wird im edgar.js function onloadFunctionData() aufgerufen   --> Diese Funktion wird nicht mehr aufgerufen, haben wir auskommentiert!!!!

// function render(contactsObject) {
//     let contacts = document.getElementById("contacts");
//     contacts.innerHTML = ""; 

//     for (let key in contactsObject) {
//         if (contactsObject.hasOwnProperty(key)) {
//             let contact = contactsObject[key];
//             contacts.innerHTML += generateContactContent(contact.name, contact.email, key, contact.color);
//         }
//     }
// }

function renderExtendedContact(id) {
  let extendedContact = document.getElementById("extended_contact");

  extendedContact.innerHTML = "";
  extendedContact.classList.remove("slideIn", "show");

  extendedContact.innerHTML += generateExtendedContact(
    allContacts[id].name,
    allContacts[id].email,
    allContacts[id].phone,
    allContacts[id].color,
    allContacts[id].Uid,
    id // evtl muss das noch in die firebase id geändert werden
  );

  setTimeout(() => {extendedContact.classList.add("slideIn", "show");}, 10); 
}


function renderContactList() {
  let contactsContainer = document.getElementById("contacts");
  contactsContainer.innerHTML = ""; 

  let currentLetter = "";
  let html = "";

  allContacts = Object.values(allContacts).sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  allContacts.forEach((contact, id) => {
    const firstLetter = contact.name.charAt(0).toUpperCase();

    if (firstLetter !== currentLetter) {
      currentLetter = firstLetter;
      html += generateLetterSectionHTML(currentLetter);
    }

    html += generateContactContent(contact.name, contact.email, id, contact.color);
  });

  contactsContainer.innerHTML = html;
}



function showPopupContact() {
  const overlay = document.getElementById("popupOverlay");
  const success = document.getElementById("popupContactSuccess");

  overlay.style.display = "flex";
  success.style.display = "flex";
  success.style.opacity = "0"; // Setze die Sichtbarkeit auf 0, bevor die Animation startet

  // Füge eine kurze Verzögerung hinzu, um die Animation zu starten
  setTimeout(() => {
    success.style.opacity = "1"; // Zeige die Animation
  }, 1);

  setTimeout(function () {
    closePopupSuccess();
  }, 1000);
}

function closePopupSuccess() {
  document.getElementById("popupOverlay").style.display = "none";
  document.getElementById("popupContactSuccess").style.display = "none";
  loadDataUsers("");
}
