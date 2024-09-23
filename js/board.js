async function updateBoard() {
  await loadDataContacts("");
  await loadDataBoards("");
  await loadDataUsers("");

  sanitizeAssignedContacts();  
  renderBoardList();
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function handleDrop(ev, status) {
  ev.preventDefault();
  let data = ev.dataTransfer.getData("text");
  let draggedElement = document.getElementById(data);

  if (ev.target.contains(draggedElement)) {
    return;
  }

  ev.target.appendChild(draggedElement);
  let index = parseInt(data.split("-")[1]);
  let currentTask = allBoardContent[index];
  currentTask.status = status;
  updateTask(currentTask.Uid, currentTask);
}

function dropDone(ev) {
  handleDrop(ev, "done");
}

function dropAwait(ev) {
  handleDrop(ev, "await");
}

function dropInProgress(ev) {
  handleDrop(ev, "in progress");
}

function dropToDo(ev) {
  handleDrop(ev, "toDo");
}

function renderBoardList() {
  let toDoContainer = document.getElementById("toDo");
  let progressContainer = document.getElementById("inProgress");
  let awaitContainer = document.getElementById("awaitFeedback");
  let doneContainer = document.getElementById("done");

  // Leere die Container
  toDoContainer.innerHTML = "";
  progressContainer.innerHTML = "";
  awaitContainer.innerHTML = "";
  doneContainer.innerHTML = "";

  // Variablen zur Überprüfung, ob die Spalten leer sind
  let isToDoEmpty = true;
  let isProgressEmpty = true;
  let isAwaitEmpty = true;
  let isDoneEmpty = true;

  // Durchlaufe alle Aufgaben und fülle die entsprechenden Spalten
   
  for (let index = 0; index < allBoardContent.length; index++) {
    let task = allBoardContent[index];
    if (task.status === "toDo") {
      toDoContainer.innerHTML += generateBoardContent(index);
      isToDoEmpty = false;
    } else if (task.status === "in progress") {
      progressContainer.innerHTML += generateBoardContent(index);
      isProgressEmpty = false;
    } else if (task.status === "await") {
      awaitContainer.innerHTML += generateBoardContent(index);
      isAwaitEmpty = false;
    } else if (task.status === "done") {
      doneContainer.innerHTML += generateBoardContent(index);
      isDoneEmpty = false;
    }
  }

  // Zeige Nachrichten für leere Spalten an
  if (isToDoEmpty) {
    toDoContainer.innerHTML = `<div class="emptyColumnMessage">No tasks in To-Do</div>`;
  }
  if (isProgressEmpty) {
    progressContainer.innerHTML = `<div class="emptyColumnMessage">No tasks in Progress</div>`;
  }
  if (isAwaitEmpty) {
    awaitContainer.innerHTML = `<div class="emptyColumnMessage">No tasks awaiting feedback</div>`;
  }
  if (isDoneEmpty) {
    doneContainer.innerHTML = `<div class="emptyColumnMessage">No tasks completed</div>`;
  }
}


function openPopup() {
  const popupOverlay = document.getElementById("popupOverlay");
  const popupModal = document.getElementById("popupModal");

  // Zeige das Overlay und das Popup an
  popupOverlay.style.display = "flex";
  popupModal.style.display = "block";

  // Entferne die `hide`-Klasse (falls vorhanden) und füge die `show`-Klasse hinzu
  popupModal.classList.remove("hide");
  popupModal.classList.add("show");
}

function openPopupCard(index) {
  const popupOverlay = document.getElementById("popupOverlayCard");
  const popupModal = document.getElementById("popupModalCard");

  popupModal.innerHTML = htmlTemplatePopUpBoardCard(index);

  // Zeige das Overlay und das Popup an
  popupOverlay.style.display = "flex";
  popupModal.style.display = "block";

  // Entferne die `hide`-Klasse (falls vorhanden) und füge die `show`-Klasse hinzu
  popupModal.classList.remove("hide");
  popupModal.classList.add("show");
}

function htmlTemplatePopUpBoardCard(index) {
  let assignedHTML = "";
  let subtasksHTML = "";

  // Bestimme die Textfarbe des span basierend auf der Kategorie
  let categoryColor = "";
  if (allBoardContent[index].category === "Technical Task") {
    categoryColor = "#1FD7C1"; // Farbe für "Technical Task"
  } else {
    categoryColor = "#0038FF"; // Farbe für "User Story"
  }

  // Initialen und Namen der zugewiesenen Personen
  if (Array.isArray(allBoardContent[index].asigned)) {
    allBoardContent[index].asigned.forEach((person) => {
      const initials = getInitials(person);
      // const color = contactColors[person] || '#cccccc'; // Standardfarbe, falls keine Farbe gefunden wird
      const color = contactColors[person];
      if (color) {
        assignedHTML += `
        <div style="display: flex; align-items: center;">
          <span class="contactCard" style="background-color: ${color}; color: white; padding: 4px 8px; border-radius: 50%; margin-right: 8px;">
            ${initials}
          </span>
          ${person}
        </div><br>`;
      } 
    });
  }
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

  // Subtasks
  if (Array.isArray(allBoardContent[index].subtasks)) {
    allBoardContent[index].subtasks.forEach((subtask, subtaskIndex) => {
      subtasksHTML += `
            <div class="subtaskCardPopUpContent"> 
                <input type="checkbox" ${subtask.completed ? "checked" : ""}
                    onchange="toggleSubtaskCompletion(${index}, ${subtaskIndex}, this.checked)">
                ${subtask.description}
            </div>`;
    });
  }

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

function openPopupCardEdit(index) {
  const popupModal = document.getElementById("popupModalCardEdit");
  popupModal.innerHTML = htmlTemplatePopUpBoardCardEdit(index);

  setPriority(allBoardContent[index].prio, index);

  popupModal.style.display = "block";
  popupModal.classList.remove("hide");
  popupModal.classList.add("show");
}

function htmlTemplatePopUpBoardCardEdit(index) {
  const assignedHTML = generateAssignedHTML(allBoardContent[index].asigned);

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
        <button onclick="setPriority('urgent', ${index})" value="urgent" id="prioUrgentEdit" type="button">Urgent<img id="prioUrgentImgEdit" src="../assets/icons/prioUrgent.svg"></button>
        <button onclick="setPriority('medium', ${index})" value="medium" id="prioMediumEdit" type="button" class="prioMediumActive">Medium<img id="prioMediumImgEdit" src="../assets/icons/prioMediumSelected.svg"></button>
        <button onclick="setPriority('low', ${index})" value="low" id="prioLowEdit" type="button">Low<img id="prioLowImgEdit" src="../assets/icons/prioLow.svg"></button>
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

// PRIORITY
function setPriority(priority, index){
  let priorityContainer = document.getElementById('prioEdit');
  if (priority === 'urgent'){
    priorityContainer.innerHTML = generateButtonUrgentEdit(index);
    allBoardContent[index].prio = 'urgent';
  } else if (priority === 'low') {
    priorityContainer.innerHTML = generateButtonLowEdit(index);
    allBoardContent[index].prio = 'low';
  } else {
    priorityContainer.innerHTML = generateButtonMediumEdit(index);
    allBoardContent[index].prio = 'medium';
  }
}

// SUBTASK EDIT

function addSubtaskEdit(index) {
  if(!allBoardContent[index].subtasks){
    allBoardContent[index].subtasks = [];
  }
  if (subtaskEdit.value != "") {
    allBoardContent[index].subtasks.push({
      description: subtaskEdit.value,
      completed: false, // Standardmäßig auf false setzen
    });
    renderSubtaskListEdit(index);
    subtaskEdit.value = ""; // Leert das Eingabefeld nach dem Hinzufügen
  }
}

function renderSubtaskListEdit(index) {
  let subtasksListEdit = document.getElementById("subTasksListEdit");
  subtasksListEdit.innerHTML = renderSubtasks(index);
}

function editSubtaskEdit(taskIndex, subtaskIndex) {
  const subtaskItem = document.querySelector(
    `.subtask[data-index='${subtaskIndex}']`
  );
  const subtaskText = subtaskItem.querySelector(".subtask-text");
  const subtaskInput = subtaskItem.querySelector(".subtask-edit-input");
  const editIcon = subtaskItem.querySelector(".edit-icon");
  const saveIcon = subtaskItem.querySelector(".save-icon");

  // Füge die Klasse hinzu, um den Hover-Effekt zu deaktivieren
  subtaskItem.classList.add("editing");

  // Verstecke den Text und zeige das Eingabefeld
  subtaskText.style.display = "none";
  subtaskInput.style.display = "block";

  // Setze das Eingabefeld in den bearbeitbaren Zustand
  subtaskInput.focus();

  // Setze den Cursor an das Ende des Textes
  const length = subtaskInput.value.length;
  subtaskInput.setSelectionRange(length, length);

  // Zeige das Speichern-Symbol, verstecke das Bearbeiten-Symbol
  editIcon.style.display = "none";
  saveIcon.style.display = "block";
}

function saveSubtaskEdit(taskIndex, subtaskIndex) {
  const subtaskItem = document.querySelector(
    `.subtask[data-index='${subtaskIndex}']`
  );
  const subtaskText = subtaskItem.querySelector(".subtask-text");
  const subtaskInput = subtaskItem.querySelector(".subtask-edit-input");
  const editIcon = subtaskItem.querySelector(".edit-icon");
  const saveIcon = subtaskItem.querySelector(".save-icon");

  // Aktualisiere den Subtask-Text
  allBoardContent[taskIndex].subtasks[subtaskIndex].description = subtaskInput.value;

  // Aktualisiere die Anzeige
  subtaskText.textContent = subtaskInput.value;
  subtaskText.style.display = "block";
  subtaskInput.style.display = "none";

  // Entferne die Klasse, um den Hover-Effekt wieder zu aktivieren
  subtaskItem.classList.remove("editing");

  // Zeige das Bearbeiten-Symbol, verstecke das Speichern-Symbol
  editIcon.style.display = "block";
  saveIcon.style.display = "none";
}

function deleteSubtaskEdit(taskIndex, subtaskIndex) {
  allBoardContent[taskIndex].subtasks.splice(subtaskIndex, 1);
  renderSubtaskListEdit(taskIndex); // Aktualisiere die Liste nach dem Löschen
}

function showActions(index) {
  document.getElementById(`subtask-actions-${index}`).style.display = "flex";
}

function hideActions(index) {
  document.getElementById(`subtask-actions-${index}`).style.display = "none";
}

// ENDE SUBTASK EDIT

function closePopup() {
  const popupOverlay = document.getElementById("popupOverlay");
  const popupModal = document.getElementById("popupModal");
  popupOverlay.style.display = "none";
  popupModal.classList.remove("show");
  popupModal.classList.add("hide");

  setTimeout(() => {
    popupModal.style.display = "none";
  }, 120);
}

function closePopupCard() {
  const popupOverlay = document.getElementById("popupOverlayCard");
  const popupModal = document.getElementById("popupModalCard");

  // Entferne die `show`-Klasse und füge die `hide`-Klasse hinzu, um die Animation zu starten
  popupModal.classList.remove("show");
  popupModal.classList.add("hide");

  // Verstecke das Popup nach der Animation (120ms entspricht der Dauer der Animation)
  setTimeout(() => {
    popupModal.style.display = "none";
    popupOverlay.style.display = "none"; // Overlay auch nach der Animation ausblenden
  }, 120); // 120ms entspricht der Dauer der Animation
  closePopupCardEdit();
}

function closePopupCardEdit() {
  const popupOverlay = document.getElementById("popupOverlayCardEdit");
  const popupModal = document.getElementById("popupModalCardEdit");
  // Entferne die `show`-Klasse und füge die `hide`-Klasse hinzu, um die Animation zu starten
  popupModal.classList.remove("show");
  popupModal.classList.add("hide");

  popupModal.style.display = "none";
  popupOverlay.style.display = "none";
}

async function updateTask(uid, data) {
  try {
    let response = await fetch(`${BASE_URL_Board}/${uid}.json`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(
        `Fehler beim Aktualisieren der Task: ${response.statusText}`
      );
    }

    console.log("Task erfolgreich aktualisiert:", await response.json());

    // Lokale Kontakte aktualisieren
    const index = allBoardContent.findIndex((task) => task.Uid === uid);
    if (index !== -1) {
      allBoardContent[index] = { ...allBoardContent[index], ...data };
    }

    // UI aktualisieren
    renderBoardList();
  } catch (error) {
    console.error("Fehler beim Aktualisieren der Task:", error);
    alert("Es gab ein Problem beim Aktualisieren der Task.");
  }
}

async function deleteDataBoard(uid) {
  try {
    await handleDeleteTaskRequest(`${BASE_URL_Board}/${uid}.json`);

    closePopupCard();
    updateBoard();
  } catch (error) {
    console.error("Fehler beim Löschen der Task:", error);
    alert("Es gab ein Problem beim Löschen der Task.");
  }
}

async function handleDeleteTaskRequest(url) {
  let response = await fetch(url, { method: "DELETE" });

  if (!response.ok)
    throw new Error("Fehler beim Löschen der Task: " + response.statusText);
}

// noch nicht fertig!!!
function editTask(uid) {
  console.log(`editTask aufgerufen mit ID: ${uid}`);

  const title = document.getElementById("inputEditTitle").value;
  const description = document.getElementById("inputEditDescription").value;
  const date = document.getElementById("inputEditDate").value;

  const originalTask = allBoardContent.find((task) => task.Uid === uid);
  const originalIndex = allBoardContent.findIndex((task) => task.Uid === uid);

  if (!originalTask) {
    console.error("Task mit ID", uid, "nicht gefunden!");
    return;
  }
  let contactNames = originalTask.asigned;

  let selectedContacts = document.querySelectorAll(
    '#contactListEdit .contactEdit input[type="checkbox"]:checked'
  );
    contactNames = [];
    for (let i = 0; i < selectedContacts.length; i++) {
      let name = selectedContacts[i].value;
      contactNames.push(name);
    }

  const updatedTask = {
    ...originalTask,
    title: title,
    description: description,
    date: date,
    asigned: contactNames,
  };

  allBoardContent[originalIndex] = updatedTask;
  updateTask(uid, updatedTask);
  closePopupCardEdit();
  openPopupCard(originalIndex);
}

function renderContactSelection(index) {
  let contactListEdit = "";
   
  for (i = 0; i < allContacts.length; i++) {
    const firstLetter = allContacts[i]["name"][0];
    const spaceIndex = allContacts[i]["name"].indexOf(" ");
    const firstLetterAfterSpace = allContacts[i]["name"][spaceIndex + 1];

    let checkedContact = "";

    if (
      allBoardContent[index].asigned &&
      allBoardContent[index].asigned.find(
        (name) => name === allContacts[i]["name"]
      )
    ) {
      checkedContact = "checked";
    }

    contactListEdit += `
                <div class='contactEdit flex' onclick='editTaskContact(event)'>
                    <div class='flex'>
                        <span class='circleEdit flex' style='background:${
                          allContacts[i]["color"]
                        }'>
                          ${firstLetter + firstLetterAfterSpace}
                        </span>
                        <span>
                          ${allContacts[i].name}
                        </span>
                    </div>
                    <input type="checkbox" ${checkedContact} value="${
      allContacts[i].name
    }">
                </div>
        `;
  }
  return contactListEdit;
}

function toggleContactListView(index) {
  const existingDropdown = document.getElementById("contactListEdit");

  if (existingDropdown) {
    // Entferne das Dropdown, wenn es bereits existiert
    existingDropdown.remove();
  } else {
    // Erstelle und füge das Dropdown dynamisch ein
    createDropdown(index);
  }
}

function createDropdown(index) {
  // Erstelle das Dropdown-Menü
  const contactList = document.createElement("div");
  contactList.id = "contactListEdit";
  contactList.classList.add("flex");

  // Füge den HTML-Inhalt der Kontakte hinzu
  contactList.innerHTML = renderContactSelection(index); // Erzeugt den HTML-Code der Kontakte

  // Füge das Dropdown unterhalb des 'contactSelectionEdit' ein
  const container = document.getElementById("contactSelectionEdit");
  container.parentElement.insertBefore(contactList, container.nextSibling); // Füge es als Geschwisterelement hinzu

  // Füge eventListener hinzu, um das Dropdown zu schließen, wenn irgendwo anders geklickt wird
  document.addEventListener("click", closeDropdownOnClickOutside);
}

function closeDropdownOnClickOutside(event) {
  const dropdown = document.getElementById("contactListEdit");
  const contactSelection = document.getElementById("contactSelectionEdit");

  // Überprüfe, ob der Klick außerhalb des Dropdowns und des Kontakt-Selektionsbereichs war
  if (
    dropdown &&
    !dropdown.contains(event.target) &&
    !contactSelection.contains(event.target)
  ) {
    dropdown.remove();
    document.removeEventListener("click", closeDropdownOnClickOutside);
  }
}

function generateAssignedHTML(assignedContacts) {
  let assignedHTML = "";

  if (Array.isArray(assignedContacts)) {
    assignedContacts.forEach((person) => {
      const initials = getInitials(person) || "";
      const color = contactColors[person] || "";
      assignedHTML += `
        <div class="contactCard" style="background-color: ${color}; color: white; padding: 4px 8px; border-radius: 50%; margin-right: 8px;">
          ${initials}
        </div>`;
    });
  }

  return assignedHTML;
}

function editTaskContact(event) {
  if (event.target.type !== "checkbox") {
    let checkbox = event.currentTarget.querySelector('input[type="checkbox"]');
    checkbox.checked = !checkbox.checked;
    event.currentTarget.classList.toggle("selectedContact");
  }
}

function renderSubtasks(index) {
  let returnList = "";

  if (allBoardContent[index].subtasks){
    for (let i = 0; i < allBoardContent[index].subtasks.length; i++) {
      returnList += `
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
      </li>`;
    }
  }
  return returnList;
}

async function toggleSubtaskCompletion(taskIndex, subtaskIndex, isCompleted) {
  try {
    updateLocalSubtaskCompletion(taskIndex, subtaskIndex, isCompleted);
    await updateSubtaskInFirebase(taskIndex, subtaskIndex);
    await updateBoard();
  } catch (error) {
    console.error("Fehler beim Aktualisieren des Subtasks:", error);
  }
}

function updateLocalSubtaskCompletion(taskIndex, subtaskIndex, isCompleted) {
  allBoardContent[taskIndex].subtasks[subtaskIndex].completed = isCompleted;
}

function getSubtaskDisplay(subtasks) {
  if (!subtasks || subtasks.length === 0) {
    return "";
  }

  let subtaskCount = subtasks.length;
  let completedSubtasks = 0;

  for (let i = 0; i < subtaskCount; i++) {
    if (subtasks[i].completed) {
      completedSubtasks++;
    }
  }

  let progressPercentage = (completedSubtasks / subtaskCount) * 100;

  return `
    <div class="progress-bar-container">
      <div class="progress-bar" style="width: ${progressPercentage}%;"></div>
    </div>
    <div>${completedSubtasks}/${subtaskCount} Subtasks</div>
  `;
}

//Für die Suche verwendete Variablen
let titlesDOM = document.getElementsByClassName("bc2");
let descriptionsDOM = document.getElementsByClassName("bc3");
let searchBar = document.getElementsByClassName("searchBar")[0];
let boardCardDOM = document.getElementsByClassName("boardCard");

//Suchfunktion
searchBar.addEventListener("keyup", () => {
  updateBoard().then(() => {
    let searchQuery = searchBar.value.toLowerCase();
    for (i = 0; i < titlesDOM.length; i++) {
      let title = titlesDOM[i].innerHTML.toLowerCase();
      let description = descriptionsDOM[i].innerHTML.toLowerCase();
      if (!(title.includes(searchQuery) || description.includes(searchQuery))) {
        boardCardDOM[i].style.display = "none";
      }
    }
  });
});

