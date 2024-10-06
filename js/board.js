/**
 * Updates the board by loading contacts, boards, and users,
 * then rendering the board list and checking the login status.
 *
 * @returns {Promise<void>} - A promise that resolves when the board is updated.
 */
async function updateBoard() {
  await loadDataContacts("");
  await loadDataBoards("");
  await loadDataUsers("");

  checkLogin();
  sanitizeAssignedContacts();
  renderBoardList();
}

/**
 * Gets the color associated with a task category.
 *
 * @param {string} category - The category of the task.
 * @returns {string} - The color code associated with the category.
 */
function getCategoryColor(category) {
  return category === "Technical Task" ? "#1FD7C1" : "#0038FF";
}

/**
 * Generates the HTML for assigned contacts.
 *
 * @param {string[]} assignedContacts - An array of assigned contact names.
 * @returns {string} - The generated HTML for the assigned contacts.
 */
function generateContactsHTML(assignedContacts) {
  let contactsHTML = "";
  if (Array.isArray(assignedContacts)) {
    assignedContacts.forEach((contactName) => {
      allContacts.find((contact) => {
        if (contact.name === contactName) {
          contactColors[contactName] = contact.color;
          contactsHTML += `
            <span class="contactCard" style="background-color: ${
              contact.color
            }">
              ${getInitials(contact.name).toUpperCase()}
            </span>`;
        }
      });
    });
  }
  return contactsHTML;
}

/**
 * Returns the HTML image tag for the given task priority.
 *
 * @param {string} priority - The priority level of the task.
 * @returns {string} - The HTML image tag for the priority.
 */
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

/**
 * Generates the HTML template for the board content at the specified index.
 *
 * @param {number} index - The index of the task in the board content array.
 * @returns {string} - The generated HTML for the task's board card.
 */
function htmlTemplateGenerateBoardContent(index) {
  let task = allBoardContent[index];
  let categoryColor = getCategoryColor(task.category);
  let contactsHTML = generateContactsHTML(task.asigned || []);
  let statusImage = getPriorityImage(task.prio);

  return generateBoardCard(index, categoryColor, contactsHTML, statusImage);
}

/**
 * Generates board content for the specified index.
 *
 * @param {number} index - The index of the task in the board content array.
 * @returns {string} - The generated HTML for the task's board card.
 */
function generateBoardContent(index) {
  return htmlTemplateGenerateBoardContent(index);
}

/**
 * Clears the content of the task containers on the board.
 */
function clearContainers() {
  document.getElementById("toDo").innerHTML = "";
  document.getElementById("inProgress").innerHTML = "";
  document.getElementById("awaitFeedback").innerHTML = "";
  document.getElementById("done").innerHTML = "";
}

/**
 * Renders a task to the appropriate container based on its status.
 *
 * @param {Object} task - The task object to render.
 * @param {number} index - The index of the task in the board content array.
 * @returns {boolean} - Returns true if the task's status is unrecognized; otherwise false.
 */
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

/**
 * Displays messages in empty columns of the board.
 *
 * @param {boolean} isToDoEmpty - Indicates if the To-Do column is empty.
 * @param {boolean} isProgressEmpty - Indicates if the In-Progress column is empty.
 * @param {boolean} isAwaitEmpty - Indicates if the Awaiting Feedback column is empty.
 * @param {boolean} isDoneEmpty - Indicates if the Done column is empty.
 */
function displayEmptyColumnMessages(
  isToDoEmpty,
  isProgressEmpty,
  isAwaitEmpty,
  isDoneEmpty
) {
  if (isToDoEmpty) {
    document.getElementById(
      "toDo"
    ).innerHTML = `<div class="emptyColumnMessage">No tasks in To-Do</div>`;
  }
  if (isProgressEmpty) {
    document.getElementById(
      "inProgress"
    ).innerHTML = `<div class="emptyColumnMessage">No tasks in Progress</div>`;
  }
  if (isAwaitEmpty) {
    document.getElementById(
      "awaitFeedback"
    ).innerHTML = `<div class="emptyColumnMessage">No tasks awaiting feedback</div>`;
  }
  if (isDoneEmpty) {
    document.getElementById(
      "done"
    ).innerHTML = `<div class="emptyColumnMessage">No tasks completed</div>`;
  }
}

/**
 * Renders the board list by clearing containers and populating tasks.
 */
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

  displayEmptyColumnMessages(
    isToDoEmpty,
    isProgressEmpty,
    isAwaitEmpty,
    isDoneEmpty
  );
}

/**
 * Generates the HTML for assigned contacts with their initials.
 *
 * @param {string[]} assignedContacts - An array of assigned contact names.
 * @returns {string} - The generated HTML for the assigned contacts.
 */
function generateAssignedHTML(assignedContacts) {
  let assignedHTML = "";

  if (Array.isArray(assignedContacts)) {
    assignedContacts.forEach((person) => {
      const initials = getInitials(person).toUpperCase() || "";
      const color =
        allContacts.find((contact) => contact.name === person).color || "";
      assignedHTML += `
        <div class="contactCard" style="background-color: ${color}; color: white; padding: 4px 8px; border-radius: 50%; margin-right: 8px;">
          ${initials}
        </div>`;
    });
  }
  return assignedHTML;
}

