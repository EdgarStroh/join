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
          <span class="profileImg" style="background-color: ${contact.color}">${getInitials(contact.name).toUpperCase()}</span>
          <div class="popup-Right-Side flex-column">
            <form>
              <div class="input_login flex flex-column">
                <input class="name" type="text" id="inputEditName" placeholder="Name" value="${
                  contact.name
                }" required>
                <input class="email" type="email" id="inputEditEmail" placeholder="Email" value="${
                  contact.email
                }" required>
                <input class="phone" type="tel" id="inputEditPhone" placeholder="Phone" value="${
                  contact.phone
                }" required>
              </div>
              <div class="button-line flex">
                <button type="button" class="button-white" onclick="closeEditContact()">Cancel <img src="../assets/icons/cancel.svg" alt="Icon cancel"></button>
                <button type="button" class="button-DB" onclick="editContact('${
                  contact.Uid
                }')">Save <img src="../assets/icons/create.svg" alt="Icon create"></button>
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

function generateButtonMediumEdit(index, id) {
  return `
      <button onclick="setPriority('urgent', ${index}, '${id}')" value="urgent" id="prioUrgentEdit" type="button">Urgent<img id="prioUrgentImgEdit" src="../assets/icons/prioUrgent.svg"></button>
      <button onclick="setPriority('medium', ${index}, '${id}')" value="medium" id="prioMediumEdit" type="button" class="prioMediumActive">Medium<img id="prioMediumImgEdit" src="../assets/icons/prioMediumSelected.svg"></button>
      <button onclick="setPriority('low', ${index}, '${id}')" value="low" id="prioLowEdit" type="button">Low<img id="prioLowImgEdit" src="../assets/icons/prioLow.svg"></button>
    `;
}

function generateButtonLowEdit(index, id) {
  return `
      <button onclick="setPriority('urgent', ${index}, '${id}')" value="urgent" id="prioUrgentEdit" type="button">Urgent<img id="prioUrgentImgEdit" src="../assets/icons/prioUrgent.svg"></button>
      <button onclick="setPriority('medium', ${index}, '${id}')" value="medium" id="prioMediumEdit" type="button">Medium<img id="prioMediumImgEdit" src="../assets/icons/prioMedium.svg"></button>
      <button onclick="setPriority('low', ${index}, '${id}')" value="low" id="prioLowEdit" type="button" class="prioLowActive">Low<img id="prioLowImgEdit" src="../assets/icons/prioLowSelected.svg"></button>
    `;
}

function generateButtonUrgentEdit(index, id) {
  return ` 
      <button onclick="setPriority('urgent', ${index}, '${id}')" value="urgent" id="prioUrgentEdit" type="button" class="prioUrgentActive">Urgent<img id="prioUrgentImgEdit" src="../assets/icons/prioUrgentSelected.svg"></button>
      <button onclick="setPriority('medium', ${index}, '${id}')" value="medium" id="prioMediumEdit" type="button">Medium<img id="prioMediumImgEdit" src="../assets/icons/prioMedium.svg"></button>
      <button onclick="setPriority('low', ${index}, '${id}')" value="low" id="prioLowEdit" type="button">Low<img id="prioLowImgEdit" src="../assets/icons/prioLow.svg"></button>
    `;
}

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
          <div class="separator"></div> <!-- Separator zwischen den Icons -->
          <div class="icon-wrapper">
            <img src="../assets/icons/check.svg" alt="Save" onclick="saveSubtask(${i})" class="action-icon save-icon" style="display: none;">
          </div>
        </div>
      </li>
    `;
}

function generateContactList(index) {
  return `
            <div class='contact flex' onclick='toggleContactCheckbox(event)'>
                <div class='flex'>
                    <span class='circle flex' style='background:${
                      allContacts[index]["color"]
                    }'>
                        ${getInitials(allContacts[index]["name"]).toUpperCase()}
                    </span>
                    <span>${allContacts[index].name}</span>
                </div>
                <input type="checkbox" value="${allContacts[index].name}">
            </div>
        `;
}

function getInitials(name) {
    return name.split(" ").map((n) => n[0]).join("");
}

function generateBoardCard(index, categoryColor, contactsHTML, statusImage) {
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
    <div>
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

function generatePopupBoardCardEdit(index, assignedHTML) {
  return `
    <div class= "containerEdit">
      <div class="closeContainerEdit">
        <img class="close" onclick="closePopupCard()" src="../assets/icons/close.svg">
      </div>
      <label for="title">Title<span class="requiredStar"></span></label>
      <input type="text" id="inputEditTitle" placeholder="Enter a title" value="${
        allBoardContent[index].title
      }" required>
      <label for="description">Description</label>
      <textarea id="inputEditDescription" rows="5" placeholder="Enter a Description">${
        allBoardContent[index].description
      }</textarea>
      <label for="dueDate">Due Date<span class="requiredStar"></span></label>
      <input type="date" id="inputEditDate" value="${
        allBoardContent[index].date
      }">
      <label for="prioEdit"><strong>Priority</strong></label>
      <section id="prioEdit" class="flex">
        <button onclick="setPriority('urgent', ${index}, 'prioEdit')" value="urgent" id="prioUrgentEdit" type="button">Urgent<img id="prioUrgentImgEdit" src="../assets/icons/prioUrgent.svg"></button>
        <button onclick="setPriority('medium', ${index}, 'prioEdit')" value="medium" id="prioMediumEdit" type="button" class="prioMediumActive">Medium<img id="prioMediumImgEdit" src="../assets/icons/prioMediumSelected.svg"></button>
        <button onclick="setPriority('low', ${index}, 'prioEdit')" value="low" id="prioLowEdit" type="button">Low<img id="prioLowImgEdit" src="../assets/icons/prioLow.svg"></button>
      </section>
      <label for="contactSelectionEdit">Assigned to</label>
      <div id="contactSelectionEdit" onclick="toggleContactListView(${index})" tabindex="0"> Select contacts to assign</div>
      <div class="profileBadges">
        ${assignedHTML}
      </div>
      <label for="subtask">Subtasks</label>
      <div id="addSubTaskEdit" class="flex">
        <input id="subtaskEdit" class="addSubTask" placeholder="Add new subtask" type="text">
        <img onclick="addSubtaskEdit(${index})" style="cursor:pointer" src="../assets/icons/addSubtask.svg">
      </div>
      <ul id="subTasksListEdit"> 
        ${renderSubtasks(index)}
      </ul>
      <button class="button margin-left" onclick="editTask('${
        allBoardContent[index].Uid
      }')">Ok<img src="../assets/icons/create.svg"></button>
    </div>
  `;
}