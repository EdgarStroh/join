let subtask = document.getElementById("subtask");
let subtasks = []; 
let contactSelection = document.getElementById("contactSelection");
let newPriority = 'medium';

// Kontakte rendern
async function renderContactList() {
  await loadDataContacts();

  allContacts.sort((a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
    return 0;
  });

  let contactList = document.getElementById("contactList");

  contactList.innerHTML = ""; 
  for (let index = 0; index < allContacts.length; index++) {
    contactList.innerHTML += generateContactList(index);
  }
}

function toggleContactListView() {
  let contactList = document.getElementById("contactList");
  contactList.classList.toggle("hidden");

  if (!contactList.classList.contains("hidden")) {
    document.addEventListener("click", closeDropdownOnClickOutside); 
  } else {
    document.removeEventListener("click", closeDropdownOnClickOutside); 
  }
}

// Dropdown schließen, wenn außerhalb geklickt wird
function closeDropdownOnClickOutside(event) {
  const dropdown = document.getElementById("contactList");
  const contactSelection = document.getElementById("contactSelection");

  if (
    dropdown &&
    !dropdown.contains(event.target) &&
    !contactSelection.contains(event.target)
  ) {
    dropdown.classList.add("hidden");
    document.removeEventListener("click", closeDropdownOnClickOutside); 
  }
}

// Ermöglicht das Klicken auf das gesamte Kontakt-Element
function addTaskContact(event) {
  if (event.target.type !== "checkbox") {
    let checkbox = event.currentTarget.querySelector('input[type="checkbox"]');
    checkbox.checked = !checkbox.checked;
    event.currentTarget.classList.toggle("selectedContact");
  }
}

function renderSubtaskList() {
  let subtasksList = document.getElementById("subTasksList");

  subtasksList.innerHTML = "";

  for (let i = 0; i < subtasks.length; i++) {
    subtasksList.innerHTML += generateSubtaskList(i);
  }
}

function editSubtask(index) {
  const subtaskItem = document.querySelector(`.subtask[data-index='${index}']`);
  const subtaskText = subtaskItem.querySelector(".subtask-text");
  const subtaskInput = subtaskItem.querySelector(".subtask-edit-input");
  const editIcon = subtaskItem.querySelector(".edit-icon");
  const saveIcon = subtaskItem.querySelector(".save-icon");

  subtaskItem.classList.add("editing");
  subtaskText.style.display = "none";
  subtaskInput.style.display = "block";
  subtaskInput.focus();

  const length = subtaskInput.value.length;
  subtaskInput.setSelectionRange(length, length);

  editIcon.style.display = "none";
  saveIcon.style.display = "block";
}

function saveSubtask(index) {
  const subtaskItem = document.querySelector(`.subtask[data-index='${index}']`);
  const subtaskText = subtaskItem.querySelector(".subtask-text");
  const subtaskInput = subtaskItem.querySelector(".subtask-edit-input");
  const editIcon = subtaskItem.querySelector(".edit-icon");
  const saveIcon = subtaskItem.querySelector(".save-icon");

  subtasks[index].description = subtaskInput.value;
  subtaskText.textContent = subtaskInput.value;
  subtaskText.style.display = "block";
  subtaskInput.style.display = "none";

  subtaskItem.classList.remove("editing");
  editIcon.style.display = "block";
  saveIcon.style.display = "none";
}

function clearSubtasks() {
  subtasks = [];
  renderSubtaskList();
}

function deleteSubtask(index) {
  subtasks.splice(index, 1);
  renderSubtaskList();
}

// Event listener für Enter-Taste im Subtask-Feld
subtask.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addSubtask();
  }
});

function addSubtask() {
  if (subtask.value != "") {
    subtasks.push({
      description: subtask.value,
      completed: false,
    });
    renderSubtaskList();
    subtask.value = "";
  }
}

// Ereignislistener für das Hinzufügen des Tasks
addTaskForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  let title = document.getElementById("title");
  let date = document.getElementById("date");
  let description = document.getElementById("description");
  let category = document.getElementById("category");
  let selectedContacts = document.querySelectorAll(
    '#contactList .contact input[type="checkbox"]:checked'
  );

  let contactNames = [];
  if (selectedContacts.length) {
    for (let i = 0; i < selectedContacts.length; i++) {
      let name = selectedContacts[i].value;
      contactNames.push(name);
    }
  }

  let data = {
    asigned: contactNames,
    category: category.value,
    date: date.value,
    description: description.value,
    prio: newPriority,
    status: "toDo",
    subtasks: subtasks,
    title: title.value,
  };

  try {
    await postDataBoards("", data);
    window.location.href = "board.html";
  } catch (error) {
    console.log("Error posting data to Firebase:", error);
  }
});


// PRIORITY
function setPriority(priority, index, id){
  let priorityContainer = document.getElementById(id);
  if (priority === 'urgent'){
    priorityContainer.innerHTML = generateButtonUrgentEdit(index, id);
    if (index >= 0) {
      allBoardContent[index].prio = 'urgent';
    } else {
      newPriority = 'urgent';
    }
  } else if (priority === 'low') {
    priorityContainer.innerHTML = generateButtonLowEdit(index, id);
    if (index >= 0) {
      allBoardContent[index].prio = "low";
    } else {
      newPriority = "low";
    }
  } else {
    priorityContainer.innerHTML = generateButtonMediumEdit(index, id);
    if (index >= 0) {
      allBoardContent[index].prio = "medium";
    } else {
      newPriority = "medium";
    }
  }
}

// Prio-Buttons
// let priority = "";

// let prioButtons = document.querySelectorAll("#prio button");

// for (let i = 0; i < prioButtons.length; i++) {
//   prioButtons[i].addEventListener("click", (event) => {
//     const selectedButton = event.currentTarget;
//     priority = event.currentTarget.value;
//     const activePrioClass = selectedButton.getAttribute("id") + "Active";
//     const activeButtonBool = selectedButton.classList.contains(activePrioClass);

//     if (!activeButtonBool) {
//       prioButtons.forEach((button) => {
//         const buttonActiveClass = button.getAttribute("id") + "Active";
//         if (button.classList.contains(buttonActiveClass)) {
//           button.classList.remove(buttonActiveClass);
//           document.getElementById(button.getAttribute("id") + "Img").src =
//             "../assets/icons/" + button.getAttribute("id") + ".svg";
//         }
//       });

//       selectedButton.classList.add(activePrioClass);
//       document.getElementById(selectedButton.getAttribute("id") + "Img").src =
//         "../assets/icons/" + selectedButton.getAttribute("id") + "Selected.svg";
//     } else {
//       selectedButton.classList.remove(activePrioClass);
//       document.getElementById(selectedButton.getAttribute("id") + "Img").src =
//         "../assets/icons/" + selectedButton.getAttribute("id") + ".svg";
//     }
//   });
// }
