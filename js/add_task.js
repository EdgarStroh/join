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

  renderContactList(); 
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

function toggleContactListViewAddTask(event) {
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

addTaskFormTask.addEventListener("submit", async (event) => {
  event.preventDefault();

  let data = collectFormData();
  try {
    await postDataBoards("", data);
  
  } catch (error) {
    console.error("Error posting data to Firebase:", error);
  }
  showPopupTask();
  setTimeout(function () {
    window.location.href = "board.html";
  }, 1250)
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
  let selectedContacts = document.querySelectorAll(
    '#contactList .contact input[type="checkbox"]:checked'
  );
  let contactNames = [];

  selectedContacts.forEach((contact) => {
    contactNames.push(contact.value);
  });

  return contactNames;
}

function showPopupTask() {
  const overlay = document.getElementById("popupOverlay");
  const success = document.getElementById("popupContactSuccessAddedTask");

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
  document.getElementById("popupOverlay").style.display = "none";
  document.getElementById("popupContactSuccess").style.display = "none";
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