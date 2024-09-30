let subtask = document.getElementById("subtask");
let subtasks = []; 
let contactSelection = document.getElementById("contactSelection");
let newPriority = 'medium';
let newStatus = 'toDo';

function resetAddTask(status = 'toDo'){
  let contactList = document.getElementById("contactList");

  newStatus = status;
  document.getElementById("title").value = "";
  document.getElementById("date").value = "";
  document.getElementById("description").value = "";
  document.getElementById("category").value = "";

  clearSubtasks();
  setPriority("medium", -1, "prio");
  contactList.classList.add("hidden");
}

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

function toggleContactListViewAddTask() {
  let contactList = document.getElementById("contactList");
  contactList.classList.toggle("hidden");

  if (!contactList.classList.contains("hidden")) {
    document.addEventListener("click", closeDropdownOnClickOutside); 
  } else {
    document.removeEventListener("click", closeDropdownOnClickOutside); 
  }
}

function toggleContactCheckbox(event) {
  if (event.target.type !== "checkbox") {
    let checkbox = event.currentTarget.querySelector('input[type="checkbox"]');
    checkbox.checked = !checkbox.checked;
    event.currentTarget.classList.toggle("selectedContact");
  }
}

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

addTaskForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  let data = collectFormData();
  try {
    await postDataBoards("", data);
    window.location.href = "board.html";
  } catch (error) {
    console.error("Error posting data to Firebase:", error);
  }
});

function collectFormData() {
  return {
    asigned: getSelectedContacts(),
    category: document.getElementById("category").value,
    date: document.getElementById("date").value,
    description: document.getElementById("description").value,
    prio: newPriority,
    status: newStatus,
    subtasks: subtasks,
    title: document.getElementById("title").value,
  };
}

function getSelectedContacts() {
  let selectedContacts = document.querySelectorAll('#contactList .contact input[type="checkbox"]:checked');
  let contactNames = [];

  selectedContacts.forEach((contact) => {
    contactNames.push(contact.value);
  });

  return contactNames;
}

function setPriority(priority, index, id) {
  let priorityContainer = document.getElementById(id);
  updatePriorityContainer(priority, priorityContainer, index, id);
  updatePriorityValue(priority, index);
}

function updatePriorityContainer(priority, container, index, id) {
  switch (priority) {
    case "urgent":
      container.innerHTML = generateButtonUrgentEdit(index, id);
      break;
    case "low":
      container.innerHTML = generateButtonLowEdit(index, id);
      break;
    default:
      container.innerHTML = generateButtonMediumEdit(index, id);
  }
}

function updatePriorityValue(priority, index) {
  if (index >= 0) {
    allBoardContent[index].prio = priority;
  } else {
    newPriority = priority;
  }
}