async function updateSummary() {
  await loadDataBoards();
  greetUser();
  updateTaskCounts();
  checkLogin();

  // Füge den Aufruf hinzu, um das nächste Urgent-Datum zu aktualisieren
  let nextUrgentDate = getNextUrgentTaskDate();
  if (nextUrgentDate) {
    document.getElementById("date").innerText = formatDate(nextUrgentDate);
  } else {
    document.getElementById("date").innerText = "No upcoming urgent tasks";
  }
}

function greetUser() {
  const currentHour = new Date().getHours();
  let greeting = "";

  if (currentHour >= 5 && currentHour < 11) {
    greeting = "Good morning, ";
  } else if (currentHour >= 11 && currentHour < 15) {
    greeting = "Hello, ";
  } else if (currentHour >= 15 && currentHour < 18) {
    greeting = "Good afternoon, ";
  } else {
    greeting = "Good evening, ";
  }

  document.querySelector("#greetings span").textContent = greeting;
  document.querySelector("#greetings h2").textContent =
    localStorage.getItem("loggedInUser");
}

function updateTaskCounts() {
  let toDoCount = 0;
  let inProgressCount = 0;
  let urgentCount = 0;
  let awaitFeedbackCount = 0;
  let doneCount = 0;
  let totalTasks = allBoardContent.length;

  allBoardContent.forEach((task) => {
    if (task.status === "toDo") {
      toDoCount++;
    } else if (task.status === "in progress") {
      inProgressCount++;
    } else if (task.status === "await") {
      awaitFeedbackCount++;
    } else if (task.status === "done") {
      doneCount++;
    }
    if (task.prio === "urgent" && task.status != "done") {
      urgentCount++;
    }
  });

  document.getElementById("toDoCount").innerText = toDoCount;
  document.getElementById("inProgressCount").innerText = inProgressCount;
  document.getElementById("urgentCount").innerText = urgentCount;
  document.getElementById("awaitFeedbackCount").innerText = awaitFeedbackCount;
  document.getElementById("doneCount").innerText = doneCount;
  document.getElementById("totalTasksCount").innerText = totalTasks;
}

function getNextUrgentTaskDate() {
  const urgentTasks = allBoardContent.filter(
    (task) => task.prio === "urgent" && task.status !== "done"
  );

  if (urgentTasks.length === 0) {
    return null;
  }

  const nextUrgentTask = urgentTasks.reduce((earliestTask, currentTask) => {
    return new Date(currentTask.date) < new Date(earliestTask.date)
      ? currentTask
      : earliestTask;
  });
  return nextUrgentTask.date;
}


function formatDate(dateString) {
  let options = { year: 'numeric', month: 'long', day: 'numeric' };
  let date = new Date(dateString);
  return date.toLocaleDateString('en-US', options);
}