/**
 * Generates the HTML for subtasks in a board.
 *
 * @param {Array} subtasks - An array of subtasks.
 * @param {number} boardIndex - The index of the main task in the board content.
 * @returns {string} - The generated HTML for the subtasks.
 */
function generateSubtasksHTML(subtasks, boardIndex) {
  let subtasksHTML = "";
  if (Array.isArray(subtasks)) {
    subtasks.forEach((subtask, subtaskIndex) => {
      subtasksHTML += generateSubtaskPopupContent(
        subtask,
        boardIndex,
        subtaskIndex
      );
    });
  }
  return subtasksHTML;
}

/**
 * Shows the actions associated with a subtask at the specified index.
 *
 * @param {number} index - The index of the subtask.
 */
function showActions(index) {
  document.getElementById(`subtask-actions-${index}`).style.display = "flex";
}

/**
 * Hides the actions associated with a subtask at the specified index.
 *
 * @param {number} index - The index of the subtask.
 */
function hideActions(index) {
  document.getElementById(`subtask-actions-${index}`).style.display = "none";
}

/**
 * Updates a task in the Firebase database and the local board content.
 *
 * @param {string} uid - The unique identifier of the task.
 * @param {Object} data - The data to update in the task.
 * @returns {Promise<void>} - A promise that resolves when the task is updated.
 */
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

/**
 * Deletes a task from the Firebase database and updates the board.
 *
 * @param {string} uid - The unique identifier of the task to delete.
 * @returns {Promise<void>} - A promise that resolves when the task is deleted.
 */
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

/**
 * Edits a task with new data and updates the board.
 *
 * @param {string} uid - The unique identifier of the task to edit.
 */
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

/**
 * Collects the selected contacts for a task based on checkboxes.
 *
 * @param {number} index - The index of the task in the board content array.
 * @returns {string[]} - An array of selected contact names.
 */
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

/**
 * Sorts the contacts array alphabetically by name.
 *
 * @param {Array} contacts - An array of contact objects to sort.
 * @returns {Array} - A new array of contacts sorted by name.
 */
function getSortedContacts(contacts) {
  return [...contacts].sort((a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
    return 0;
  });
}

/**
 * Checks if a contact is assigned to a task.
 *
 * @param {string} contactName - The name of the contact.
 * @param {string[]} assignedContacts - An array of assigned contact names.
 * @returns {boolean} - Returns true if the contact is assigned; otherwise false.
 */
function isContactAssigned(contactName, assignedContacts) {
  return (
    assignedContacts && assignedContacts.find((name) => name === contactName)
  );
}

/**
 * Creates the HTML for a contact edit element.
 *
 * @param {Object} contact - The contact object.
 * @param {string} initials - The initials of the contact.
 * @param {boolean} isChecked - Indicates if the checkbox should be checked.
 * @returns {string} - The generated HTML for the contact edit.
 */
function createContactEditHTML(contact, initials, isChecked) {
  const checkedContact = isChecked ? "checked" : "";

  return generateContactEdit(contact, initials, checkedContact);
}

/**
 * Renders the contact selection for editing a task.
 *
 * @param {number} index - The index of the task in the board content array.
 * @returns {string} - The generated HTML for the contact selection.
 */
function renderContactSelectionBoard(index) {
  let contactListEdit = "";

  const sortedContacts = getSortedContacts(allContacts);

  for (let i = 0; i < sortedContacts.length; i++) {
    const initials = getInitials(sortedContacts[i].name).toUpperCase();
    const isChecked = isContactAssigned(
      sortedContacts[i].name,
      allBoardContent[index].asigned
    );

    contactListEdit += createContactEditHTML(
      sortedContacts[i],
      initials,
      isChecked
    );
  }

  return contactListEdit;
}

/**
 * Toggles the visibility of the contact list for editing a task.
 *
 * @param {number} index - The index of the task in the board content array.
 */
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

/**
 * Creates a dropdown for contact selection.
 *
 * @param {number} index - The index of the task in the board content array.
 */
function createDropdown(index) {
  const contactList = document.createElement("div");

  contactList.id = "contactListEdit";
  contactList.classList.add("flex");
  contactList.innerHTML = renderContactSelectionBoard(index);

  const container = document.getElementById("contactSelectionEdit");

  container.parentElement.insertBefore(contactList, container.nextSibling);
  document.addEventListener("click", closeDropdownOnClickOutside);
}

/**
 * Toggles the visibility of the contact list for adding a task.
 */
function toggleContactListViewAddTask() {
  let contactList = document.getElementById("contactList");
  contactList.classList.toggle("hidden");

  if (!contactList.classList.contains("hidden")) {
    document.addEventListener("click", closeDropdownOnClickOutside);
  } else {
    document.removeEventListener("click", closeDropdownOnClickOutside);
  }
}

// Event listener for adding a new task
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
  document.body.classList.remove("no-scroll");
});

/**
 * Edits a contact in the task based on user interaction.
 *
 * @param {Event} event - The event triggered by the user's action.
 */
function editTaskContact(event) {
  if (event.target.type !== "checkbox") {
    let checkbox = event.currentTarget.querySelector('input[type="checkbox"]');
    checkbox.checked = !checkbox.checked;
    event.currentTarget.classList.toggle("selectedContact");
  }
}
