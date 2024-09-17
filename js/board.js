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
    <span>Assigned To:</span>  
    <div class="contactCardPopUpContent">
      ${assignedHTML}
    </div>
    <span>Subtasks</span> 
    <div >
      ${subtasksHTML}
    </div>
    <div class="deleteEditPopUp">
      <div onclick="deleteDataBoard('${allBoardContent[index].Uid}')" class="delete">
        <img src="../assets/icons/delete.svg" alt="Delete">
        <span>Delete</span>
      </div>
    <div class="info">
      <img src="../assets/icons/I.svg" alt="Info">
    </div>
    <div class="edit" onclick="openPopupCardEdit(${index})">
      <img src="../assets/icons/edit.svg" alt="Edit">
      <div>
        <span>Edit</span>
      </div>
    </div>
  
  `;
}

function openPopupCardEdit(index) {
  const popupModal = document.getElementById('popupModalCardEdit');

  popupModal.innerHTML = htmlTemplatePopUpBoardCardEdit(index);


  // Zeige das Overlay und das Popup an
  popupModal.style.display = 'block';

  // Entferne die `hide`-Klasse (falls vorhanden) und füge die `show`-Klasse hinzu
  popupModal.classList.remove('hide');
  popupModal.classList.add('show');
}
function htmlTemplatePopUpBoardCardEdit(index) {
  const assignedHTML = generateAssignedHTML(allBoardContent[index].asigned);
  
  return `
    <div class="closeContainerEdit">
      <img class="close" onclick="closePopupCard()" src="../assets/icons/close.svg">
    </div>
    <label for="title">Title<span class="requiredStar"></span></label>
    <br>
    <input type="text" id="title" placeholder="Enter a title" value="${
      allBoardContent[index].title
    }" required>
    <br>
    <label for="description">Description</label>
    <br>
    <textarea id="description" rows="5" placeholder="Enter a Description">${
      allBoardContent[index].description
    }</textarea>
    <br>
    <label for="dueDate">Due Date<span class="requiredStar"></span></label>
    <br>
    <input type="date" id="date" value="${allBoardContent[index].date}">
    <br>
    <br>
    <label for="prio"><strong>Priority</strong></label>
    <section id="prio" class="flex">
      <button value="urgent" id="prioUrgent" type="button">Urgent<img id="prioUrgentImg" src="../assets/icons/prioUrgent.svg"></button>
      <button value="medium" id="prioMedium" type="button" class="prioMediumActive">Medium<img id="prioMediumImg" src="../assets/icons/prioMediumSelected.svg"></button>
      <button value="low" id="prioLow" type="button">Low<img id="prioLowImg" src="../assets/icons/prioLow.svg"></button>
    </section>
    <label for="contactSelectionEdit">Assigned to</label>
    <div id="contactSelectionEdit" onclick="toggleContactListView()" tabindex="0"> Select contacts to assign</div>
    <div class="profileBadges">
      ${assignedHTML} <!-- Profilbadges anzeigen -->
    </div>
    <label for="Subtasks">Subtasks</label>
    <div id="addSubTask" class="flex">
        <input id="subtask" class="addSubTask" placeholder="Add new Subtask" type="text">
        <!--Benötigt für onclick Event!-->
        <img onclick="addSubtask()" style="cursor:pointer" src="../assets/icons/addSubtask.svg">
    </div>
    <ul id="subTasksList"> 
      ${renderSubtasks(allBoardContent[index].subtasks)}
    </ul>
    <button class="button margin-left" onclick="closePopupCardEdit()">Ok<img src="../assets/icons/create.svg"></button>
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




async function deleteDataBoard(uid) {
  try {
    await handleDeleteTaskRequest(`${BASE_URL_Board}/${uid}.json`);

    closePopupCard();
    updateBoard();

  } catch (error) {
    console.error("Fehler beim Löschen der Task:", error);
    alert("Es gab ein Problem beim Löschen der Task.");
  }
}

async function handleDeleteTaskRequest(url) {
  let response = await fetch(url, { method: "DELETE" });

  if (!response.ok)
    throw new Error("Fehler beim Löschen der Task: " + response.statusText);
}

// noch nicht fertig!!!
function editTask(id) {
  console.log(`editTask aufgerufen mit ID: ${id}`);

  // const name = document.getElementById("inputEditName").value;
  // const email = document.getElementById("inputEditEmail").value;
  // const phone = document.getElementById("inputEditPhone").value;

  // const originalContact = allContacts.find((contact) => contact.Uid === id);
  // const originalIndex = allContacts.findIndex((contact) => contact.Uid === id);

  // if (!originalContact) {
  //   console.error("Kontakt mit ID", id, "nicht gefunden!");
  //   return;
  // }

  // const updatedContact = {
  //   ...originalContact,
  //   name: name,
  //   email: email,
  //   phone: phone,
  // };

  // allContacts[originalIndex] = updatedContact;
  // updateDataContact(id, updatedContact);
  // closeEditContact();
  // renderExtendedContact(originalIndex);
}


