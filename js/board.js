async function updateBoard() {
  await loadDataContacts("");
  await loadDataBoards("");
  await loadDataUsers("");

  checkLogin();
  sanitizeAssignedContacts();  
  renderBoardList();
}

// Funktion, die das HTML-Template generiert
function htmlTemplateGenerateBoardContent(index) {
  let showContacts = allBoardContent[index].asigned || []; 
  let contactsHTML = "";
  let categoryColor = "";

  if (allBoardContent[index].category === "Technical Task") {
    categoryColor = "#1FD7C1"; 
  } else {
    categoryColor = "#0038FF";
  }

  if (Array.isArray(showContacts)) {
    showContacts.forEach((contactName) => {
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
      statusImage = "";
  }
  return generateBoardCard(index, categoryColor, contactsHTML, statusImage);
}

function generateBoardContent(index) {
  return htmlTemplateGenerateBoardContent(index);
}

function renderBoardList() {
  let toDoContainer = document.getElementById("toDo");
  let progressContainer = document.getElementById("inProgress");
  let awaitContainer = document.getElementById("awaitFeedback");
  let doneContainer = document.getElementById("done");

  toDoContainer.innerHTML = "";
  progressContainer.innerHTML = "";
  awaitContainer.innerHTML = "";
  doneContainer.innerHTML = "";

  let isToDoEmpty = true;
  let isProgressEmpty = true;
  let isAwaitEmpty = true;
  let isDoneEmpty = true;
   
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

function htmlTemplatePopUpBoardCard(index) {
  let assignedHTML = "";
  let subtasksHTML = "";
  let categoryColor = "";

  if (allBoardContent[index].category === "Technical Task") {
    categoryColor = "#1FD7C1"; 
  } else {
    categoryColor = "#0038FF"; 
  }

  if (Array.isArray(allBoardContent[index].asigned)) {
    allBoardContent[index].asigned.forEach((person) => {
      const initials = getInitials(person).toUpperCase();
      const color = contactColors[person];

      if (color) {
        assignedHTML += `
          <div style="display: flex; align-items: center;">
            <span class="contactCard" style="background-color: ${color}; color: white; padding: 4px 8px; border-radius: 50%; margin-right: 8px;">
              ${initials}
            </span>
            ${person}
          </div><br>
        `;
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
      statusImage = ""; 
  }

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
  return generatePopupBoardCard(categoryColor, index, statusImage, assignedHTML, subtasksHTML);
}

function htmlTemplatePopUpBoardCardEdit(index) {
  const assignedHTML = generateAssignedHTML(allBoardContent[index].asigned);

  return generatePopupBoardCardEdit(index, assignedHTML);
}

// function addSubtaskEdit(index) {
//   if(!allBoardContent[index].subtasks){
//     allBoardContent[index].subtasks = [];
//   }
//   if (subtaskEdit.value != "") {
//     allBoardContent[index].subtasks.push({
//       description: subtaskEdit.value,
//       completed: false, 
//     });
//     renderSubtaskListEdit(index);
//     subtaskEdit.value = ""; 
//   }
// }

// function renderSubtaskListEdit(index) {
//   let subtasksListEdit = document.getElementById("subTasksListEdit");
//   subtasksListEdit.innerHTML = renderSubtasks(index);
// }

// function editSubtaskEdit(taskIndex, subtaskIndex) {
//   const subtaskItem = document.querySelector(`.subtask[data-index='${subtaskIndex}']`);
//   const subtaskText = subtaskItem.querySelector(".subtask-text");
//   const subtaskInput = subtaskItem.querySelector(".subtask-edit-input");
//   const editIcon = subtaskItem.querySelector(".edit-icon");
//   const saveIcon = subtaskItem.querySelector(".save-icon");

//   subtaskItem.classList.add("editing");
//   subtaskText.style.display = "none";
//   subtaskInput.style.display = "block";
//   subtaskInput.focus();

//   const length = subtaskInput.value.length;
//   subtaskInput.setSelectionRange(length, length);

//   editIcon.style.display = "none";
//   saveIcon.style.display = "block";
// }

// function saveSubtaskEdit(taskIndex, subtaskIndex) {
//   const subtaskItem = document.querySelector(`.subtask[data-index='${subtaskIndex}']`);
//   const subtaskText = subtaskItem.querySelector(".subtask-text");
//   const subtaskInput = subtaskItem.querySelector(".subtask-edit-input");
//   const editIcon = subtaskItem.querySelector(".edit-icon");
//   const saveIcon = subtaskItem.querySelector(".save-icon");

//   allBoardContent[taskIndex].subtasks[subtaskIndex].description = subtaskInput.value;

//   subtaskText.textContent = subtaskInput.value;
//   subtaskText.style.display = "block";
//   subtaskInput.style.display = "none";
//   subtaskItem.classList.remove("editing");

//   editIcon.style.display = "block";
//   saveIcon.style.display = "none";
// }

// function deleteSubtaskEdit(taskIndex, subtaskIndex) {
//   allBoardContent[taskIndex].subtasks.splice(subtaskIndex, 1);
//   renderSubtaskListEdit(taskIndex); 
// }

function showActions(index) {
  document.getElementById(`subtask-actions-${index}`).style.display = "flex";
}

function hideActions(index) {
  document.getElementById(`subtask-actions-${index}`).style.display = "none";
}

async function updateTask(uid, data) {
  try {
    let response = await updateTaskFirebase(uid, data);

    console.log("Task erfolgreich aktualisiert:", await response.json());

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
  console.log(`editTask aufgerufen mit ID: ${uid}`);

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

  let selectedContacts = document.querySelectorAll(
    '#contactListEdit .contactEdit input[type="checkbox"]:checked'
  );
  if (selectedContacts.length > 0) {
    contactNames = [];
    for (let i = 0; i < selectedContacts.length; i++) {
      let name = selectedContacts[i].value;
      contactNames.push(name);
    }
  }
  return contactNames;
}

function renderContactSelectionBoard(index) {
  let contactListEdit = "";

  const sortedContacts = [...allContacts].sort((a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
    return 0;
  });

  for (let i = 0; i < sortedContacts.length; i++) {
    const initials = getInitials(sortedContacts[i]["name"]).toUpperCase();
    let checkedContact = "";

    if (
      allBoardContent[index].asigned &&
      allBoardContent[index].asigned.find((name) => name === sortedContacts[i]["name"])
    ) {
      checkedContact = "checked";
    }

    contactListEdit += `
                <div class='contactEdit flex' onclick='editTaskContact(event)'>
                    <div class='flex'>
                        <span class='circleEdit flex' style='background:${sortedContacts[i]["color"]}'>
                          ${initials}
                        </span>
                        <span>
                          ${sortedContacts[i].name}
                        </span>
                    </div>
                    <input type="checkbox" ${checkedContact} value="${sortedContacts[i].name}">
                </div>
        `;
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

  // Toggle die hidden Klasse
  contactList.classList.toggle("hidden");

  if (!contactList.classList.contains("hidden")) {
    // Listener hinzufügen, wenn das Dropdown geöffnet wird
    document.addEventListener("click", closeDropdownOnClickOutside);
  } else {
    // Listener entfernen, wenn das Dropdown geschlossen wird
    document.removeEventListener("click", closeDropdownOnClickOutside);
  }

  // Stoppt den Click-Event, damit es nicht sofort wieder geschlossen wird
  // event.stopPropagation();
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

// function renderSubtasks(index) {
//   let returnList = "";

//   if (allBoardContent[index].subtasks){
//     for (let i = 0; i < allBoardContent[index].subtasks.length; i++) {
//       returnList += generateSubtasks(i, index);
//     }
//   }
//   return returnList;
// }

// async function toggleSubtaskCompletion(taskIndex, subtaskIndex, isCompleted) {
//   try {
//     updateLocalSubtaskCompletion(taskIndex, subtaskIndex, isCompleted);
//     await updateSubtaskInFirebase(taskIndex, subtaskIndex);
//     await updateBoard();
//   } catch (error) {
//     console.error("Fehler beim Aktualisieren des Subtasks:", error);
//   }
// }

// function updateLocalSubtaskCompletion(taskIndex, subtaskIndex, isCompleted) {
//   allBoardContent[taskIndex].subtasks[subtaskIndex].completed = isCompleted;
// }

// function getSubtaskDisplay(subtasks) {
//   if (!subtasks || subtasks.length === 0) {
//     return "";
//   }

//   let subtaskCount = subtasks.length;
//   let completedSubtasks = 0;

//   for (let i = 0; i < subtaskCount; i++) {
//     if (subtasks[i].completed) {
//       completedSubtasks++;
//     }
//   }

//   let progressPercentage = (completedSubtasks / subtaskCount) * 100;

//   return `
//     <div class="progress-bar-container">
//       <div class="progress-bar" style="width: ${progressPercentage}%;"></div>
//     </div>
//     <div>${completedSubtasks}/${subtaskCount} Subtasks</div>
//   `;
// }


