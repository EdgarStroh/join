let titlesDOM = document.getElementsByClassName("bc2");
let descriptionsDOM = document.getElementsByClassName("bc3");
let searchBar = document.getElementsByClassName("searchBar")[0];
let boardCardDOM = document.getElementsByClassName("boardCard");

/**
 * Displays all tasks by setting their display style to the default.
 */
function showAllTasks() {
  for (let i = 0; i < boardCardDOM.length; i++) {
    boardCardDOM[i].style.display = "";
  }
  renderBoardList();
}

/**
 * Searches for tasks based on the input from the search bar.
 * If the search query is empty, it shows all tasks; otherwise, it filters tasks based on the query.
 */
function searchTasks() {
  updateBoard().then(() => {
    let searchQuery = searchBar.value.toLowerCase();

    if (searchQuery === "") {
      showAllTasks();
    } else {
      filterTasksByQuery(searchQuery);
      displayEmptyColumnMessages();
    }
  });
}

/**
 * Filters the tasks displayed in the board based on the search query.
 *
 * @param {string} searchQuery - The search query used to filter tasks.
 */
function filterTasksByQuery(searchQuery) {
  for (let i = 0; i < titlesDOM.length; i++) {
    let title = titlesDOM[i].innerHTML.toLowerCase();
    let description = descriptionsDOM[i].innerHTML.toLowerCase();

    if (title.includes(searchQuery) || description.includes(searchQuery)) {
      boardCardDOM[i].style.display = "";
    } else {
      boardCardDOM[i].style.display = "none";
    }
  }
}

/**
 * Checks each column for empty tasks and displays corresponding messages if any column is empty.
 */
function displayEmptyColumnMessages() {
  let isToDoEmpty = isColumnEmpty("toDo");
  let isProgressEmpty = isColumnEmpty("inProgress");
  let isAwaitEmpty = isColumnEmpty("awaitFeedback");
  let isDoneEmpty = isColumnEmpty("done");

  showEmptyMessageIfNeeded(isToDoEmpty, "toDo", "No tasks in To-Do");
  showEmptyMessageIfNeeded(
    isProgressEmpty,
    "inProgress",
    "No tasks in Progress"
  );
  showEmptyMessageIfNeeded(
    isAwaitEmpty,
    "awaitFeedback",
    "No tasks awaiting feedback"
  );
  showEmptyMessageIfNeeded(isDoneEmpty, "done", "No tasks completed");
}

/**
 * Checks if a specified column is empty.
 *
 * @param {string} columnId - The ID of the column to check.
 * @returns {boolean} True if the column is empty, otherwise false.
 */
function isColumnEmpty(columnId) {
  let column = document.getElementById(columnId);
  return (
    column.querySelectorAll('.boardCard[style*="display: none"]').length ===
    column.children.length
  );
}

/**
 * Displays an empty message for a specified column if it is empty.
 *
 * @param {boolean} isEmpty - Indicates whether the column is empty.
 * @param {string} columnId - The ID of the column to display the message in.
 * @param {string} message - The message to display if the column is empty.
 */
function showEmptyMessageIfNeeded(isEmpty, columnId, message) {
  if (isEmpty) {
    document.getElementById(
      columnId
    ).innerHTML = `<div class="emptyColumnMessage">${message}</div>`;
  }
}
