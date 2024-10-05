async function updateBoard() {
  await loadDataContacts("");
  await loadDataBoards("");
  await loadDataUsers("");

  checkLogin();
  sanitizeAssignedContacts();  
  renderBoardList();
}

function getCategoryColor(category) {
  return category === "Technical Task" ? "#1FD7C1" : "#0038FF";
}

// Function to generate contacts HTML
function generateContactsHTML(assignedContacts) {
  let contactsHTML = "";
  if (Array.isArray(assignedContacts)) {
    assignedContacts.forEach((contactName) => {
      allContacts.find((contact) => {
        if (contact.name === contactName) {
          contactColors[contactName] = contact.color;
          contactsHTML += `
            <span class="contactCard" style="background-color: ${contact.color}">
              ${getInitials(contact.name).toUpperCase()}
            </span>`;
        }
      });
    });
  }
  return contactsHTML;
}

// Function to get priority image based on task priority
function getPriorityImage(priority) {
  switch (priority) {
    case "urgent":
      return '<img src="../assets/icons/prioUrgent.svg" alt="Urgent Priority">';
    case "medium":
      return '<img src="../assets/icons/prioMedium.svg" alt="Medium Priority">';
    case "low":
      return '<img src="../assets/icons/prioLow.svg" alt="Low Priority">';
    default:
      return "";
  }
}

// Main function to generate board content
function htmlTemplateGenerateBoardContent(index) {
  let task = allBoardContent[index];
  let categoryColor = getCategoryColor(task.category);
  let contactsHTML = generateContactsHTML(task.asigned || []);
  let statusImage = getPriorityImage(task.prio);
  
  return generateBoardCard(index, categoryColor, contactsHTML, statusImage);
}

function generateBoardContent(index) {
  return htmlTemplateGenerateBoardContent(index);
}

// Function to clear the containers
function clearContainers() {
  document.getElementById("toDo").innerHTML = "";
  document.getElementById("inProgress").innerHTML = "";
  document.getElementById("awaitFeedback").innerHTML = "";
  document.getElementById("done").innerHTML = "";
}

// Function to render tasks into containers based on status
function renderTaskToContainer(task, index) {
  let container;
  switch (task.status) {
    case "toDo":
      container = document.getElementById("toDo");
      container.innerHTML += generateBoardContent(index);
      return false;
    case "inProgress":
      container = document.getElementById("inProgress");
      container.innerHTML += generateBoardContent(index);
      return false;
    case "await":
      container = document.getElementById("awaitFeedback");
      container.innerHTML += generateBoardContent(index);
      return false;
    case "done":
      container = document.getElementById("done");
      container.innerHTML += generateBoardContent(index);
      return false;
    default:
      return true;
  }
}

// Function to show empty column messages
function displayEmptyColumnMessages(isToDoEmpty, isProgressEmpty, isAwaitEmpty, isDoneEmpty) {
  if (isToDoEmpty) {
    document.getElementById("toDo").innerHTML = `<div class="emptyColumnMessage">No tasks in To-Do</div>`;
  }
  if (isProgressEmpty) {
    document.getElementById("inProgress").innerHTML = `<div class="emptyColumnMessage">No tasks in Progress</div>`;
  }
  if (isAwaitEmpty) {
    document.getElementById("awaitFeedback").innerHTML = `<div class="emptyColumnMessage">No tasks awaiting feedback</div>`;
  }
  if (isDoneEmpty) {
    document.getElementById("done").innerHTML = `<div class="emptyColumnMessage">No tasks completed</div>`;
  }
}

// Main function to render the board list
function renderBoardList() {
  clearContainers();

  let isToDoEmpty = true;
  let isProgressEmpty = true;
  let isAwaitEmpty = true;
  let isDoneEmpty = true;

  allBoardContent.forEach((task, index) => {
    const emptyStatus = renderTaskToContainer(task, index);

    if (emptyStatus) return;
    if (task.status === "toDo") isToDoEmpty = false;
    if (task.status === "inProgress") isProgressEmpty = false;
    if (task.status === "await") isAwaitEmpty = false;
    if (task.status === "done") isDoneEmpty = false;
  });

  displayEmptyColumnMessages(isToDoEmpty, isProgressEmpty, isAwaitEmpty, isDoneEmpty);
}

function getCategoryColor(category) {
  return category === "Technical Task" ? "#1FD7C1" : "#0038FF";
}

function generatePersonHTML(person) {
  const initials = getInitials(person).toUpperCase();
  const color = contactColors[person];

  if (color) {
    return `
      <div style="display: flex; align-items: center;">
        <span class="contactCard" style="background-color: ${color}; color: white; padding: 4px 8px; border-radius: 50%; margin-right: 8px;">
          ${initials}
        </span>
        ${person}
      </div><br>
    `;
  }
  return '';
}

