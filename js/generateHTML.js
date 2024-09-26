let contactColors = {};
function generateLetterSectionHTML(letter) {
    return `
        <div class="letter_section">
            <h3>${letter}</h3> 
            <img src="../assets/icons/seperator_contacts.svg" alt="Seperator">
        </div>
    `;
}

function generateContactContent(name, email, id, color, uid) {
    return `
        <div id="${uid}" onclick="toggleBackground(this); openContact(${id}) ;mobileShowContact()" class="single_contact flex">
            <div class="profil_badge flex">
                <span style="background-color: ${color}">${getInitials(name).toUpperCase()}</span> 
            </div>
            <div class="contact_info flex flex-column">
                <h3>${name}</h3> 
                <p>${email}</p> 
            </div>
        </div>
    `;
}

function generateExtendedContact(name, email, phone, color, Uid, id) {
    return `
    <div class="contact_headline flex flex-column">
      <div class="contact_content_extended flex">
        <span class="profil_badge_extended flex" style="background-color:${color}">
          ${getInitials(name).toUpperCase()}
        </span>
        <div class="contact_info_extended flex flex-column">
          <h3>${name}</h3>
          <div class="contact_tools flex" id="contact_tools">
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
      <div class="contact_details flex flex-column">
        <p>Email</p>
        <p>${email}</p>
        <p>Phone</p>
        <p>${phone}</p>
      </div>     
    </div>`;
}

function generateEditContact(contact) {
    return `
        <div class="flex">
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
          <div class="popup-Right-Side flex-column">
            <form>
              <div class="input_login flex flex-column">
                <input class="name" type="text" id="inputEditName" placeholder="Name" value="${contact.name}" required>
                <input class="email" type="email" id="inputEditEmail" placeholder="Email" value="${contact.email}" required>
                <input class="phone" type="tel" id="inputEditPhone" placeholder="Phone" value="${contact.phone}" required>
              </div>
              <div class="button-line flex">
                <button type="button" class="button-white" onclick="closeEditContact()">Cancel <img src="../assets/icons/cancel.svg" alt="Icon cancel"></button>
                <button type="button" class="button-DB" onclick="editContact('${contact.Uid}')">Save <img src="../assets/icons/create.svg" alt="Icon create"></button>
              </div>
            </form>
          </div>
        </div>
    `;
}

function generateErrorLogin() {
    return `
        <p>Check your email and password. Please try again.<p> 
    `;
}

function generateButtonMediumEdit(index) {
  return `
      <button onclick="setPriority('urgent', ${index})" value="urgent" id="prioUrgentEdit" type="button">Urgent<img id="prioUrgentImgEdit" src="../assets/icons/prioUrgent.svg"></button>
      <button onclick="setPriority('medium', ${index})" value="medium" id="prioMediumEdit" type="button" class="prioMediumActive">Medium<img id="prioMediumImgEdit" src="../assets/icons/prioMediumSelected.svg"></button>
      <button onclick="setPriority('low', ${index})" value="low" id="prioLowEdit" type="button">Low<img id="prioLowImgEdit" src="../assets/icons/prioLow.svg"></button>
    `;
}

function generateButtonLowEdit(index) {
  return `
      <button onclick="setPriority('urgent', ${index})" value="urgent" id="prioUrgentEdit" type="button">Urgent<img id="prioUrgentImgEdit" src="../assets/icons/prioUrgent.svg"></button>
      <button onclick="setPriority('medium', ${index})" value="medium" id="prioMediumEdit" type="button">Medium<img id="prioMediumImgEdit" src="../assets/icons/prioMedium.svg"></button>
      <button onclick="setPriority('low', ${index})" value="low" id="prioLowEdit" type="button" class="prioLowActive">Low<img id="prioLowImgEdit" src="../assets/icons/prioLowSelected.svg"></button>
    `;
}

function generateButtonUrgentEdit(index) {
  return ` 
      <button onclick="setPriority('urgent', ${index})" value="urgent" id="prioUrgentEdit" type="button" class="prioUrgentActive">Urgent<img id="prioUrgentImgEdit" src="../assets/icons/prioUrgentSelected.svg"></button>
      <button onclick="setPriority('medium', ${index})" value="medium" id="prioMediumEdit" type="button">Medium<img id="prioMediumImgEdit" src="../assets/icons/prioMedium.svg"></button>
      <button onclick="setPriority('low', ${index})" value="low" id="prioLowEdit" type="button">Low<img id="prioLowImgEdit" src="../assets/icons/prioLow.svg"></button>
    `;
}

function generateBoardContent(index) {
   
    // Aufruf der Template-Funktion mit Übergabe der Farbe
    return htmlTemplateGenerateBoardContent(index);
}

function getInitials(name) {
    return name.split(" ").map((n) => n[0]).join("");
}

// Funktion, die das HTML-Template generiert
function htmlTemplateGenerateBoardContent(index) {
  let showContacts = allBoardContent[index].asigned || []; // Fallback to empty array if undefined
  let contactsHTML = "";
  
  // Bestimme die Textfarbe des span basierend auf der Kategorie
  let categoryColor = "";
  if (allBoardContent[index].category === "Technical Task") {
    categoryColor = "#1FD7C1"; // Farbe für "Technical Task"
  } else {
    categoryColor = "#0038FF"; // Farbe für "User Story"
  }

  if (Array.isArray(showContacts)) {
    // Iterate through showContacts und prüfe gegen allContacts
    showContacts.forEach((contactName) => {
      allContacts.find((contact) => {
        if (contact.name === contactName) {
          // Speichere die Farbe des Kontakts im contactColors-Objekt
          contactColors[contactName] = contact.color;

          contactsHTML += `
            <span class="contactCard" style="background-color: ${
              contact.color
            }">
              ${getInitials(contact.name).toUpperCase()}
            </span>`;
        }
      });
    });
  }

  // Image source based on the status
  let statusImage = "";
  switch (allBoardContent[index].prio) {
    case "urgent":
      statusImage =
        '<img src="../assets/icons/prioUrgent.svg" alt="Urgent Priority">';
      break;
    case "medium":
      statusImage =
        '<img src="../assets/icons/prioMedium.svg" alt="Medium Priority">';
      break;
    case "low":
      statusImage =
        '<img src="../assets/icons/prioLow.svg" alt="Low Priority">';
      break;
    default:
      statusImage = ""; // No image if no status
  }

  return `
  <div id="board-${index}" class="boardCard flex" draggable="true" ondragstart="drag(event)" onclick="openPopupCard(${index}, '${categoryColor}')">
    <span class="boardCategory bc1" style="background-color: ${categoryColor};">
      ${allBoardContent[index].category}
    </span>
    <div class="boardText flex">
      <span class="bc2">${allBoardContent[index].title}</span>
      <span class="bc3">${allBoardContent[index].description}</span>
    </div>
    <div class="progressSubTask flex">
      ${getSubtaskDisplay(allBoardContent[index].subtasks)}
    </div>
    <div class="contactsAndPrio">
      <div>
        ${contactsHTML}
      </div>
      <div class="prioBoardCard">
        ${statusImage} 
      </div>
    </div>
  </div>
`;
}
