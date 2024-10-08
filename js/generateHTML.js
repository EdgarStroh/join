let contactColors = {};

/**
 * Generates an HTML section for a letter.
 * 
 * @param {string} letter - The title of the letter section.
 * @returns {string} The HTML string for the letter section.
 */
function generateLetterSectionHTML(letter) {
  return `
    <div class="letter_section">
        <h3>${letter}</h3> 
        <img src="../assets/icons/seperator_contacts.svg" alt="Seperator">
    </div>
  `;
}

/**
 * Generates the HTML content for a single contact.
 * 
 * @param {string} name - The name of the contact.
 * @param {string} email - The email of the contact.
 * @param {number} id - The unique identifier of the contact.
 * @param {string} color - The background color for the contact badge.
 * @param {string} uid - The unique ID for the contact element.
 * @returns {string} The HTML string for the contact content.
 */
function generateContactContent(name, email, id, color, uid) {
  return `
    <div id="${uid}" onclick="toggleBackground(this); openContact(${id}); mobileShowContact()" class="single_contact flex">
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

/**
 * Generates extended HTML content for a contact.
 * 
 * @param {string} name - The name of the contact.
 * @param {string} email - The email of the contact.
 * @param {string} phone - The phone number of the contact.
 * @param {string} color - The background color for the profile badge.
 * @param {string} Uid - The unique ID for the contact.
 * @param {number} id - The unique identifier of the contact.
 * @returns {string} The HTML string for the extended contact information.
 */
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
    </div>
  `;
}

