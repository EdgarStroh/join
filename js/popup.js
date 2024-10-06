/**
 * Opens the "Add Task" popup and resets the form for adding a new task.
 *
 * @param {string} [status="toDo"] - The status to initialize the task with (default is "toDo").
 */
function openPopupAddTask(status = "toDo") {
  const popupOverlay = document.getElementById("popupOverlay");
  const popupModal = document.getElementById("popupModal");

  resetAddTask(status);
  document.body.classList.add("no-scroll");
  popupOverlay.style.display = "flex";
  popupModal.style.display = "block";

  popupModal.classList.remove("hide");
  popupModal.classList.add("show");
}

/**
 * Opens the popup displaying the task details for the specified task.
 *
 * @param {number} index - The index of the task in the board content array.
 */
function openPopupCard(index) {
  const popupOverlay = document.getElementById("popupOverlayCard");
  const popupModal = document.getElementById("popupModalCard");

  popupModal.innerHTML = htmlTemplatePopUpBoardCard(index);

  popupOverlay.style.display = "flex";
  popupModal.style.display = "block";
  document.body.classList.add("no-scroll");
  popupModal.classList.remove("hide");
  popupModal.classList.add("show");
}

/**
 * Opens the popup for editing a task, initializing it with the current task details.
 *
 * @param {number} index - The index of the task in the board content array.
 */
function openPopupCardEdit(index) {
  const popupModal = document.getElementById("popupModalCardEdit");
  popupModal.innerHTML = htmlTemplatePopUpBoardCardEdit(index);

  setPriority(allBoardContent[index].prio, index, "prioEdit");

  popupModal.style.display = "block";
  popupModal.classList.remove("hide");
  popupModal.classList.add("show");
}

/**
 * Opens the mobile-specific popup.
 */
function openPopupMobile() {
  const popupOverlay = document.getElementById("popupOverlayMobile");
  const popupModal = document.getElementById("popupModalMobile");

  popupOverlay.style.display = "flex";
  popupModal.style.display = "block";

  popupModal.classList.remove("hide");
  popupModal.classList.add("show");
}

/**
 * Closes the "Add Task" popup.
 */
function closePopupAddTask() {
  const popupOverlay = document.getElementById("popupOverlay");
  const popupModal = document.getElementById("popupModal");
  popupOverlay.style.display = "none";
  popupModal.classList.remove("show");
  popupModal.classList.add("hide");
  document.body.classList.remove("no-scroll");

  setTimeout(() => {
    popupModal.style.display = "none";
  }, 120);
}

/**
 * Closes the popup displaying the task details.
 */
function closePopupCard() {
  const popupOverlay = document.getElementById("popupOverlayCard");
  const popupModal = document.getElementById("popupModalCard");

  popupModal.classList.remove("show");
  popupModal.classList.add("hide");
  document.body.classList.remove("no-scroll");
  setTimeout(() => {
    popupModal.style.display = "none";
    popupOverlay.style.display = "none";
  }, 120);
  closePopupCardEdit();
}

/**
 * Closes the popup for editing a task.
 */
function closePopupCardEdit() {
  const popupOverlay = document.getElementById("popupOverlayCardEdit");
  const popupModal = document.getElementById("popupModalCardEdit");

  popupModal.classList.remove("show");
  popupModal.classList.add("hide");

  popupModal.style.display = "none";
}

/**
 * Closes the mobile-specific popup.
 */
function closePopupMobile() {
  document.getElementById("popupOverlayMobile").style.display = "none";
  document.getElementById("popupModalMobile").style.display = "none";
}

/**
 * Displays a success popup after adding a contact.
 */
function showPopupContact() {
  const overlay = document.getElementById("popupOverlay");
  const success = document.getElementById("popupContactSuccess");

  overlay.style.display = "flex";
  success.style.display = "flex";
  success.style.opacity = "0";

  setTimeout(() => {
    success.style.opacity = "1";
  }, 1);

  setTimeout(function () {
    closePopupContactSuccess();
  }, 1250);
}

/**
 * Closes the contact success popup.
 */
function closePopupContactSuccess() {
  document.getElementById("popupOverlay").style.display = "none";
  document.getElementById("popupContactSuccess").style.display = "none";
  loadDataUsers("");
}

/**
 * Displays a success popup after user registration.
 */
function showPopupRegister() {
  const overlay = document.getElementById("popupOverlay");
  const success = document.getElementById("popupSuccess");

  overlay.style.display = "flex";
  success.style.display = "flex";
  success.style.opacity = "0";

  setTimeout(() => {
    success.style.opacity = "1";
  }, 1);

  setTimeout(closePopupSuccess, 1250);
}

/**
 * Closes the registration success popup.
 */
function closePopupSuccess() {
  document.getElementById("popupOverlay").style.display = "none";
  document.getElementById("popupSuccess").style.display = "none";
  loadDataUsers("");
}

/**
 * Generates the HTML template for a board card in the popup.
 *
 * @param {number} index - The index of the task in the board content array.
 * @returns {string} - The generated HTML for the popup board card.
 */
function htmlTemplatePopUpBoardCard(index) {
  const categoryColor = getCategoryColor(allBoardContent[index].category);
  const assignedHTML = generateAssignedHTML(allBoardContent[index].asigned);
  const statusImage = getPriorityImage(allBoardContent[index].prio);
  const subtasksHTML = generateSubtasksHTML(
    allBoardContent[index].subtasks,
    index
  );

  return generatePopupBoardCard(
    categoryColor,
    index,
    statusImage,
    assignedHTML,
    subtasksHTML
  );
}

/**
 * Generates the HTML template for editing a board card in the popup.
 *
 * @param {number} index - The index of the task in the board content array.
 * @returns {string} - The generated HTML for the editable popup board card.
 */
function htmlTemplatePopUpBoardCardEdit(index) {
  const assignedHTML = generateAssignedHTML(allBoardContent[index].asigned);

  return generatePopupBoardCardEdit(index, assignedHTML);
}

/**
 * Displays a success popup after adding a task.
 */
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

/**
 * Closes the task success popup.
 */
function closePopupContactSuccessAddedTask() {
  document.getElementById("popupOverlay1").style.display = "none";
  document.getElementById("popupContactSuccessAddedTaskButton").style.display =
    "none";
}
