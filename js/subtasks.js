function addSubtaskEdit(index) {
  if (!allBoardContent[index].subtasks) {
    allBoardContent[index].subtasks = [];
  }
  if (addSubtaskEdit.value != "") {
    allBoardContent[index].subtasks.push({
      description: addSubtaskEdit.value,
      completed: false,
    });
    renderSubtaskListEdit(index);
    addSubtaskEdit.value = "";
  }
}

function renderSubtaskListEdit(index) {
  let subtasksListEdit = document.getElementById("subTasksListEdit");
  subtasksListEdit.innerHTML = renderSubtasks(index);
}

function editSubtaskEdit(taskIndex, subtaskIndex) {
  const subtaskItem = document.querySelector(`.subtask[data-index='${subtaskIndex}']`);
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

function saveSubtaskEdit(taskIndex, subtaskIndex) {
  const subtaskItem = document.querySelector(`.subtask[data-index='${subtaskIndex}']`);
  const subtaskText = subtaskItem.querySelector(".subtask-text");
  const subtaskInput = subtaskItem.querySelector(".subtask-edit-input");
  const editIcon = subtaskItem.querySelector(".edit-icon");
  const saveIcon = subtaskItem.querySelector(".save-icon");

  allBoardContent[taskIndex].subtasks[subtaskIndex].description = subtaskInput.value;

  subtaskText.textContent = subtaskInput.value;
  subtaskText.style.display = "block";
  subtaskInput.style.display = "none";
  subtaskItem.classList.remove("editing");

  editIcon.style.display = "block";
  saveIcon.style.display = "none";
}

function deleteSubtaskEdit(taskIndex, subtaskIndex) {
  allBoardContent[taskIndex].subtasks.splice(subtaskIndex, 1);
  renderSubtaskListEdit(taskIndex);
}

function renderSubtasks(index) {
  let returnList = "";

  if (allBoardContent[index].subtasks) {
    for (let i = 0; i < allBoardContent[index].subtasks.length; i++) {
      returnList += generateSubtasks(i, index);
    }
  }
  return returnList;
}

async function toggleSubtaskCompletion(taskIndex, subtaskIndex, isCompleted) {
  try {
    allBoardContent[taskIndex].subtasks[subtaskIndex].completed = isCompleted;
    await updateSubtaskInFirebase(taskIndex, subtaskIndex);
    await updateBoard();
  } catch (error) {
    console.error("Fehler beim Aktualisieren des Subtasks:", error);
  }
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

function renderSubtaskList() {
  let subtasksList = document.getElementById("subTasksList");

  subtasksList.innerHTML = "";

  for (let i = 0; i < subtasks.length; i++) {
    subtasksList.innerHTML += generateSubtaskList(i);
  }
}

function editSubtask(index) {
  const subtaskItem = getSubtaskItem(index);
  toggleEditingState(subtaskItem, true);
  focusOnInput(subtaskItem);
}

function saveSubtask(index) {
  const subtaskItem = document.querySelector(`.subtask[data-index='${index}']`);
  const subtaskInput = subtaskItem.querySelector(".subtask-edit-input");

  subtasks[index].description = subtaskInput.value; 
  displayUpdatedText(subtaskItem, subtaskInput.value);
  toggleEditingState(subtaskItem, false);
}

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

function focusOnInput(subtaskItem) {
  const subtaskInput = subtaskItem.querySelector(".subtask-edit-input");
  subtaskInput.focus();
  const length = subtaskInput.value.length;
  subtaskInput.setSelectionRange(length, length);
}

function displayUpdatedText(subtaskItem, newText) {
  const subtaskText = subtaskItem.querySelector(".subtask-text");
  subtaskText.textContent = newText;
  subtaskText.style.display = "block";
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