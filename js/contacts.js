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