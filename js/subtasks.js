/**
 * Adds a new subtask to the specified task in edit mode.
 *
 * @param {number} index - The index of the task in the board content array.
 */
function addSubtaskEdit(index) {
  let subtaskEdit = document.getElementById("subtaskEdit");
  if (!allBoardContent[index].subtasks) {
    allBoardContent[index].subtasks = [];
  }
  if (subtaskEdit.value != "") {
    allBoardContent[index].subtasks.push({
      description: subtaskEdit.value,
      completed: false,
    });
    renderSubtaskListEdit(index);
    subtaskEdit.value = "";
  }
}

/**
 * Renders the list of subtasks for editing mode.
 *
 * @param {number} index - The index of the task in the board content array.
 */
function renderSubtaskListEdit(index) {
  let subtasksListEdit = document.getElementById("subTasksListEdit");
  subtasksListEdit.innerHTML = renderSubtasks(index);
}

/**
 * Enables editing of a specific subtask in the edit popup.
 *
 * @param {number} taskIndex - The index of the task.
 * @param {number} subtaskIndex - The index of the subtask within the task.
 */
function editSubtaskEdit(taskIndex, subtaskIndex) {
  const subtaskItem = document.querySelector(
    `.subtask[data-index='${subtaskIndex}']`
  );
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

/**
 * Saves the edited subtask content.
 *
 * @param {number} taskIndex - The index of the task.
 * @param {number} subtaskIndex - The index of the subtask within the task.
 */
function saveSubtaskEdit(taskIndex, subtaskIndex) {
  const subtaskItem = document.querySelector(
    `.subtask[data-index='${subtaskIndex}']`
  );
  const subtaskText = subtaskItem.querySelector(".subtask-text");
  const subtaskInput = subtaskItem.querySelector(".subtask-edit-input");
  const editIcon = subtaskItem.querySelector(".edit-icon");
  const saveIcon = subtaskItem.querySelector(".save-icon");

  allBoardContent[taskIndex].subtasks[subtaskIndex].description =
    subtaskInput.value;

  subtaskText.textContent = subtaskInput.value;
  subtaskText.style.display = "block";
  subtaskInput.style.display = "none";
  subtaskItem.classList.remove("editing");

  editIcon.style.display = "block";
  saveIcon.style.display = "none";
}

/**
 * Deletes a subtask from the specified task in edit mode.
 *
 * @param {number} taskIndex - The index of the task.
 * @param {number} subtaskIndex - The index of the subtask to delete.
 */
function deleteSubtaskEdit(taskIndex, subtaskIndex) {
  allBoardContent[taskIndex].subtasks.splice(subtaskIndex, 1);
  renderSubtaskListEdit(taskIndex);
}

/**
 * Renders the subtasks for a specific task.
 *
 * @param {number} index - The index of the task in the board content array.
 * @returns {string} - The generated HTML for the subtasks.
 */
function renderSubtasks(index) {
  let returnList = "";

  if (allBoardContent[index].subtasks) {
    for (let i = 0; i < allBoardContent[index].subtasks.length; i++) {
      returnList += generateSubtasks(i, index);
    }
  }
  return returnList;
}

/**
 * Toggles the completion status of a subtask and updates the Firebase database.
 *
 * @param {number} taskIndex - The index of the task in the board content array.
 * @param {number} subtaskIndex - The index of the subtask within the task.
 * @param {boolean} isCompleted - Whether the subtask is marked as completed.
 * @returns {Promise<void>} - A promise that resolves when the subtask is updated.
 */
async function toggleSubtaskCompletion(taskIndex, subtaskIndex, isCompleted) {
  try {
    allBoardContent[taskIndex].subtasks[subtaskIndex].completed = isCompleted;
    await updateSubtaskInFirebase(taskIndex, subtaskIndex);
    await updateBoard();
  } catch (error) {
    console.error("Fehler beim Aktualisieren des Subtasks:", error);
  }
}

/**
 * Returns the display content for the subtask progress (completed vs total subtasks).
 *
 * @param {Array} subtasks - The array of subtasks.
 * @returns {string} - The generated HTML for the subtask progress.
 */
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

/**
 * Renders the list of all subtasks.
 */
function renderSubtaskList() {
  let subtasksList = document.getElementById("subTasksList");

  subtasksList.innerHTML = "";

  for (let i = 0; i < subtasks.length; i++) {
    subtasksList.innerHTML += generateSubtaskList(i);
  }
}

/**
 * Enables editing of a subtask.
 *
 * @param {number} index - The index of the subtask to edit.
 */
function editSubtask(index) {
  const subtaskItem = document.querySelector(`.subtask[data-index='${index}']`);
  toggleEditingState(subtaskItem, true);
  focusOnInput(subtaskItem);
}

/**
 * Saves the edited subtask content.
 *
 * @param {number} index - The index of the subtask to save.
 */
function saveSubtask(index) {
  const subtaskItem = document.querySelector(`.subtask[data-index='${index}']`);
  const subtaskInput = subtaskItem.querySelector(".subtask-edit-input");

  subtasks[index].description = subtaskInput.value;
  displayUpdatedText(subtaskItem, subtaskInput.value);
  toggleEditingState(subtaskItem, false);
}

/**
 * Toggles the editing state of a subtask (editing mode on/off).
 *
 * @param {HTMLElement} subtaskItem - The subtask item element.
 * @param {boolean} isEditing - Whether the subtask is in editing mode.
 */
function toggleEditingState(subtaskItem, isEditing) {
  const elements = {
    subtaskText: subtaskItem.querySelector(".subtask-text"),
    subtaskInput: subtaskItem.querySelector(".subtask-edit-input"),
    editIcon: subtaskItem.querySelector(".edit-icon"),
    saveIcon: subtaskItem.querySelector(".save-icon"),
  };

  subtaskItem.classList.toggle("editing", isEditing);
  elements.subtaskText.style.display = isEditing ? "none" : "block";
  elements.subtaskInput.style.display = isEditing ? "block" : "none";
  elements.editIcon.style.display = isEditing ? "none" : "block";
  elements.saveIcon.style.display = isEditing ? "block" : "none";
}

/**
 * Focuses on the input field for editing a subtask.
 *
 * @param {HTMLElement} subtaskItem - The subtask item element.
 */
function focusOnInput(subtaskItem) {
  const subtaskInput = subtaskItem.querySelector(".subtask-edit-input");
  subtaskInput.focus();
  const length = subtaskInput.value.length;
  subtaskInput.setSelectionRange(length, length);
}

/**
 * Updates the displayed text of a subtask after editing.
 *
 * @param {HTMLElement} subtaskItem - The subtask item element.
 * @param {string} newText - The updated subtask text.
 */
function displayUpdatedText(subtaskItem, newText) {
  const subtaskText = subtaskItem.querySelector(".subtask-text");
  subtaskText.textContent = newText;
  subtaskText.style.display = "block";
}

/**
 * Clears all subtasks and re-renders the subtask list.
 */
function clearSubtasks() {
  subtasks = [];
  renderSubtaskList();
}

/**
 * Deletes a specific subtask.
 *
 * @param {number} index - The index of the subtask to delete.
 */
function deleteSubtask(index) {
  subtasks.splice(index, 1);
  renderSubtaskList();
}

/**
 * Adds a new subtask from the input field.
 */
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

// Adds event listener to the subtask input to handle adding a subtask on pressing "Enter"
subtask.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addSubtask();
  }
});
