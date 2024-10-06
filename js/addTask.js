let subtask = document.getElementById("subtask");
let subtasks = [];
let contactSelection = document.getElementById("contactSelection");
let newPriority = "medium";
let newStatus = "toDo";

/**
 * Resets the form fields and prepares the task for adding with the specified status.
 *
 * @param {string} [status='toDo'] - The status to set for the new task (default is 'toDo').
 */
function resetAddTask(status = "toDo") {
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

/**
 * Renders the contact list by loading data and sorting contacts by name.
 *
 * @returns {Promise<void>} - A promise that resolves when the contact list has been rendered.
 */
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

/**
 * Toggles the visibility of the contact list for adding a task.
 *
 * @param {Event} event - The event triggered by the user's action.
 */
function toggleContactListViewAddTask(event) {
  let contactList = document.getElementById("contactList");
  contactList.classList.toggle("hidden");

  if (!contactList.classList.contains("hidden")) {
    document.addEventListener("click", closeDropdownOnClickOutside);
  } else {
    document.removeEventListener("click", closeDropdownOnClickOutside);
  }
}

/**
 * Toggles the selection of a contact checkbox when the contact is clicked.
 *
 * @param {Event} event - The event triggered by the user's action.
 */
function toggleContactCheckbox(event) {
  if (event.target.type !== "checkbox") {
    let checkbox = event.currentTarget.querySelector('input[type="checkbox"]');
    checkbox.checked = !checkbox.checked;
    event.currentTarget.classList.toggle("selectedContact");
  }
}

/**
 * Closes the contact dropdown when clicking outside of it.
 *
 * @param {Event} event - The event triggered by the user's action.
 */
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

// Event listener for adding a new task
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
  }, 1250);
});

/**
 * Collects the form data for the new task.
 *
 * @returns {Object} - An object containing the form data.
 */
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

/**
 * Retrieves the selected contacts from the contact list.
 *
 * @returns {string[]} - An array of selected contact names.
 */
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

/**
 * Displays a success popup when a task is successfully added.
 */
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

/**
 * Closes the success popup for adding a task.
 */
function closePopupContactSuccessAddedTask() {
  document.getElementById("popupOverlay").style.display = "none";
  document.getElementById("popupContactSuccess").style.display = "none";
}

/**
 * Sets the priority for the new task.
 *
 * @param {string} priority - The priority level to set (e.g., 'low', 'medium', 'urgent').
 * @param {number} index - The index of the task in the list, if applicable.
 * @param {string} id - The ID of the HTML element to update.
 */
function setPriority(priority, index, id) {
  let priorityContainer = document.getElementById(id);
  updatePriorityContainer(priority, priorityContainer, index, id);
  updatePriorityValue(priority, index);
}

/**
 * Updates the priority container's display based on the priority level.
 *
 * @param {string} priority - The priority level to set.
 * @param {HTMLElement} container - The container element to update.
 * @param {number} index - The index of the task in the list, if applicable.
 * @param {string} id - The ID of the HTML element.
 */
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

/**
 * Updates the priority value for the task.
 *
 * @param {string} priority - The priority level to set.
 * @param {number} index - The index of the task in the list.
 */
function updatePriorityValue(priority, index) {
  if (index >= 0) {
    allBoardContent[index].prio = priority;
  } else {
    newPriority = priority;
  }
}