// noch nicht fertig, weil noch nicht schön (DropDown und Markierungen fehlen)!!!
function renderContactSelection(){
  let contactListEdit = '';
  for (i = 0; i < allContacts.length; i++) {
    const firstLetter = allContacts[i]["name"][0];
    const spaceIndex = allContacts[i]["name"].indexOf(" ");
    const firstLetterAfterSpace = allContacts[i]["name"][spaceIndex + 1];

    contactListEdit += `
                <div class='contact flex' onclick='addTaskContact(event)'>
                    <div class='flex'>
                        <span class='circle flex' style='background:${allContacts[i]["color"]}'>
                          ${firstLetter + firstLetterAfterSpace}
                        </span>
                        <span>
                          ${allContacts[i].name}
                        </span>
                    </div>
                    <input type="checkbox" value="${allContacts[i].name}">
                </div>
        `;
  }
  return contactListEdit;
}

// function toggleContactListView() {
//   const contactList = document.getElementById("contactListEdit");
//   if (contactList) {
//     contactList.classList.toggle("hidden");
//   } else {
//     console.error('Element mit ID "contactList" nicht gefunden');
//   }
// }
function toggleContactListView() {
  const existingDropdown = document.getElementById("contactListEdit");

  if (existingDropdown) {
    // Entferne das Dropdown, wenn es bereits existiert
    existingDropdown.remove();
  } else {
    // Erstelle und füge das Dropdown dynamisch ein
    createDropdown();
  }
}

function createDropdown() {
  // Erstelle das Dropdown-Menü
  const contactList = document.createElement("div");
  contactList.id = "contactListEdit";
  contactList.classList.add("flex");

  // Füge den HTML-Inhalt der Kontakte hinzu
  contactList.innerHTML = renderContactSelection(); // Erzeugt den HTML-Code der Kontakte

  // Füge das Dropdown unterhalb des 'contactSelectionEdit' ein
  const container = document.getElementById("contactSelectionEdit");
  container.parentElement.insertBefore(contactList, container.nextSibling); // Füge es als Geschwisterelement hinzu

  // Füge eventListener hinzu, um das Dropdown zu schließen, wenn irgendwo anders geklickt wird
  document.addEventListener("click", closeDropdownOnClickOutside);
}

function closeDropdownOnClickOutside(event) {
  const dropdown = document.getElementById("contactListEdit");
  const contactSelection = document.getElementById("contactSelectionEdit");

  // Überprüfe, ob der Klick außerhalb des Dropdowns und des Kontakt-Selektionsbereichs war
  if (
    dropdown &&
    !dropdown.contains(event.target) &&
    !contactSelection.contains(event.target)
  ) {
    dropdown.remove();
    document.removeEventListener("click", closeDropdownOnClickOutside);
  }
}

function generateAssignedHTML(assignedContacts) {
  let assignedHTML = "";

  // Initialen und Namen der zugewiesenen Personen
  if (Array.isArray(assignedContacts)) {
    assignedContacts.forEach((person) => {
      const initials = getInitials(person) || ""; // Fallback für Initialen
      const color = contactColors[person] || ""; // Fallback-Farbe
      assignedHTML += `
        <div class="contactCard" style="background-color: ${color}; color: white; padding: 4px 8px; border-radius: 50%; margin-right: 8px;">
          ${initials}
        </div>`;
    });
  }

  return assignedHTML;
}


function renderSubtasks(subtasks) {
  // Überprüfe, ob subtasks ein Array ist und es Elemente enthält
  if (Array.isArray(subtasks) && subtasks.length > 0) {
    // Erstelle eine Liste von li-Elementen
    return subtasks.map((subtask) => `<li>${subtask}</li>`).join("");
  }
  return ""; // Rückgabe eines leeren Strings, wenn subtasks kein Array ist oder leer
}

function renderSubtasks(subtasks) {
  // Überprüfe, ob subtasks ein Array ist und es Elemente enthält
  if (Array.isArray(subtasks) && subtasks.length > 0) {
    // Erstelle eine Liste von li-Elementen
    return subtasks.map((subtask) => `<li>${subtask}</li>`).join("");
  }
  return ""; // Rückgabe eines leeren Strings, wenn subtasks kein Array ist oder leer
}

//Für die Suche verwendete Variablen
let titlesDOM = document.getElementsByClassName('bc2');
let descriptionsDOM = document.getElementsByClassName('bc3');
let searchBar = document.getElementsByClassName('searchBar')[0];
let boardCardDOM = document.getElementsByClassName('boardCard');

//Suchfunktion
searchBar.addEventListener('keyup', ()=>{
  updateBoard().then(
    ()=>{
      let searchQuery = searchBar.value.toLowerCase();
      for(i=0; i<titlesDOM.length;i++){
        let title = titlesDOM[i].innerHTML.toLowerCase();
        let description = descriptionsDOM[i].innerHTML.toLowerCase();
        if(!(title.includes(searchQuery) || description.includes(searchQuery))){
          boardCardDOM[i].style.display = 'none';
        }
      }
    }
  )
})