// Function to generate the full HTML for assigned people
function generateAssignedHTML(assignedPeople) {
  let assignedHTML = "";
  if (Array.isArray(assignedPeople)) {
    assignedPeople.forEach((person) => {
      assignedHTML += generatePersonHTML(person);
    });
  }
  return assignedHTML;
}
// Funktion zur Ermittlung des Status-Bildes basierend auf der Priorität
function getStatusImage(priority) {
  switch (priority) {
    case "urgent":
      return '<img src="../assets/icons/prioUrgent.svg" alt="Urgent Priority">';
    case "medium":
      return '<img src="../assets/icons/prioMedium.svg" alt="Medium Priority">';
    case "low":
      return '<img src="../assets/icons/prioLow.svg" alt="Low Priority">';
    default:
      return "";
  }
}

// Funktion zur Generierung des HTML für die Unteraufgaben (Subtasks)
function generateSubtasksHTML(subtasks, boardIndex) {
  let subtasksHTML = "";
  if (Array.isArray(subtasks)) {
    subtasks.forEach((subtask, subtaskIndex) => {
      subtasksHTML += `
        <div class="subtaskCardPopUpContent"> 
          <input type="checkbox" ${subtask.completed ? "checked" : ""}
              onchange="toggleSubtaskCompletion(${boardIndex}, ${subtaskIndex}, this.checked)">
          ${subtask.description}
        </div>`;
    });
  }
  return subtasksHTML;
}

// Hauptfunktion zur Erstellung des HTML-Templates für das Popup der Board-Karte
function htmlTemplatePopUpBoardCard(index) {
  const categoryColor = getCategoryColor(allBoardContent[index].category);
  const assignedHTML = generateAssignedHTML(allBoardContent[index].asigned);
  const statusImage = getStatusImage(allBoardContent[index].prio);
  const subtasksHTML = generateSubtasksHTML(allBoardContent[index].subtasks, index);

  return generatePopupBoardCard(categoryColor, index, statusImage, assignedHTML, subtasksHTML);
}

function htmlTemplatePopUpBoardCardEdit(index) {
  const assignedHTML = generateAssignedHTML(allBoardContent[index].asigned);

  return generatePopupBoardCardEdit(index, assignedHTML);
}

function showActions(index) {
  document.getElementById(`subtask-actions-${index}`).style.display = "flex";
}

function hideActions(index) {
  document.getElementById(`subtask-actions-${index}`).style.display = "none";
}

async function updateTask(uid, data) {
  try {
    await updateTaskFirebase(uid, data);

    const index = allBoardContent.findIndex((task) => task.Uid === uid);
    if (index !== -1) {
      allBoardContent[index] = { ...allBoardContent[index], ...data };
    }
    renderBoardList();

  } catch (error) {
    console.error("Fehler beim Aktualisieren der Task:", error);
    alert("Es gab ein Problem beim Aktualisieren der Task.");
  }
}

async function deleteDataBoard(uid) {
  try {
    await handleDeleteTaskRequest(uid);

    closePopupCard();
    updateBoard();

  } catch (error) {
    console.error("Fehler beim Löschen der Task:", error);
    alert("Es gab ein Problem beim Löschen der Task.");
  }
}

