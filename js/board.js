async function updateBoard() {
  await loadDataContacts("");
  await loadDataBoards("");
  await loadDataUsers("");
  renderBoardList();
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

// function dropDone(ev) {
//   ev.preventDefault();
//   let data = ev.dataTransfer.getData("text");
//   ev.target.appendChild(document.getElementById(data));
//   let index = parseInt(data.split("-")[1]);
//   let currentTask = allBoardContent[index];
//   currentTask.status = "done";
//   updateTask(currentTask.Uid, currentTask);
// }
// function dropAwait(ev) {
//   ev.preventDefault();
//   let data = ev.dataTransfer.getData("text");
//   ev.target.appendChild(document.getElementById(data));
//   let index = parseInt(data.split("-")[1]);
//   let currentTask = allBoardContent[index];
//   currentTask.status = "await";
//   updateTask(currentTask.Uid, currentTask);
// }
// function dropInProgress(ev) {
//   ev.preventDefault();
//   let data = ev.dataTransfer.getData("text");
//   ev.target.appendChild(document.getElementById(data));
//   let index = parseInt(data.split("-")[1]);
//   let currentTask = allBoardContent[index];
//   currentTask.status = "in progress";
//   updateTask(currentTask.Uid, currentTask);
// }
// function dropToDo(ev) {
//   ev.preventDefault();
//   let data = ev.dataTransfer.getData("text");
//   ev.target.appendChild(document.getElementById(data));
//   let index = parseInt(data.split("-")[1]);
//   let currentTask = allBoardContent[index];
//   currentTask.status = "toDo";
//   updateTask(currentTask.Uid, currentTask);
// }
function handleDrop(ev, status) {
  ev.preventDefault();
  let data = ev.dataTransfer.getData("text");
  let draggedElement = document.getElementById(data);

  // Überprüfen, ob das Ziel bereits das übertragene Element enthält
  if (ev.target.contains(draggedElement)) {
    return;  // Kein weiteres Hinzufügen
  }

  ev.target.appendChild(draggedElement);
  let index = parseInt(data.split("-")[1]);
  let currentTask = allBoardContent[index];
  currentTask.status = status;
  updateTask(currentTask.Uid, currentTask);
}
function dropDone(ev) {
  handleDrop(ev, "done");
}
function dropAwait(ev) {
  handleDrop(ev, "await");
}
function dropInProgress(ev) {
  handleDrop(ev, "in progress");
}
function dropToDo(ev) {
  handleDrop(ev, "toDo");
}


// function highlight(id) {
//   document.getElementById(id).classList.add('drag-area-highlight');
// }

// function removeHighlight(id) {
//   document.getElementById(id).classList.remove('drag-area-highlight');
// }

function renderBoardList() {
  let toDoContainer = document.getElementById("toDo");
  let progressContainer = document.getElementById("inProgress");
  let awaitContainer = document.getElementById("awaitFeedback");
  let doneContainer = document.getElementById("done");
  toDoContainer.innerHTML = "";
  progressContainer.innerHTML = "";
  awaitContainer.innerHTML = "";
  doneContainer.innerHTML = "";

  for (let index = 0; index < allBoardContent.length; index++) {
    if (allBoardContent[index].status == "toDo") {
      toDoContainer.innerHTML += generateBoardContent(index);
    } else if (allBoardContent[index].status == "in progress") {
      progressContainer.innerHTML += generateBoardContent(index);
    } else if (allBoardContent[index].status == "await") {
      awaitContainer.innerHTML += generateBoardContent(index);
    } else {
      doneContainer.innerHTML += generateBoardContent(index);
    }
  }
}

function openPopup() {
  const popupOverlay = document.getElementById('popupOverlay');
  const popupModal = document.getElementById('popupModal');

  // Zeige das Overlay und das Popup an
  popupOverlay.style.display = 'flex';
  popupModal.style.display = 'block';

  // Entferne die `hide`-Klasse (falls vorhanden) und füge die `show`-Klasse hinzu
  popupModal.classList.remove('hide');
  popupModal.classList.add('show');
}
function openPopupCard(index, categoryColor) {
  const popupOverlay = document.getElementById('popupOverlayCard');
  const popupModal = document.getElementById('popupModalCard');

  popupModal.innerHTML = htmlTemplatePopUpBoardCard(index, categoryColor);

  // Zeige das Overlay und das Popup an
  popupOverlay.style.display = 'flex';
  popupModal.style.display = 'block';

  // Entferne die `hide`-Klasse (falls vorhanden) und füge die `show`-Klasse hinzu
  popupModal.classList.remove('hide');
  popupModal.classList.add('show');
}

function htmlTemplatePopUpBoardCard(index, categoryColor) {
  let assignedHTML = '';
  let subtasksHTML = '';

  // Initialen und Namen der zugewiesenen Personen
  if (Array.isArray(allBoardContent[index].asigned)) {
    allBoardContent[index].asigned.forEach(person => {
      const initials = getInitials(person);
      // const color = contactColors[person] || '#cccccc'; // Standardfarbe, falls keine Farbe gefunden wird
      const color = contactColors[person];
      if (color) {
        assignedHTML += `
        <div style="display: flex; align-items: center;">
          <span class="contactCard" style="background-color: ${color}; color: white; padding: 4px 8px; border-radius: 50%; margin-right: 8px;">
            ${initials}
          </span>
          ${person}
        </div><br>`;
      }
    });
  }
  let statusImage = '';
  switch (allBoardContent[index].prio) {
    case 'urgent':
      statusImage = '<img src="../assets/icons/prioUrgent.svg" alt="Urgent Priority">';
      break;
    case 'medium':
      statusImage = '<img src="../assets/icons/prioMedium.svg" alt="Medium Priority">';
      break;
    case 'low':
      statusImage = '<img src="../assets/icons/prioLow.svg" alt="Low Priority">';
      break;
    default:
      statusImage = ''; // No image if no status
  }


  // Subtasks
  if (Array.isArray(allBoardContent[index].subtasks)) {
    allBoardContent[index].subtasks.forEach(subtask => {
      subtasksHTML += `
        <div class="subtaskCardPopUpContent"> 
          <input type ="checkbox">${subtask}
        </div>`;
    });
  }

  return `
    <div class="puCategory">
      <span class="boardCategory bc1" style="background-color: ${categoryColor};">
        ${allBoardContent[index].category}
      </span>
      <div class="closeContainer">
        <img class="close" onclick="closePopupCard()" src="../assets/icons/close.svg">
      </div>  
    </div>
    <div class="puTitle">
      ${allBoardContent[index].title}
    </div>
    <div class="puDescription">
      ${allBoardContent[index].description}
    </div>
    <div class="puDate">
      Due date: ${allBoardContent[index].date} 
    </div>
    <div class="puPrio">
      Priority: ${allBoardContent[index].prio} ${statusImage} 
    </div>

  
     Assigned To:  
    <div class="contactCardPopUpContent">
      ${assignedHTML}
    </div>

      Subtasks
    <div >
      ${subtasksHTML}
    </div>

    <div class="deleteEditPopUp">
  <div class="delete">
    <img src="../assets/icons/delete.svg" alt="Delete">
    <span>Delete</span>
  </div>
  <div class="info">
    <img src="../assets/icons/I.svg" alt="Info">
  </div>
  <div class="edit" onclick="openPopupCardEdit()">
    <img src="../assets/icons/edit.svg" alt="Edit">
    <div><span>Edit</span></div>
  </div>
</div>
  `;
}
function openPopupCardEdit() {
  const popupModal = document.getElementById('popupModalCardEdit');

  popupModal.innerHTML = htmlTemplatePopUpBoardCardEdit();

  // Zeige das Overlay und das Popup an
  popupModal.style.display = 'block';

  // Entferne die `hide`-Klasse (falls vorhanden) und füge die `show`-Klasse hinzu
  popupModal.classList.remove('hide');
  popupModal.classList.add('show');
}
function htmlTemplatePopUpBoardCardEdit() {
  return `
    <div class="closeContainerEdit">
      <img class="close" onclick="closePopupCard()" src="../assets/icons/close.svg">
    </div>

    <label for="title">Title<span class="requiredStar"></span></label>   <br>
        <input type="text" id="title" placeholder="Enter a title" required>
          <br>
        <label for="description">Description</label><br>
        <textarea id="description" rows="5" placeholder="Enter a Description"></textarea>
          <br>

      <label for="dueDate">Due Date<span class="requiredStar"></span></label><br>
      <input type="date" id="date"><br><br>

      <label for="prio"><strong>Priority</strong></label>
        <section id="prio" class="flex">
            <button value="urgent" id="prioUrgent" type="button">Urgent<img id="prioUrgentImg"
                    src="../assets/icons/prioUrgent.svg"></button>
            <button value="medium" id="prioMedium" type="button" class="prioMediumActive">Medium<img
                    id="prioMediumImg" src="../assets/icons/prioMediumSelected.svg"></button>
            <button value="low" id="prioLow" type="button">Low<img id="prioLowImg"
                    src="../assets/icons/prioLow.svg"></button>
        </section>

     <label for="contactSelection">Assigned to</label>
        <div id="contactSelection" onclick="toggleContactListView()" tabindex="0">
            Select contacts to assign
        </div>
        <div id="contactList" class="hidden flex"></div><br><br>

     <label for="Subtasks">Subtasks</label>
      <div id="addSubTask" class="flex">
          <input id="subtask" class="addSubTask" placeholder="Add new Subtask" type="text">
          <!--Benötigt für onclick Event!-->
          <img onclick="addSubtask()" style="cursor:pointer" src="../assets/icons/addSubtask.svg">
      </div>
      <ul id="subTasksList">
      </ul>

     <button class="button margin-left" onclick="closePopupCardEdit()">Ok<img src="../assets/icons/create.svg"></button>
  `
}

function closePopup() {
  const popupOverlay = document.getElementById('popupOverlay');
  const popupModal = document.getElementById('popupModal');

  // Verstecke das Overlay sofort
  popupOverlay.style.display = 'none';

  // Entferne die `show`-Klasse und füge die `hide`-Klasse hinzu, um die Animation zu starten
  popupModal.classList.remove('show');
  popupModal.classList.add('hide');

  // Verstecke das Popup nach der Animation (120ms)
  setTimeout(() => {
    popupModal.style.display = 'none';
  }, 120); // 120ms entspricht der Dauer der Animation
}
function closePopupCard() {
  const popupOverlay = document.getElementById('popupOverlayCard');
  const popupModal = document.getElementById('popupModalCard');

  // Entferne die `show`-Klasse und füge die `hide`-Klasse hinzu, um die Animation zu starten
  popupModal.classList.remove('show');
  popupModal.classList.add('hide');

  // Verstecke das Popup nach der Animation (120ms entspricht der Dauer der Animation)
  setTimeout(() => {
    popupModal.style.display = 'none';
    popupOverlay.style.display = 'none'; // Overlay auch nach der Animation ausblenden
  }, 120); // 120ms entspricht der Dauer der Animation
  closePopupCardEdit()
}

function closePopupCardEdit() {
  const popupOverlay = document.getElementById('popupOverlayCardEdit');
  const popupModal = document.getElementById('popupModalCardEdit');
  // Entferne die `show`-Klasse und füge die `hide`-Klasse hinzu, um die Animation zu starten
  popupModal.classList.remove('show');
  popupModal.classList.add('hide');

  popupModal.style.display = 'none';
  popupOverlay.style.display = 'none';
}

async function updateTask(id, data) {
  try {
    let response = await fetch(`${BASE_URL_Board}/${id}.json`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(
        `Fehler beim Aktualisieren der Task: ${response.statusText}`
      );
    }

    console.log("Task erfolgreich aktualisiert:", await response.json());

    // Lokale Kontakte aktualisieren
    const index = allBoardContent.findIndex((task) => task.Uid === id);
    if (index !== -1) {
      allBoardContent[index] = { ...allBoardContent[index], ...data };
    }

    // UI aktualisieren
    renderBoardList();
  } catch (error) {
    console.error("Fehler beim Aktualisieren der Task:", error);
    alert("Es gab ein Problem beim Aktualisieren der Task.");
  }
}

// PROTON SCHEIß
//prio buttons

let priority = "";

let prioButtons = document.querySelectorAll('#prio button');

for (let i = 0; i < prioButtons.length; i++) {
    prioButtons[i].addEventListener('click', (event) => {
        const selectedButton = event.currentTarget;
        priority = event.currentTarget.value;
        const activePrioClass = selectedButton.getAttribute('id') + 'Active';
        const activeButtonBool = selectedButton.classList.contains(activePrioClass);

        if (!activeButtonBool) {
            // Remove the active class from all buttons
            prioButtons.forEach(button => {
                const buttonActiveClass = button.getAttribute('id') + 'Active';
                if (button.classList.contains(buttonActiveClass)) {
                    button.classList.remove(buttonActiveClass);
                    console.log("active prio class should be removed");
                    document.getElementById(button.getAttribute('id') + 'Img').src = '../assets/icons/' + button.getAttribute('id') + '.svg';
                }
            });

            // Add active class to the selected button
            selectedButton.classList.add(activePrioClass);
            document.getElementById(selectedButton.getAttribute('id') + 'Img').src = '../assets/icons/' + selectedButton.getAttribute('id') + 'Selected.svg';
        } else {
            // Remove active class if the same button is clicked again
            selectedButton.classList.remove(activePrioClass);
            document.getElementById(selectedButton.getAttribute('id') + 'Img').src = '../assets/icons/' + selectedButton.getAttribute('id') + '.svg';
        }
    });
}