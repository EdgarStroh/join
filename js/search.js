// SEARCH FUNCTION
let titlesDOM = document.getElementsByClassName("bc2");
let descriptionsDOM = document.getElementsByClassName("bc3");
let searchBar = document.getElementsByClassName("searchBar")[0];
let boardCardDOM = document.getElementsByClassName("boardCard");

// Event für die Suche per Klick
document
  .querySelector(".search-icon-container")
  .addEventListener("click", () => {
    searchTasks();
  });

// Event für die Live-Suche bei Keyup, um alle Aufgaben anzuzeigen, wenn das Eingabefeld leer ist
searchBar.addEventListener("input", () => {
  if (searchBar.value === "") {
    showAllTasks(); // Zeige alle Aufgaben, wenn das Eingabefeld leer ist
    renderBoardList(); // Aktualisiere die Liste, um sicherzustellen, dass leere Nachrichten entfernt werden
  } else {
    searchTasks(); // Falls es einen Suchbegriff gibt, führe die Suche aus
  }
});

// Funktion, um alle Aufgaben anzuzeigen
function showAllTasks() {
  for (let i = 0; i < boardCardDOM.length; i++) {
    boardCardDOM[i].style.display = ""; // Zeige alle Aufgaben
  }
  renderBoardList(); // Aktualisiere das Board, um leere Spaltennachrichten zu entfernen
}

function searchTasks() {
  updateBoard().then(() => {
    let searchQuery = searchBar.value.toLowerCase(); // holt den Suchtext aus dem Eingabefeld
    let isToDoEmpty = true;
    let isProgressEmpty = true;
    let isAwaitEmpty = true;
    let isDoneEmpty = true;

    // Wenn das Suchfeld leer ist, zeige alle Aufgaben
    if (searchQuery === "") {
      showAllTasks(); // Ruft die Funktion auf, um alle Aufgaben anzuzeigen
    } else {
      // Verstecke nicht passende Aufgaben
      for (let i = 0; i < titlesDOM.length; i++) {
        let title = titlesDOM[i].innerHTML.toLowerCase();
        let description = descriptionsDOM[i].innerHTML.toLowerCase();
        if (
          !(title.includes(searchQuery) || description.includes(searchQuery))
        ) {
          boardCardDOM[i].style.display = "none"; // Verstecke Aufgaben, die nicht passen
        } else {
          boardCardDOM[i].style.display = ""; // Zeige passende Aufgaben

          // Überprüfen, in welcher Spalte die Aufgabe ist, um festzustellen, ob sie leer ist
          if (boardCardDOM[i].parentElement.id === "toDo") {
            isToDoEmpty = false;
          } else if (boardCardDOM[i].parentElement.id === "inProgress") {
            isProgressEmpty = false;
          } else if (boardCardDOM[i].parentElement.id === "awaitFeedback") {
            isAwaitEmpty = false;
          } else if (boardCardDOM[i].parentElement.id === "done") {
            isDoneEmpty = false;
          }
        }
      }

      // Anzeigen von Nachrichten, wenn keine Aufgaben in einer Spalte nach der Suche übrig bleiben
      if (isToDoEmpty) {
        document.getElementById(
          "toDo"
        ).innerHTML = `<div class="emptyColumnMessage">No tasks in To-Do</div>`;
      }
      if (isProgressEmpty) {
        document.getElementById(
          "inProgress"
        ).innerHTML = `<div class="emptyColumnMessage">No tasks in Progress</div>`;
      }
      if (isAwaitEmpty) {
        document.getElementById(
          "awaitFeedback"
        ).innerHTML = `<div class="emptyColumnMessage">No tasks awaiting feedback</div>`;
      }
      if (isDoneEmpty) {
        document.getElementById(
          "done"
        ).innerHTML = `<div class="emptyColumnMessage">No tasks completed</div>`;
      }
    }
  });
}