function editTask(uid) {
  const title = document.getElementById("inputEditTitle").value;
  const description = document.getElementById("inputEditDescription").value;
  const date = document.getElementById("inputEditDate").value;
  const originalIndex = allBoardContent.findIndex((task) => task.Uid === uid);

  if (originalIndex == -1) {
    console.error("Task mit ID", uid, "nicht gefunden!");
    return;
  }
  let contactNames = collectSelectedContacts(originalIndex);

  const updatedTask = {
    ...allBoardContent[originalIndex],
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

function collectSelectedContacts(index) {
  const originalTask = allBoardContent[index];
  let contactNames = originalTask.asigned;
  let selectedContacts = document.querySelectorAll('#contactListEdit .contactEdit input[type="checkbox"]:checked');

  if (selectedContacts.length > 0) {
    contactNames = [];
    for (let i = 0; i < selectedContacts.length; i++) {
      let name = selectedContacts[i].value;
      contactNames.push(name);
    }
  }
  return contactNames;
}

// Funktion zum Sortieren der Kontakte nach Namen
function getSortedContacts(contacts) {
  return [...contacts].sort((a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
    return 0;
  });
}

// Funktion zum Überprüfen, ob ein Kontakt zugewiesen ist
function isContactAssigned(contactName, assignedContacts) {
  return assignedContacts && assignedContacts.find((name) => name === contactName);
}

// Funktion zum Erstellen des HTML für einen einzelnen Kontakt
function createContactEditHTML(contact, initials, isChecked) {
  const checkedContact = isChecked ? "checked" : "";
  
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

// Hauptfunktion zum Erstellen der Kontaktliste für das Board
function renderContactSelectionBoard(index) {
  let contactListEdit = "";
  
  const sortedContacts = getSortedContacts(allContacts);
  
  for (let i = 0; i < sortedContacts.length; i++) {
    const initials = getInitials(sortedContacts[i].name).toUpperCase();
    const isChecked = isContactAssigned(sortedContacts[i].name, allBoardContent[index].asigned);
    
    contactListEdit += createContactEditHTML(sortedContacts[i], initials, isChecked);
  }
  
  return contactListEdit;
}

function toggleContactListView(index) {
  const existingDropdown = document.getElementById("contactListEdit");

  if (existingDropdown) {
    allBoardContent[index].asigned = collectSelectedContacts(index);
    const badges = document.getElementById("profileBadgesEdit");
    badges.innerHTML = generateAssignedHTML(allBoardContent[index].asigned);
    existingDropdown.remove();
  } else {
    createDropdown(index);
  }
}

function createDropdown(index) {
  const contactList = document.createElement("div");

  contactList.id = "contactListEdit";
  contactList.classList.add("flex");
  contactList.innerHTML = renderContactSelectionBoard(index); 

  const container = document.getElementById("contactSelectionEdit");

  container.parentElement.insertBefore(contactList, container.nextSibling); 
  document.addEventListener("click", closeDropdownOnClickOutside);
}

function toggleContactListViewAddTask(event) {
  let contactList = document.getElementById("contactList");
  contactList.classList.toggle("hidden");

  if (!contactList.classList.contains("hidden")) {
    document.addEventListener("click", closeDropdownOnClickOutside);
  } else {
    document.removeEventListener("click", closeDropdownOnClickOutside);
  }
}

addTaskForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  let data = collectFormData();
  try {
    await postDataBoards("", data);
  } catch (error) {
    console.error("Error posting data to Firebase:", error);
  }
  updateBoard();
  showPopupTask();
  closePopup();
  document.body.classList.remove('no-scroll');
});

function showPopupTask() {
  const overlay = document.getElementById("popupOverlay1");
  const success = document.getElementById("popupContactSuccessAddedTaskButton");

  overlay.style.display = "flex";
  success.style.display = "flex";
  success.style.opacity = "0";

  setTimeout(() => {
    success.style.opacity = "1";
  }, 1);

  setTimeout(function () {
    closePopupContactSuccessAddedTask();
  }, 1250);
}

function closePopupContactSuccessAddedTask() {
  document.getElementById("popupOverlay1").style.display = "none";
  document.getElementById("popupContactSuccessAddedTaskButton").style.display = "none";
}

function generateAssignedHTML(assignedContacts) {
  let assignedHTML = "";

  if (Array.isArray(assignedContacts)) {
    assignedContacts.forEach((person) => {
      const initials = getInitials(person).toUpperCase() || "";
      const color = allContacts.find((contact) => contact.name === person).color || "";
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


function moveTask(index, newStatus) {
  const card = document.getElementById(`board-${index}`);
  
  // Aktualisiere den Status der Aufgabe in deiner Datenstruktur
  let currentTask = allBoardContent[index];
  currentTask.status = newStatus;

  // Verschiebe die Karte in die neue Spalte
  const dropArea = document.querySelector(`.drag-area[data-status="${newStatus}"]`);

  // Überprüfen, ob die Drop-Area existiert
  if (dropArea) {
    dropArea.appendChild(card);
    updateTask(currentTask.Uid, currentTask); // Aktualisiere die Aufgabe in der Datenbank
  }
}

// Verhindert die Weitergabe des Klickereignisses
function stopPropagationHandler(event) {
  event.stopPropagation();
}

// Berechnet die Position des Submenüs relativ zur Board-Karte
function calculateSubmenuPosition(index, additionalOffsetTop = 25, additionalOffsetLeft = 30) {
  const boardCard = document.getElementById(`board-${index}`);
  const submenu = document.getElementById(`submenu-${index}`);

  const rect = boardCard.getBoundingClientRect();
  
  // Berechnet die Position mit den zusätzlichen Offsets
  const top = rect.bottom + window.scrollY + additionalOffsetTop;
  const left = rect.left + additionalOffsetLeft;
  
  submenu.style.top = `${top}px`;
  submenu.style.left = `${left}px`;
}

// Schaltet die Sichtbarkeit des Submenüs um
function toggleVisibility(submenu) {
  const isVisible = !submenu.classList.contains('hidden');
  
  if (!isVisible) {
    submenu.classList.remove('hidden');
  } else {
    submenu.classList.add('hidden');
  }
}

// Hauptfunktion zum Aufruf der Teilfunktionen
function toggleSubmenu(event, index) {
  stopPropagationHandler(event);

  const submenu = document.getElementById(`submenu-${index}`);
  
  calculateSubmenuPosition(index);
  toggleVisibility(submenu);
}
//Schließe das Submenü, wenn irgendwo außerhalb geklickt wird
document.addEventListener('click', () => {
  document.querySelectorAll('.submenu').forEach((sub) => {
    sub.classList.add('hidden');
  });
});