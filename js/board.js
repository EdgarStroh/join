function updateAll() {
  loadDataBoards();
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function dropDone(ev) {
  ev.preventDefault();
  let data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
  let index = parseInt(data.split("-")[1]);
  let currentTask = allBoardContent[index];
  currentTask.status = "done";
  updateTask(currentTask.Uid, currentTask);
}
function dropAwait(ev) {
  ev.preventDefault();
  let data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
  let index = parseInt(data.split("-")[1]);
  let currentTask = allBoardContent[index];
  currentTask.status = "await";
  updateTask(currentTask.Uid, currentTask);
}
function dropInProgress(ev) {
  ev.preventDefault();
  let data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
  let index = parseInt(data.split("-")[1]);
  let currentTask = allBoardContent[index];
  currentTask.status = "in progress";
  updateTask(currentTask.Uid, currentTask);
}
function dropToDo(ev) {
  ev.preventDefault();
  let data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
  let index = parseInt(data.split("-")[1]);
  let currentTask = allBoardContent[index];
  currentTask.status = "toDo";
  updateTask(currentTask.Uid, currentTask);
}

function highlight(id) {
  document.getElementById(id).classList.add('drag-area-highlight');
}

function removeHighlight(id) {
  document.getElementById(id).classList.remove('drag-area-highlight');
}

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