/**
 * Updates the summary section of the application, including loading data, greeting the user,
 * updating task counts, checking login status, and displaying the next urgent task date.
 *
 * @returns {Promise<void>} A promise that resolves when the summary has been updated.
 */
async function updateSummary() {
  await loadDataBoards();
  greetUser();
  updateTaskCounts();
  checkLogin();

  let nextUrgentDate = getNextUrgentTaskDate();
  if (nextUrgentDate) {
    document.getElementById("date").innerText = formatDate(nextUrgentDate);
  } else {
    document.getElementById("date").innerText = "No upcoming urgent tasks";
  }
}

/**
 * Greets the user based on the current time and updates the greeting text in the DOM.
 */
function greetUser() {
  const greeting = getGreetingBasedOnTime();
  document.querySelector("#greetings span").textContent = greeting;
  document.querySelector("#greetings h2").textContent =
    localStorage.getItem("loggedInUser");
}

/**
 * Gets a greeting message based on the current time of day.
 *
 * @returns {string} A greeting message.
 */
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

/**
 * Updates the task counts displayed in the DOM.
 */
function updateTaskCounts() {
  const totalTasks = allBoardContent.length;

  document.getElementById("toDoCount").innerText = countTasksByStatus("toDo");
  document.getElementById("inProgressCount").innerText =
    countTasksByStatus("in progress");
  document.getElementById("awaitFeedbackCount").innerText =
    countTasksByStatus("await");
  document.getElementById("doneCount").innerText = countTasksByStatus("done");
  document.getElementById("urgentCount").innerText = countUrgentTasks();
  document.getElementById("totalTasksCount").innerText = totalTasks;
}

/**
 * Counts the number of tasks with a specific status.
 *
 * @param {string} status - The status to count tasks by.
 * @returns {number} The count of tasks with the specified status.
 */
function countTasksByStatus(status) {
  return allBoardContent.filter((task) => task.status === status).length;
}

/**
 * Counts the number of urgent tasks that are not marked as done.
 *
 * @returns {number} The count of urgent tasks that are not done.
 */
function countUrgentTasks() {
  return allBoardContent.filter(
    (task) => task.prio === "urgent" && task.status !== "done"
  ).length;
}

/**
 * Gets the date of the next urgent task that is not marked as done.
 *
 * @returns {string|null} The date of the next urgent task or null if there are no urgent tasks.
 */
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

/**
 * Formats a date string into a more readable format.
 *
 * @param {string} dateString - The date string to format.
 * @returns {string} The formatted date string.
 */
function formatDate(dateString) {
  let options = { year: "numeric", month: "long", day: "numeric" };
  let date = new Date(dateString);
  return date.toLocaleDateString("en-US", options);
}