/**
 * Generates the HTML for editing a contact.
 * 
 * @param {Object} contact - The contact object containing its details.
 * @param {string} contact.name - The name of the contact.
 * @param {string} contact.email - The email of the contact.
 * @param {string} contact.phone - The phone number of the contact.
 * @param {string} contact.color - The color for the profile badge.
 * @param {string} contact.Uid - The unique ID of the contact.
 * @returns {string} The HTML string for the edit contact popup.
 */
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
      <span class="profileImg" style="background-color: ${
        contact.color
      }">${getInitials(contact.name).toUpperCase()}</span>
      <div class="popup-Right-Side flex-column">
        <form onsubmit="handleEditContact(event)" novalidate>
          <div class="input_login flex flex-column">
            <input class="name" type="text" id="inputEditName" placeholder="Name" value="${
              contact.name
            }" >
            <span id="nameErrorEdit" class="error-message"></span>
            <input class="email" type="email" id="inputEditEmail" placeholder="Email" value="${
              contact.email
            }" >
            <span id="emailErrorEdit" class="error-message"></span>
            <input class="phone" type="tel" id="inputEditPhone" placeholder="Phone" value="${
              contact.phone
            }" >
            <span id="phoneErrorEdit" class="error-message"></span>
          </div>
          <div class="button-line flex">
            <button type="button" class="button-white" onclick="deleteDataContact('${
              contact.Uid
            }')">Delete<img src="../assets/icons/cancel.svg" alt="Icon cancel"></button>
            <button type="submit" class="button-DB" data-contact-id="${
              contact.Uid
            }">Save <img src="../assets/icons/create.svg" alt="Icon create"></button>

          </div>
        </form>
      </div>
    </div>
  `;
}


/**
 * Generates an error message for login failures.
 * 
 * @returns {string} The HTML string for the error login message.
 */
function generateErrorLogin() {
  return `
    <p>Check your email and password. Please try again.<p> 
  `;
}

/**
 * Generates medium priority edit buttons for task prioritization.
 * 
 * @param {number} index - The index of the task.
 * @param {string} id - The unique ID of the task.
 * @returns {string} The HTML string for the medium edit buttons.
 */
function generateButtonMediumEdit(index, id) {
  return `
    <button onclick="setPriority('urgent', ${index}, '${id}')" value="urgent" id="prioUrgentEdit" type="button">Urgent<img id="prioUrgentImgEdit" src="../assets/icons/prioUrgent.svg"></button>
    <button onclick="setPriority('medium', ${index}, '${id}')" value="medium" id="prioMediumEdit" type="button" class="prioMediumActive">Medium<img id="prioMediumImgEdit" src="../assets/icons/prioMediumSelected.svg"></button>
    <button onclick="setPriority('low', ${index}, '${id}')" value="low" id="prioLowEdit" type="button">Low<img id="prioLowImgEdit" src="../assets/icons/prioLow.svg"></button>
  `;
}

/**
 * Generates low priority edit buttons for task prioritization.
 * 
 * @param {number} index - The index of the task.
 * @param {string} id - The unique ID of the task.
 * @returns {string} The HTML string for the low edit buttons.
 */
function generateButtonLowEdit(index, id) {
  return `
    <button onclick="setPriority('urgent', ${index}, '${id}')" value="urgent" id="prioUrgentEdit" type="button">Urgent<img id="prioUrgentImgEdit" src="../assets/icons/prioUrgent.svg"></button>
    <button onclick="setPriority('medium', ${index}, '${id}')" value="medium" id="prioMediumEdit" type="button">Medium<img id="prioMediumImgEdit" src="../assets/icons/prioMedium.svg"></button>
    <button onclick="setPriority('low', ${index}, '${id}')" value="low" id="prioLowEdit" type="button" class="prioLowActive">Low<img id="prioLowImgEdit" src="../assets/icons/prioLowSelected.svg"></button>
  `;
}

/**
 * Generates urgent priority edit buttons for task prioritization.
 * 
 * @param {number} index - The index of the task.
 * @param {string} id - The unique ID of the task.
 * @returns {string} The HTML string for the urgent edit buttons.
 */
function generateButtonUrgentEdit(index, id) {
  return ` 
    <button onclick="setPriority('urgent', ${index}, '${id}')" value="urgent" id="prioUrgentEdit" type="button" class="prioUrgentActive">Urgent<img id="prioUrgentImgEdit" src="../assets/icons/prioUrgentSelected.svg"></button>
    <button onclick="setPriority('medium', ${index}, '${id}')" value="medium" id="prioMediumEdit" type="button">Medium<img id="prioMediumImgEdit" src="../assets/icons/prioMedium.svg"></button>
    <button onclick="setPriority('low', ${index}, '${id}')" value="low" id="prioLowEdit" type="button">Low<img id="prioLowImgEdit" src="../assets/icons/prioLow.svg"></button>
  `;
}

/**
 * Generates HTML for a subtask in a task.
 * 
 * @param {number} i - The index of the subtask.
 * @param {number} index - The index of the main task.
 * @returns {string} The HTML string for the subtask.
 */
function generateSubtasks(i, index) {
  return `
    <li class="subtask" data-index="${i}">
      <input type="text" class="subtask-edit-input" value="${allBoardContent[index].subtasks[i].description}" style="display: none;">
      <span class="subtask-text">${allBoardContent[index].subtasks[i].description}</span>
      <div class="subtask-actions">
        <div class="icon-wrapper">
          <img src="../assets/icons/edit.svg" alt="Edit" onclick="editSubtaskEdit(${index}, ${i})" class="action-icon edit-icon">
        </div>
        <div class="icon-wrapper">
          <img src="../assets/icons/delete.svg" alt="Delete" onclick="deleteSubtaskEdit(${index}, ${i})" class="action-icon delete-icon">
        </div>
        <div class="icon-wrapper">
          <img src="../assets/icons/check.svg" alt="Save" onclick="saveSubtaskEdit(${index}, ${i})" class="action-icon save-icon" style="display: none;">
        </div>
      </div>
    </li>
  `;
}

/**
 * Generates HTML for a subtask list.
 * 
 * @param {number} i - The index of the subtask.
 * @returns {string} The HTML string for the subtask list.
 */
function generateSubtaskList(i) {
  return `
    <li class="subtask" data-index="${i}">
      <input type="text" class="subtask-edit-input" value="${subtasks[i].description}" style="display: none;">
      <span class="subtask-text">${subtasks[i].description}</span>
      <div class="subtask-actions">
        <div class="icon-wrapper">
          <img src="../assets/icons/edit.svg" alt="Edit" onclick="editSubtask(${i})" class="action-icon edit-icon">
        </div>
        <div class="icon-wrapper">
          <img src="../assets/icons/delete.svg" alt="Delete" onclick="deleteSubtask(${i})" class="action-icon delete-icon">
        </div>
        <div class="separator"></div>
        <div class="icon-wrapper">
          <img src="../assets/icons/check.svg" alt="Save" onclick="saveSubtask(${i})" class="action-icon save-icon" style="display: none;">
        </div>
      </div>
    </li>
  `;
}

/**
 * Generates the HTML content for a subtask in a popup window.
 *
 * @param {Object} subtask - The subtask object containing details like description and completion status.
 * @param {number} boardIndex - The index of the board to which the subtask belongs.
 * @param {number} subtaskIndex - The index of the subtask within the board.
 * @returns {string} - The generated HTML string for the subtask content in the popup.
 */
function generateSubtaskPopupContent(subtask, boardIndex, subtaskIndex) {
  return `
        <div class="subtaskCardPopUpContent"> 
          <input type="checkbox" ${subtask.completed ? "checked" : ""}
              onchange="toggleSubtaskCompletion(${boardIndex}, ${subtaskIndex}, this.checked)">
          ${subtask.description}
        </div>`;
}

/**
 * Generates the HTML for a list of contacts.
 * 
 * @param {number} index - The index of the contact in the contact array.
 * @returns {string} The HTML string for the contact list item.
 */
function generateContactList(index) {
  return `
    <div class='contact flex' onclick='toggleContactCheckbox(event)'>
        <div class='flex'>
            <span class='circle flex' style='background:${allContacts[index]["color"]}'>
                ${getInitials(allContacts[index]["name"]).toUpperCase()}
            </span>
            <span>${allContacts[index].name}</span>
        </div>
        <input type="checkbox" value="${allContacts[index].name}">
    </div>
  `;
}

/**
 * Generates the HTML for editing a contact in a task.
 *
 * @param {Object} contact - The contact object containing details like name and color.
 * @param {string} initials - The initials of the contact to display in the UI.
 * @param {string} checkedContact - Indicates whether the contact's checkbox should be checked (e.g., 'checked').
 * @returns {string} - The generated HTML string for the contact edit section.
 */
function generateContactEdit(contact, initials, checkedContact) {
  return `
    <div class='contactEdit flex' onclick='editTaskContact(event)'>
        <div class='flex'>
            <span class='circleEdit flex' style='background:${contact.color}'>
              ${initials}
            </span>
            <span>
              ${contact.name}
            </span>
        </div>
        <input type="checkbox" ${checkedContact} value="${contact.name}">
    </div>
  `;
}

/**
 * Gets the initials from a given name.
 * 
 * @param {string} name - The name from which to extract initials.
 * @returns {string} The initials extracted from the name.
 */
function getInitials(name) {
  return name.split(" ").map((n) => n[0]).join("");
}

/**
 * Generates an HTML card for a board task.
 * 
 * @param {number} index - The index of the board card.
 * @param {string} categoryColor - The background color of the category.
 * @param {string} contactsHTML - The HTML string for the contacts associated with the task.
 * @param {string} statusImage - The HTML string for the status image of the task.
 * @returns {string} The HTML string for the board card.
 */
function generateBoardCard(index, categoryColor, contactsHTML, statusImage) {
  return `
  <div class="boardCardWithSubmenu">
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
        <div>${contactsHTML}</div>
        <div class="prioBoardCard">${statusImage}</div>
      </div>
    </div>
    <div id="toggleSubmenu" class="toggleSubmenu" onclick="toggleSubmenu(event, ${index})">
      <img class="updown"src="../assets/icons/updown2.svg">
    </div>
    <div id="submenu-${index}" class="submenu hidden">
      <ul> Move to:
        <li onclick="moveTask(${index}, 'toDo')">
        <img src="../assets/icons/dot.png">To do</li>
        <li onclick="moveTask(${index}, 'inProgress')">
        <img src="../assets/icons/dot.png">In progress</li>
        <li onclick="moveTask(${index}, 'await')">
        <img src="../assets/icons/dot.png">Await feedback</li>
        <li onclick="moveTask(${index}, 'done')">
        <img src="../assets/icons/dot.png">Done</li>
      </ul>
    </div>
  </div>
  `;
}

/**
 * Generates a popup card for displaying detailed task information.
 * 
 * @param {string} categoryColor - The background color of the task category.
 * @param {number} index - The index of the task.
 * @param {string} statusImage - The HTML string for the status image of the task.
 * @param {string} assignedHTML - The HTML string for the assigned contacts.
 * @param {string} subtasksHTML - The HTML string for the subtasks associated with the task.
 * @returns {string} The HTML string for the popup card.
 */
function generatePopupBoardCard(categoryColor, index, statusImage, assignedHTML, subtasksHTML) {
  return `
    <div class="puCategory">
        <span class="boardCategory bc1" style="background-color: ${categoryColor};">
            ${allBoardContent[index].category}
        </span>
        <div class="closeContainer">
            <img class="close" onclick="closePopupCard()" src="../assets/icons/close.svg">
        </div>  
    </div>
    <div class="puTitle">
        ${allBoardContent[index].title}
    </div>
    <div class="puDescription">
        ${allBoardContent[index].description}
    </div>
    <div class="puDate">
        Due date: ${allBoardContent[index].date} 
    </div>
    <div class="puPrio">
        Priority: ${allBoardContent[index].prio} ${statusImage} 
    </div>
    <span>Assigned To:</span>  
    <div class="contactCardPopUpContent">
        ${assignedHTML}
    </div>
    <span>Subtasks</span> 
    <div class="puSubtask">
        ${subtasksHTML}
    </div>
    <div class="deleteEditPopUp">
        <div onclick="deleteDataBoard('${allBoardContent[index].Uid}')" class="delete">
            <img src="../assets/icons/delete.svg" alt="Delete">
            <span>Delete</span>
        </div>
        <div class="info">
            <img src="../assets/icons/I.svg" alt="Info">
        </div>
        <div class="edit" onclick="openPopupCardEdit(${index})">
            <img src="../assets/icons/edit.svg" alt="Edit">
            <div>
                <span>Edit</span>
            </div>
        </div>
    </div>
