let draggedFrom = null;

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

function dragLeave(event) {
  const dropArea = event.target.closest(".drag-area");
  const dropTarget = dropArea.querySelector(".drop-target");
  if (dropTarget) {
    dropTarget.style.display = "none";
  }
}

function dragEnd(event) {
  event.target.classList.remove("dragging");

  const allDropTargets = document.querySelectorAll(".drop-target");
  allDropTargets.forEach((dropTarget) => dropTarget.remove());

  draggedFrom = null;
}

document.addEventListener("dragend", dragEnd);

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

function dropDone(event) {
  handleDrop(event, "done");
}

function dropAwait(event) {
  handleDrop(event, "await");
}

function dropInProgress(event) {
  handleDrop(event, "inProgress");
}

function dropToDo(event) {
  handleDrop(event, "toDo");
}

function removeHighlight(event) {
  event.target.classList.remove("highlight");
}
