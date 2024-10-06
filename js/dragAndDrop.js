let draggedFrom = null;

/**
 * Allows the dragged item to be dropped by preventing the default behavior.
 * Highlights the drop area by creating a visual drop target.
 *
 * @param {Event} event - The drag event.
 */
function allowDrop(event) {
  event.preventDefault();

  const dropArea = event.target.closest(".drag-area");

  if (dropArea !== draggedFrom) {
    let dropTarget = dropArea.querySelector(".drop-target");
    if (!dropTarget) {
      dropTarget = document.createElement("div");
      dropTarget.classList.add("drop-target");
      dropArea.appendChild(dropTarget);
    }
    dropTarget.style.display = "block";
  }
}

/**
 * Handles the drag event when an element is dragged.
 * Marks the element as being dragged and shows potential drop targets in other areas.
 *
 * @param {Event} event - The drag event.
 */
function drag(event) {
  event.target.classList.add("dragging");
  event.dataTransfer.setData("text", event.target.id);
  draggedFrom = event.target.closest(".drag-area");

  const allColumns = document.querySelectorAll(".drag-area");
  allColumns.forEach((column) => {
    if (column !== draggedFrom) {
      let dropTarget = column.querySelector(".drop-target");
      if (!dropTarget) {
        dropTarget = document.createElement("div");
        dropTarget.classList.add("drop-target");
        column.appendChild(dropTarget);
      }
      dropTarget.style.display = "block";
    }
  });
}

/**
 * Handles the drag leave event, hiding the drop target when the dragged item leaves the area.
 *
 * @param {Event} event - The dragleave event.
 */
function dragLeave(event) {
  const dropArea = event.target.closest(".drag-area");
  const dropTarget = dropArea.querySelector(".drop-target");
  if (dropTarget) {
    dropTarget.style.display = "none";
  }
}

/**
 * Handles the end of the drag event by removing all drop targets and resetting the drag state.
 *
 * @param {Event} event - The dragend event.
 */
function dragEnd(event) {
  event.target.classList.remove("dragging");

  const allDropTargets = document.querySelectorAll(".drop-target");
  allDropTargets.forEach((dropTarget) => dropTarget.remove());

  draggedFrom = null;
}

document.addEventListener("dragend", dragEnd);

/**
 * Handles the drop event by moving the dragged element to the drop area,
 * updating its status, and removing any remaining drop targets.
 *
 * @param {Event} event - The drop event.
 * @param {string} status - The new status of the dropped task (e.g., 'done', 'inProgress').
 */
function handleDrop(event, status) {
  event.preventDefault();
  let data = event.dataTransfer.getData("text");
  let draggedElement = document.getElementById(data);

  const dropArea = event.target.closest(".drag-area");

  const allDropTargets = document.querySelectorAll(".drop-target");
  allDropTargets.forEach((dropTarget) => dropTarget.remove());

  dropArea.appendChild(draggedElement);
  draggedElement.classList.remove("dragging");

  let index = parseInt(data.split("-")[1]);
  let currentTask = allBoardContent[index];
  currentTask.status = status;
  updateTask(currentTask.Uid, currentTask);

  draggedFrom = null;
}

/**
 * Handles the drop event for tasks marked as "done".
 *
 * @param {Event} event - The drop event.
 */
function dropDone(event) {
  handleDrop(event, "done");
}

/**
 * Handles the drop event for tasks marked as "awaiting feedback".
 *
 * @param {Event} event - The drop event.
 */
function dropAwait(event) {
  handleDrop(event, "await");
}

/**
 * Handles the drop event for tasks marked as "in progress".
 *
 * @param {Event} event - The drop event.
 */
function dropInProgress(event) {
  handleDrop(event, "inProgress");
}

/**
 * Handles the drop event for tasks marked as "to-do".
 *
 * @param {Event} event - The drop event.
 */
function dropToDo(event) {
  handleDrop(event, "toDo");
}

/**
 * Removes the highlight class from the element when an event occurs.
 *
 * @param {Event} event - The event that triggered the removal of the highlight.
 */
function removeHighlight(event) {
  event.target.classList.remove("highlight");
}