`;
}

/**
 * Generates a popup for editing board card details.
 * 
 * @param {number} index - The index of the board content.
 * @param {string} assignedHTML - The HTML string for the assigned contacts.
 * @returns {string} The HTML string for the popup edit card.
 */
function generatePopupBoardCardEdit(index, assignedHTML) {
  return `
    <div class= "containerEdit">
      <div class="closeContainerEdit">
        <img class="close" onclick="closePopupCard()" src="../assets/icons/close.svg">
      </div>
      <label for="title">Title<span class="requiredStar"></span></label>
      <input type="text" id="inputEditTitle" placeholder="Enter a title" value="${allBoardContent[index].title}" required>
      <label for="description">Description</label>
      <textarea id="inputEditDescription" rows="5" placeholder="Enter a Description">${allBoardContent[index].description}</textarea>
      <label for="dueDate">Due Date<span class="requiredStar"></span></label>
      <input type="date" id="inputEditDate" value="${allBoardContent[index].date}">
      <label for="prioEdit"><strong>Priority</strong></label>
      <section id="prioEdit" class="flex">
        <button onclick="setPriority('urgent', ${index}, 'prioEdit')" value="urgent" id="prioUrgentEdit" type="button">Urgent<img id="prioUrgentImgEdit" src="../assets/icons/prioUrgent.svg"></button>
        <button onclick="setPriority('medium', ${index}, 'prioEdit')" value="medium" id="prioMediumEdit" type="button" class="prioMediumActive">Medium<img id="prioMediumImgEdit" src="../assets/icons/prioMediumSelected.svg"></button>
        <button onclick="setPriority('low', ${index}, 'prioEdit')" value="low" id="prioLowEdit" type="button">Low<img id="prioLowImgEdit" src="../assets/icons/prioLow.svg"></button>
      </section>
      <label for="contactSelectionEdit">Assigned to</label>
      <div id="contactSelectionEdit" onclick="toggleContactListView(${index})" tabindex="0"> Select contacts to assign</div>
      <div id="profileBadgesEdit" class="profileBadges">${assignedHTML}</div>
      <label for="subtask">Subtasks</label>
      <div id="addSubTaskEdit" class="flex">
        <input id="subtaskEdit" class="addSubTask" placeholder="Add new subtask" type="text">
        <img onclick="addSubtaskEdit(${index})" style="cursor:pointer" src="../assets/icons/addSubtask.svg">
      </div>
      <ul id="subTasksListEdit"> 
        ${renderSubtasks(index)}
      </ul>
      <button class="button margin-left" onclick="editTask('${allBoardContent[index].Uid}')">Ok<img src="../assets/icons/create.svg"></button>
    </div>
  `;
}
