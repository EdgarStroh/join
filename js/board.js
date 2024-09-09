function updateAll() {
    loadDataBoards();
}

function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
  
  function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
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
  toDoContainer.innerHTML = ""; // Clear any existing content
  progressContainer.innerHTML = ""; // Clear any existing content
  awaitContainer.innerHTML = ""; // Clear any existing content
  doneContainer.innerHTML = ""; // Clear any existing content
  //loadDataBoards("");

  // Generate and insert the board content into the container
//   allBoardContent.forEach((board, index) => {
//     boardContainer.innerHTML += generateBoardContent(board, index); 
//   });
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