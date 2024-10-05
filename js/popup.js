function openPopupAddTask(status = "toDo") {
  const popupOverlay = document.getElementById("popupOverlay");
  const popupModal = document.getElementById("popupModal");

  resetAddTask(status);
  document.body.classList.add('no-scroll');
  popupOverlay.style.display = "flex";
  popupModal.style.display = "block";

  popupModal.classList.remove("hide");
  popupModal.classList.add("show");
}

function openPopupCard(index) {
  const popupOverlay = document.getElementById("popupOverlayCard");
  const popupModal = document.getElementById("popupModalCard");

  popupModal.innerHTML = htmlTemplatePopUpBoardCard(index);

  popupOverlay.style.display = "flex";
  popupModal.style.display = "block";
  document.body.classList.add('no-scroll');
  popupModal.classList.remove("hide");
  popupModal.classList.add("show");
}

function openPopupCardEdit(index) {
  const popupModal = document.getElementById("popupModalCardEdit");
  popupModal.innerHTML = htmlTemplatePopUpBoardCardEdit(index);

  setPriority(allBoardContent[index].prio, index, "prioEdit");

  popupModal.style.display = "block";

  popupModal.classList.remove("hide");
  popupModal.classList.add("show");
}

function openPopupMobile() {
  const popupOverlay = document.getElementById("popupOverlayMobile");
  const popupModal = document.getElementById("popupModalMobile");

  popupOverlay.style.display = "flex";
  popupModal.style.display = "block";

  popupModal.classList.remove("hide");
  popupModal.classList.add("show");
}

function closePopupAddTask() {
  const popupOverlay = document.getElementById("popupOverlay");
  const popupModal = document.getElementById("popupModal");
  popupOverlay.style.display = "none";
  popupModal.classList.remove("show");
  popupModal.classList.add("hide");
  document.body.classList.remove('no-scroll');

  setTimeout(() => {
    popupModal.style.display = "none";
  }, 120);
}

function closePopupCard() {
  const popupOverlay = document.getElementById("popupOverlayCard");
  const popupModal = document.getElementById("popupModalCard");

  popupModal.classList.remove("show");
  popupModal.classList.add("hide");
  document.body.classList.remove('no-scroll');
  setTimeout(() => {
    popupModal.style.display = "none";
    popupOverlay.style.display = "none";
  }, 120);
  closePopupCardEdit();
}

function closePopupCardEdit() {
  const popupOverlay = document.getElementById("popupOverlayCardEdit");
  const popupModal = document.getElementById("popupModalCardEdit");

  popupModal.classList.remove("show");
  popupModal.classList.add("hide");

  popupModal.style.display = "none";
  // Ist nur ein Test weil sich der gesamte inhalt des content leicht verschiebt
  // popupOverlay.style.display = "none";
}

function closePopupMobile() {
  document.getElementById("popupOverlayMobile").style.display = "none";
  document.getElementById("popupModalMobile").style.display = "none";
}

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


function closePopupContactSuccess() {
  document.getElementById("popupOverlay").style.display = "none";
  document.getElementById("popupContactSuccess").style.display = "none";
  loadDataUsers("");
}

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

function closePopupSuccess() {
  document.getElementById("popupOverlay").style.display = "none";
  document.getElementById("popupSuccess").style.display = "none";
  loadDataUsers("");
}

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

function htmlTemplatePopUpBoardCardEdit(index) {
  const assignedHTML = generateAssignedHTML(allBoardContent[index].asigned);

  return generatePopupBoardCardEdit(index, assignedHTML);
}

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
  document.getElementById("popupContactSuccessAddedTaskButton").style.display =
    "none";
}