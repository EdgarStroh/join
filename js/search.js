let titlesDOM = document.getElementsByClassName("bc2");
let descriptionsDOM = document.getElementsByClassName("bc3");
let searchBar = document.getElementsByClassName("searchBar")[0];
let boardCardDOM = document.getElementsByClassName("boardCard");

function showAllTasks() {
  for (let i = 0; i < boardCardDOM.length; i++) {
    boardCardDOM[i].style.display = ""; 
  }
  renderBoardList();
}

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

function displayEmptyColumnMessages() {
  let isToDoEmpty = isColumnEmpty("toDo");
  let isProgressEmpty = isColumnEmpty("inProgress");
  let isAwaitEmpty = isColumnEmpty("awaitFeedback");
  let isDoneEmpty = isColumnEmpty("done");

  showEmptyMessageIfNeeded(isToDoEmpty, "toDo", "No tasks in To-Do");
  showEmptyMessageIfNeeded(isProgressEmpty, "inProgress", "No tasks in Progress");
  showEmptyMessageIfNeeded(isAwaitEmpty, "awaitFeedback", "No tasks awaiting feedback");
  showEmptyMessageIfNeeded(isDoneEmpty, "done", "No tasks completed");
}

function isColumnEmpty(columnId) {
  let column = document.getElementById(columnId);
  return column.querySelectorAll('.boardCard[style*="display: none"]').length === column.children.length;
}

function showEmptyMessageIfNeeded(isEmpty, columnId, message) {
  if (isEmpty) {
    document.getElementById(columnId).innerHTML = `<div class="emptyColumnMessage">${message}</div>`;
  }
}

