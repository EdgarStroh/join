// Kontakte laden
const BASE_URL_Contact =
  "https://join-b197b-default-rtdb.europe-west1.firebasedatabase.app/contacts";

// Kontakte aus Firebase laden
async function loadDataContacts(path = "") {
  let response = await fetch(BASE_URL_Contact + path + ".json");
  let contactsData = await response.json();
  return (allContacts = Object.keys(contactsData).map(
    (key) => contactsData[key]
  ));
}

let contactSelection = document.getElementById("contactSelection");
let contactList = document.getElementById("contactList");

// Kontakte rendern
async function renderContactList() {
  const contacts = await loadDataContacts();

  // Kontakte alphabetisch sortieren
  contacts.sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });

  for (let i = 0; i < contacts.length; i++) {
    const firstLetter = contacts[i]["name"][0];
    const spaceIndex = contacts[i]["name"].indexOf(" ");
    const firstLetterAfterSpace = contacts[i]["name"][spaceIndex + 1];
    contactList.innerHTML += `
            <div class='contact flex' onclick='addTaskContact(event)'>
                <div class='flex'>
                    <span class='circle flex' style='background:${
                      contacts[i]["color"]
                    }'>
                        ${firstLetter + firstLetterAfterSpace}
                    </span>
                    <span>${contacts[i].name}</span>
                </div>
                <input type="checkbox" value="${contacts[i].name}">
            </div>
        `;
  }
}

renderContactList();

function toggleContactListView() {
  contactList.classList.toggle("hidden");
}

// Ermöglicht das Klicken auf das gesamte Kontakt-Element
function addTaskContact(event) {
  if (event.target.type !== "checkbox") {
    let checkbox = event.currentTarget.querySelector('input[type="checkbox"]');
    checkbox.checked = !checkbox.checked;
    event.currentTarget.classList.toggle("selectedContact");
  }
}

// Formularverarbeitung
let addTaskForm = document.getElementById("addTaskForm");
let title = document.getElementById("title");
let date = document.getElementById("date");
let description = document.getElementById("description");
let category = document.getElementById("category");
let subtask = document.getElementById("subtask");
let subtasks = []; // Subtasks werden als Objekte gespeichert
let subtasksList = document.getElementById("subTasksList");
let addSubtaskButton = document.getElementById("addSubtaskButton");


function renderSubtaskList() {
  subtasksList.innerHTML = "";
  for (let i = 0; i < subtasks.length; i++) {
    subtasksList.innerHTML += `
      <li class="subtask" data-index="${i}">
        <input type="text" class="subtask-edit-input" value="${subtasks[i].description}" style="display: none;">
        <span class="subtask-text">${subtasks[i].description}</span>
        <div class="subtask-actions">
          <img src="../assets/icons/edit.svg" alt="Edit" onclick="editSubtask(${i})" class="action-icon edit-icon">
          <img src="../assets/icons/delete.svg" alt="Delete" onclick="deleteSubtask(${i})" class="action-icon delete-icon">
         
          <img src="../assets/icons/check.svg" alt="Save" onclick="saveSubtask(${i})" class="action-icon save-icon" style="display: none;">
        </div>
      </li>`;
  }
}


function showActions(index) {
  document.getElementById(`subtask-actions-${index}`).style.display = "flex";
}

function hideActions(index) {
  document.getElementById(`subtask-actions-${index}`).style.display = "none";
}

function editSubtask(index) {
  const subtaskItem = document.querySelector(`.subtask[data-index='${index}']`);
  const subtaskText = subtaskItem.querySelector(".subtask-text");
  const subtaskInput = subtaskItem.querySelector(".subtask-edit-input");
  const editIcon = subtaskItem.querySelector(".edit-icon");
  const saveIcon = subtaskItem.querySelector(".save-icon");

  // Füge die Klasse hinzu, um den Hover-Effekt zu deaktivieren
  subtaskItem.classList.add("editing");

  // Verstecke den Text und zeige das Eingabefeld
  subtaskText.style.display = "none";
  subtaskInput.style.display = "block";

  // Setze das Eingabefeld in den bearbeitbaren Zustand
  subtaskInput.focus();

  // Setze den Cursor an das Ende des Textes
  const length = subtaskInput.value.length;
  subtaskInput.setSelectionRange(length, length);

  // Zeige das Speichern-Symbol, verstecke das Bearbeiten-Symbol
  editIcon.style.display = "none";
  saveIcon.style.display = "block";
}


