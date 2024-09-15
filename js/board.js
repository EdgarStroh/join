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
function openPopupCard(index, categoryColor,statusImage) {
  const popupOverlay = document.getElementById('popupOverlayCard');
  const popupModal = document.getElementById('popupModalCard');

  popupModal.innerHTML = htmlTemplatePopUpBoardCard(index, categoryColor,statusImage);

  // Zeige das Overlay und das Popup an
  popupOverlay.style.display = 'flex';
  popupModal.style.display = 'block';

  // Entferne die `hide`-Klasse (falls vorhanden) und füge die `show`-Klasse hinzu
  popupModal.classList.remove('hide');
  popupModal.classList.add('show');
}

function htmlTemplatePopUpBoardCard(index, categoryColor, statusImage, contact) {
  // Funktion, um die Initialen eines Namens zu berechnen
  function getInitials(name) {
    return name
      .split(" ")
      .map(n => n[0]) // Nimm den ersten Buchstaben jedes Namens
      .join("");
  }

  // Iteriere über alle zugewiesenen Personen und erstelle eine Liste mit Initialen
  let assignedHTML = '';
  if (Array.isArray(allBoardContent[index].asigned)) {
    allBoardContent[index].asigned.forEach(person => {
      const initials = getInitials(person);
      assignedHTML += `${initials}  ${person}<br>`;
    });
  }

  return `
    <div class="puCategory">
      <span class="boardCategory bc1" style="background-color: ${categoryColor};">
        ${allBoardContent[index].category}
      </span>
      <button onclick="closePopupCard()">x</button>
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

    <div>
      Assigned To:<br>
      
        ${assignedHTML}
      
    </div>

    Subtasks <br>
    allSubtask
    allSubtask

    <div>Delete Edit</div>
  `;
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