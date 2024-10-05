function moveTask(index, newStatus) {
  const card = document.getElementById(`board-${index}`);
  let currentTask = allBoardContent[index];

  currentTask.status = newStatus;

  const dropArea = document.querySelector(
    `.drag-area[data-status="${newStatus}"]`
  );

  if (dropArea) {
    dropArea.appendChild(card);
    updateTask(currentTask.Uid, currentTask);
  }
}

function stopPropagationHandler(event) {
  event.stopPropagation();
}

function calculateSubmenuPosition(
  index,
  additionalOffsetTop = 25,
  additionalOffsetLeft = 30
) {
  const boardCard = document.getElementById(`board-${index}`);
  const submenu = document.getElementById(`submenu-${index}`);
  const rect = boardCard.getBoundingClientRect();
  const top = rect.bottom + window.scrollY + additionalOffsetTop;
  const left = rect.left + additionalOffsetLeft;

  submenu.style.top = `${top}px`;
  submenu.style.left = `${left}px`;
}

function toggleVisibility(submenu) {
  const isVisible = !submenu.classList.contains("hidden");

  if (!isVisible) {
    submenu.classList.remove("hidden");
  } else {
    submenu.classList.add("hidden");
  }
}

function toggleSubmenu(event, index) {
  stopPropagationHandler(event);

  const submenu = document.getElementById(`submenu-${index}`);

  calculateSubmenuPosition(index);
  toggleVisibility(submenu);
}

document.addEventListener("click", () => {
  document.querySelectorAll(".submenu").forEach((sub) => {
    sub.classList.add("hidden");
  });
});
