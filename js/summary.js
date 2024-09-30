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
  const greeting = getGreetingBasedOnTime();
  document.querySelector("#greetings span").textContent = greeting;
  document.querySelector("#greetings h2").textContent = localStorage.getItem("loggedInUser");
}

function getGreetingBasedOnTime() {
  const currentHour = new Date().getHours();

  if (currentHour >= 5 && currentHour < 11) {
    return "Good morning, ";
  } else if (currentHour >= 11 && currentHour < 15) {
    return "Hello, ";
  } else if (currentHour >= 15 && currentHour < 18) {
    return "Good afternoon, ";
  } else {
    return "Good evening, ";
  }
}


function updateTaskCounts() {
  const totalTasks = allBoardContent.length;

  document.getElementById("toDoCount").innerText = countTasksByStatus("toDo");
  document.getElementById("inProgressCount").innerText = countTasksByStatus("in progress");
  document.getElementById("awaitFeedbackCount").innerText = countTasksByStatus("await");
  document.getElementById("doneCount").innerText = countTasksByStatus("done");
  document.getElementById("urgentCount").innerText = countUrgentTasks();
  document.getElementById("totalTasksCount").innerText = totalTasks;
}

function countTasksByStatus(status) {
  return allBoardContent.filter((task) => task.status === status).length;
}

function countUrgentTasks() {
  return allBoardContent.filter(
    (task) => task.prio === "urgent" && task.status !== "done"
  ).length;
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

