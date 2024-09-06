function openContact(id) {
    renderExtendedContact(id);
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

function openEditContact(id) {
    renderEditContact(id);
    togglePopup("popupEditOverlay", "popupEditModal", true);
}

function closeEditContact() {
  togglePopup("popupEditOverlay", "popupEditModal", false);
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
  // loadDataContacts("");
  loadDataContacts();
  renderContactList();
}

function editContact() {

  let name = document.getElementById("inputEditName");
  let email = document.getElementById("inputEditEmail");
  let phone = document.getElementById("inputEditPhone");

  let contactData = {
    name: name.value,
    email: email.value,
    phone: phone.value,
  };
  // Call the function to post data
//   postDataContacts("", contactData); ---> hier muss PUT eingesetzt werden!!!
//   name.value = "";
//   email.value = "";
//   phone.value = "";
  closePopup();
  loadDataContacts("");
  renderContactList();
}

// diese function wird im edgar.js function onloadFunctionData() aufgerufen   --> Diese Funktion wird nicht mehr aufgerufen, haben wir auskommentiert!!!!

// function render(contactsObject) {
//     let contacts = document.getElementById("contacts");
//     contacts.innerHTML = ""; 

//     for (let key in contactsObject) {
//         if (contactsObject.hasOwnProperty(key)) {
//             let contact = contactsObject[key];
//             contacts.innerHTML += htmlTemplateContactContent(contact.name, contact.email, key, contact.color);
//         }
//     }
// }

function htmlTemplateContactContent(name, email, id, color, uid) {
  return `
        <div id="${uid}" onclick="toggleBackground(this); openContact(${id})" class="single_contact flex">
            <div class="profil_badge flex">
                <span style="background-color: ${color}">${getInitials(
    name
  )}</span> 
            </div>
            <div class="contact_info flex">
                <h3>${name}</h3> 
                <p>${email}</p> 
            </div>
        </div>
    `;
}

function toggleBackground(element) {

  let contacts = document.querySelectorAll(".single_contact");
  contacts.forEach(function (contact) {
    contact.classList.remove("active");
  });

  element.classList.add("active");
}

function getInitials(name) {
    return name.split(" ").map(n => n[0]).join("");
}

function renderExtendedContact(id) {
  let extendedContact = document.getElementById("extended_contact");
  extendedContact.innerHTML = ""; 

extendedContact.innerHTML += htmlTemplateExtendedContact(
        allContacts[id].name,
        allContacts[id].email,
        allContacts[id].phone,
        allContacts[id].color,
        allContacts[id].Uid,
        id // evtl muss das noch in die firebase id geändert werden!!!
      );
}
 
function htmlTemplateExtendedContact(name, email, phone, color, Uid, id) {
  return `
    <div class="contact_headline flex">
    <div class="contact_content_extended flex">
        <span class="profil_badge_extended flex" style="background-color:${color}">${getInitials(
    name
  )}</span>
        <div class="contact_info_extended flex">
        <h3>${name}</h3>
        <div class="contact_tools flex">
            <div onclick="openEditContact(${id})" class="edit flex">
                <img src="../assets/icons/edit.svg" alt="Icon edit">
                <span>Edit</span>
            </div>
            <div onclick="deleteDataContact('${Uid}')" class="delete flex">
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

    html += htmlTemplateContactContent(contact.name, contact.email, id, contact.color);
  });

  contactsContainer.innerHTML = html;
}

function generateLetterSectionHTML(letter) {
  return `
        <div class="letter_section">
            <h3>${letter}</h3> 
            <img src="../assets/icons/seperator_contacts.svg" alt="Seperator">
        </div>
    `;
}

function renderEditContact(id) {
    let editContainer = document.getElementById('popupEditModal');
    editContainer.innerHTML = generateEditContact(id);
}

function generateEditContact(id){
    return `<div class="flex">
            <div class="popup-bg">
                <img class="popupLogo" src="../assets/img/logo.svg">
                <h1 class="white">Edit contact</h1>
                <img class="underline" src="../assets/icons/vector_login.svg">
            </div>
            <div class="popup-Right-Side-Content">
                <div class="close_container">
                    <img class="close" onclick="closeEditContact()" src="../assets/icons/close.svg" alt="Icon close">
                </div>
                <img class="profileImg" src="../assets/img/profileImg.svg">
                <div class="popup-Right-Side">
                    <form>
                        <div class="input_login flex">
                            <input class="name" type="text" id="inputEditName" placeholder="Name" value="${allContacts[id].name}" required>
                            <input class="email" type="email" id="inputEditEmail" placeholder="Email" value="${allContacts[id].email}" required>
                            <input class="phone" type="tel" id="inputEditPhone" placeholder="Phone" value="${allContacts[id].phone}" required>
                        </div>
                        <div class="button-line flex">
                            <button class="button-white" onclick="closePopup()">Delete <img src="../assets/icons/cancel.svg" alt="Icon cancel"></button>
                            <button class="button-DB" onclick="editContact()">Save <img src="../assets/icons/create.svg" alt="Icon create"></button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;

}