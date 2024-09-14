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
        <div id="${uid}" onclick="toggleBackground(this); openContact(${id})" class="single_contact flex">
            <div class="profil_badge flex">
                <span style="background-color: ${color}">${getInitials(name)}</span> 
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
            ${getInitials(name)}
        </span>
        <div class="contact_info_extended flex flex-column">
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
        </div>
    `;
}

function generateErrorLogin(){
    return `
        <p>Check your email and password. Please try again.<p> 
    `;
}

function generateBoardContent(index) {
    // Bestimme die Textfarbe des span basierend auf der Kategorie
    let categoryColor = '';
    if (allBoardContent[index].category === 'Technical Task') {
        categoryColor = '#1FD7C1'; // Farbe für "Technical Task"
    } else {
        categoryColor = '#0038FF'; // Farbe für "User Story"
    }

    // Aufruf der Template-Funktion mit Übergabe der Farbe
    return htmlTemplateGenerateBoardContent(index, categoryColor);
}

// Funktion, um die Subtask-Anzeige zu generieren (z.B. 0/2)
function getSubtaskDisplay(subtasks) {
    // Anzahl der Subtasks und wie viele abgeschlossen sind
    let subtaskCount = subtasks ? subtasks.length : 0;
    let completedSubtasks = subtasks
        ? subtasks.filter(subtask => subtask.completed).length
        :  0 ;

    // Wenn keine Subtasks vorhanden sind, zeige nichts an
    return subtaskCount > 0 ? `${completedSubtasks}/${subtaskCount} Subtasks ` : '';
}

function getInitials(name) {
    return name.split(" ").map((n) => n[0]).join("");
  }
  
// Funktion, die das HTML-Template generiert
function htmlTemplateGenerateBoardContent(index, categoryColor) {
    let showContacts = allBoardContent[index].asigned || []; // Fallback to empty array if undefined
    let contactsHTML = '';

    if (Array.isArray(showContacts)) {
        // Iterate through showContacts and check against allContacts
        showContacts.forEach(contactName => {
            allContacts.find(contact => {
                if (contact.name === contactName) {
                    contactsHTML += `
                    <span class="contactCard" style="background-color: ${contact.color}">
                        ${getInitials(contact.name)}
                    </span>`;
                }
            });
        });
    }
    
    return `
    <div id="board-${index}" class="boardCard flex" draggable="true" ondragstart="drag(event)">
        <span class="boardCategory bc1" style="background-color: ${categoryColor};">
            ${allBoardContent[index].category}
        </span>
        <div class="boardText flex">
            <span class="bc2">${allBoardContent[index].title}</span>
            <span class="bc3">${allBoardContent[index].description}</span>
        </div>
        <div class="progressSubTask flex">
            <div>PLine</div>
            <div>${getSubtaskDisplay(allBoardContent[index].subtasks)}</div>
        </div>
        <div class="contactsAndPrio">
            <span>${contactsHTML}</span>
        </div>
    </div>
    `;
}