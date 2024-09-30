function openPopupAddTask(status = "toDo") {
  const popupOverlay = document.getElementById("popupOverlay");
  const popupModal = document.getElementById("popupModal");

  resetAddTask(status);

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


function closePopup() {
  const popupOverlay = document.getElementById("popupOverlay");
  const popupModal = document.getElementById("popupModal");
  popupOverlay.style.display = "none";
  popupModal.classList.remove("show");
  popupModal.classList.add("hide");

  setTimeout(() => {
    popupModal.style.display = "none";
  }, 120);
}

function closePopupCard() {
  const popupOverlay = document.getElementById("popupOverlayCard");
  const popupModal = document.getElementById("popupModalCard");

  popupModal.classList.remove("show");
  popupModal.classList.add("hide");

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
  popupOverlay.style.display = "none";
}