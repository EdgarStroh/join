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
    countTasksByStatus("inProgress");
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


// Event listeners for window resize and load events
window.addEventListener("resize", checkScreenWidth);
window.addEventListener("load", checkScreenWidth);

/**
 * Checks the screen width and displays a greeting message if the width is less than or equal to 1020 pixels.
 */
function checkScreenWidth() {
  let morningText = getOrCreateMorningTextElement();

  if (window.innerWidth <= 1020) {
    displayGreeting(morningText);
  }
}

/**
 * Gets or creates the morning greeting text element in the DOM.
 * 
 * @returns {HTMLElement} The morning text element.
 */
function getOrCreateMorningTextElement() {
  let morningText = document.getElementById("morningText");

  if (!morningText) {
    morningText = document.createElement("div");
    morningText.id = "morningText";
    morningText.classList.add("morning-text", "hidden");
    document.body.appendChild(morningText);
  }

  return morningText;
}

/**
 * Displays the greeting message in the morning text element.
 * 
 * @param {HTMLElement} morningText - The element where the greeting will be displayed.
 */
function displayGreeting(morningText) {
  let timeBasedGreeting = getGreetingBasedOnTime();
  let loggedInUser = localStorage.getItem("loggedInUser");

  morningText.innerHTML = `
    <div style="text-align:center">
      <h1>${timeBasedGreeting}</h1>
      <br>
      <h1 style="color:#29ABE2">${loggedInUser}</h1>
    </div>`;
  toggleVisibility(morningText); 
}

/**
 * Toggles the visibility of the morning greeting text element.
 * The element is shown for a brief period before being hidden again.
 * 
 * @param {HTMLElement} morningText - The element whose visibility will be toggled.
 */
function toggleVisibility(morningText) {
  morningText.classList.remove("hidden");
  morningText.classList.add("show");

  setTimeout(() => {
    morningText.classList.remove("show");
    setTimeout(() => {
      morningText.classList.add("hidden");
    }, 2000);
  }, 1500);
}


