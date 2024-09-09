// let todos = [{
//     'id': 0,
//     'title': 'Putzen',
//     'category': 'toDo'
// }, {
//     'id': 1,
//     'title': 'Kochen',
//     'category': 'inProgress'
// }, {
//     'id': 2,
//     'title': 'Einkaufen',
//     'category': 'done'
// },{
//     'id': 3,
//     'title': 'Duschen',
//     'category': 'awaitFeedback'
// }];

let currentDraggedElement;
let currentDraggedElementIndex;

function updateAll() {
    updateToDo();
    updateInProgress();
    updateAwaitFeedback();
    updateDone();
    renderBoardList();
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

// function updateToDo() {
//     let toDo = todos.filter(t => t['category'] == 'toDo');
//     document.getElementById('toDo').innerHTML = '';
//     for (let index = 0; index < toDo.length; index++) {
//         const element = toDo[index];
//         document.getElementById('toDo').innerHTML += generateBoardContent(element);
//     }
// }

// function updateInProgress() {
//     let inProgress = todos.filter(t => t['category'] == 'inProgress');
//     document.getElementById('inProgress').innerHTML = '';
//     for (let index = 0; index < inProgress.length; index++) {
//         const element = inProgress[index];
//         document.getElementById('inProgress').innerHTML += generateBoardContent(element);
//     }
// }

// function updateAwaitFeedback() {
//     let awaitFeedback = todos.filter(t => t['category'] == 'awaitFeedback');
//     document.getElementById('awaitFeedback').innerHTML = '';
//     for (let index = 0; index < awaitFeedback.length; index++) {
//         const element = awaitFeedback[index];
//         document.getElementById('awaitFeedback').innerHTML += generateBoardContent(element);
//     }
// }

// function updateDone() {
//     let done = todos.filter(t => t['category'] == 'done');
//     document.getElementById('done').innerHTML = '';
//     for (let index = 0; index < done.length; index++) {
//         const element = done[index];
//         document.getElementById('done').innerHTML += generateBoardContent(element);
//     }
// }

// function startDragging(id) {
//     currentDraggedElement = id;
// }


// function generateTodoHTML(element) {
//     return `<div draggable="true" ondragstart="startDragging(${element['id']})" class="todo">${element['title']}</div>`;
// }

// function allowDrop(ev) {
//     ev.preventDefault();
// }

// function moveTo(category) {
//     todos[currentDraggedElement]['category'] = category;
//     updateAll();
// }

function highlight(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}

function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
}

function renderBoardList() {
    let boardContainer = document.getElementById("toDo");
    boardContainer.innerHTML = ""; // Clear any existing content

    // Generate and insert the board content into the container
    allBoardContent.forEach((board, index) => {
        boardContainer.innerHTML += generateBoardContent(board, index); // Pass index as argument
    });
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