function saveSubtask(index) {
  const subtaskItem = document.querySelector(`.subtask[data-index='${index}']`);
  const subtaskText = subtaskItem.querySelector(".subtask-text");
  const subtaskInput = subtaskItem.querySelector(".subtask-edit-input");
  const editIcon = subtaskItem.querySelector(".edit-icon");
  const saveIcon = subtaskItem.querySelector(".save-icon");

  // Aktualisiere den Subtask-Text
  subtasks[index].description = subtaskInput.value;

  // Aktualisiere die Anzeige
  subtaskText.textContent = subtaskInput.value;
  subtaskText.style.display = "block";
  subtaskInput.style.display = "none";

  // Entferne die Klasse, um den Hover-Effekt wieder zu aktivieren
  subtaskItem.classList.remove("editing");

  // Zeige das Bearbeiten-Symbol, verstecke das Speichern-Symbol
  editIcon.style.display = "block";
  saveIcon.style.display = "none";
}


function deleteSubtask(index) {
  subtasks.splice(index, 1);
  renderSubtaskList(); // Aktualisiere die Liste nach dem Löschen
}

function addSubtask() {
  subtasks.push({
    description: subtask.value,
    completed: false, // Standardmäßig auf false setzen
  });
  renderSubtaskList();
  subtask.value = ""; // Leert das Eingabefeld nach dem Hinzufügen
}

// Firebase Basis-URL für das Board
const BASE_URL_Board =
  "https://join-b197b-default-rtdb.europe-west1.firebasedatabase.app/tasks";

// Daten zu Firebase posten
async function postDataBoards(path = "", data = {}) {
  let response = await fetch(BASE_URL_Board + path + ".json", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await response.json();
}

// Ereignislistener für das Hinzufügen des Tasks
addTaskForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  let selectedContacts = document.querySelectorAll(
    '#contactList .contact input[type="checkbox"]:checked'
  );

  let contactNames = [];
  for (let i = 0; i < selectedContacts.length; i++) {
    let name = selectedContacts[i].value;
    contactNames.push(name);
  }

  // Daten vorbereiten
  let data = {
    asigned: contactNames,
    category: category.value,
    date: date.value,
    description: description.value,
    prio: priority,
    status: "toDo",
    subtasks: subtasks, // Subtasks enthalten jetzt `description` und `completed`
    title: title.value,
  };

  try {
    // Posten der Daten
    await postDataBoards("", data);

    // Nach erfolgreichem Posten zur board.html weiterleiten
    window.location.href = "board.html";
  } catch (error) {
    console.log("Error posting data to Firebase:", error);
  }
});

// Prio-Buttons
let priority = "";

let prioButtons = document.querySelectorAll("#prio button");

for (let i = 0; i < prioButtons.length; i++) {
  prioButtons[i].addEventListener("click", (event) => {
    const selectedButton = event.currentTarget;
    priority = event.currentTarget.value;
    const activePrioClass = selectedButton.getAttribute("id") + "Active";
    const activeButtonBool = selectedButton.classList.contains(activePrioClass);

    if (!activeButtonBool) {
      // Entferne die aktive Klasse von allen Buttons
      prioButtons.forEach((button) => {
        const buttonActiveClass = button.getAttribute("id") + "Active";
        if (button.classList.contains(buttonActiveClass)) {
          button.classList.remove(buttonActiveClass);
          document.getElementById(button.getAttribute("id") + "Img").src = "../assets/icons/" + button.getAttribute("id") + ".svg";
        }
      });

      // Füge aktive Klasse zum ausgewählten Button hinzu
      selectedButton.classList.add(activePrioClass);
      document.getElementById(selectedButton.getAttribute("id") + "Img").src = "../assets/icons/" + selectedButton.getAttribute("id") + "Selected.svg";
    } else {
      // Entferne aktive Klasse, wenn derselbe Button erneut geklickt wird
      selectedButton.classList.remove(activePrioClass);
      document.getElementById(selectedButton.getAttribute("id") + "Img").src = "../assets/icons/" + selectedButton.getAttribute("id") + ".svg";
    }
  });
}
