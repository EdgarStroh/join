/**
 * Moves a task to a new status and updates the DOM and task data.
 *
 * @param {number} index - The index of the task in the board content array.
 * @param {string} newStatus - The new status to move the task to (e.g., 'done', 'inProgress').
 */
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

/**
 * Stops the propagation of an event.
 *
 * @param {Event} event - The event to stop from propagating.
 */
function stopPropagationHandler(event) {
  event.stopPropagation();
}

/**
 * Calculates the position for a submenu and updates its top and left CSS properties.
 *
 * @param {number} index - The index of the task whose submenu is being positioned.
 * @param {number} [additionalOffsetTop=25] - Additional offset for the top position (default is 25px).
 * @param {number} [additionalOffsetLeft=30] - Additional offset for the left position (default is 30px).
 */
function calculateSubmenuPosition(
  index,
  additionalOffsetTop = 25,
  additionalOffsetLeft = 22
) {
  const boardCard = document.getElementById(`board-${index}`);
  const submenu = document.getElementById(`submenu-${index}`);
  const rect = boardCard.getBoundingClientRect();
  const top = rect.bottom + window.scrollY + additionalOffsetTop;
  const left = rect.left + additionalOffsetLeft;

  submenu.style.top = `${top}px`;
  submenu.style.left = `${left}px`;
}

/**
 * Toggles the visibility of a submenu by adding or removing the "hidden" class.
 *
 * @param {HTMLElement} submenu - The submenu element to toggle.
 */
function toggleVisibility(submenu) {
  const isVisible = !submenu.classList.contains("hidden");

  if (!isVisible) {
    submenu.classList.remove("hidden");
  } else {
    submenu.classList.add("hidden");
  }
}

/**
 * Toggles the submenu for a task by calculating its position and toggling its visibility.
 *
 * @param {Event} event - The event triggered by the user's action.
 * @param {number} index - The index of the task whose submenu is being toggled.
 */
function toggleSubmenu(event, index) {
  stopPropagationHandler(event);

  const submenu = document.getElementById(`submenu-${index}`);

  calculateSubmenuPosition(index);
  toggleVisibility(submenu);
}

// Close all submenus when clicking outside of them
document.addEventListener("click", () => {
  document.querySelectorAll(".submenu").forEach((sub) => {
    sub.classList.add("hidden");
  });
});
