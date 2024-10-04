let allContacts = [];
let allBoardContent = [];
let allUsers = [];

/**
 * Loads initial data for contacts, boards, and users when the application starts.
 *
 * @returns {Promise<void>} A promise that resolves when all data is loaded.
 */
async function onloadFunctionData() {
  await loadDataContacts("");
  await loadDataBoards("");
  await loadDataUsers("");
}

// Base URL for contacts
const BASE_URL_Contact =
  "https://join-b197b-default-rtdb.europe-west1.firebasedatabase.app/contacts";

/**
 * Loads contacts data from the database.
 *
 * @param {string} [path=""] - Optional path for loading specific contacts.
 * @returns {Promise<void>} A promise that resolves when contacts are loaded.
 */
async function loadDataContacts(path = "") {
  let response = await fetch(BASE_URL_Contact + path + ".json");
  let contactsData = await response.json();

  allContacts = Object.keys(contactsData).map((key) => ({
    Uid: key,
    ...contactsData[key],
  }));
}

/**
 * Posts a new contact to the database.
 *
 * @param {string} [path=""] - Optional path for posting the contact.
 * @param {Object} [data={}] - The contact data to be posted.
 * @returns {Promise<Object>} A promise that resolves to the response JSON.
 */
async function postDataContacts(path = "", data = {}) {
  let response = await fetch(BASE_URL_Contact + path + ".json", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}

/**
 * Updates a contact in the Firebase database.
 *
 * @param {string} id - The unique identifier of the contact to update.
 * @param {Object} data - The updated contact data.
 * @returns {Promise<Object>} A promise that resolves to the response JSON.
 * @throws Will throw an error if the update request fails.
 */
async function updateContactInFirebase(id, data) {
  const response = await fetch(`${BASE_URL_Contact}/${id}.json`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Error updating contact: ${response.statusText}`);
  }
  return response.json();
}

// Base URL for boards
const BASE_URL_Board =
  "https://join-b197b-default-rtdb.europe-west1.firebasedatabase.app/tasks";

/**
 * Loads board data from the database.
 *
 * @param {string} [path=""] - Optional path for loading specific boards.
 * @returns {Promise<void>} A promise that resolves when boards are loaded.
 */
async function loadDataBoards(path = "") {
  let response = await fetch(BASE_URL_Board + path + ".json");
  let localBoardContent = await response.json();

  allBoardContent = Object.keys(localBoardContent).map((key) => ({
    Uid: key,
    ...localBoardContent[key],
  }));
}

/**
 * Sanitizes assigned contacts by filtering out those that do not exist in the contact list.
 */
function sanitizeAssignedContacts() {
  allBoardContent.forEach((task) => {
    if (task.asigned) {
      let newListAssigned = task.asigned.filter((assignee) =>
        allContacts.find((contact) => contact.name === assignee)
      );
      task.asigned = newListAssigned;
    }
  });
}

/**
 * Posts a new board task to the database.
 *
 * @param {string} [path=""] - Optional path for posting the task.
 * @param {Object} [data={}] - The task data to be posted.
 * @returns {Promise<Object>} A promise that resolves to the response JSON.
 */
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

/**
 * Updates a task in the Firebase database.
 *
 * @param {string} uid - The unique identifier of the task to update.
 * @param {Object} data - The updated task data.
 * @returns {Promise<Response>} A promise that resolves to the response.
 * @throws Will throw an error if the update request fails.
 */
async function updateTaskFirebase(uid, data) {
  let response = await fetch(`${BASE_URL_Board}/${uid}.json`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Error updating task: ${response.statusText}`);
  }
  return response;
}

/**
 * Handles the deletion of a task from the database.
 *
 * @param {string} uid - The unique identifier of the task to delete.
 * @returns {Promise<void>} A promise that resolves when the task is deleted.
 * @throws Will throw an error if the delete request fails.
 */
async function handleDeleteTaskRequest(uid) {
  let response = await fetch(`${BASE_URL_Board}/${uid}.json`, {
    method: "DELETE",
  });

  if (!response.ok)
    throw new Error("Error deleting task: " + response.statusText);
}

/**
 * Updates a subtask in the Firebase database.
 *
 * @param {number} taskIndex - The index of the task in the board content.
 * @param {number} subtaskIndex - The index of the subtask to update.
 * @returns {Promise<void>} A promise that resolves when the subtask is updated.
 * @throws Will throw an error if the update request fails.
 */
async function updateSubtaskInFirebase(taskIndex, subtaskIndex) {
  const taskId = allBoardContent[taskIndex].Uid;
  const updatedSubtask = allBoardContent[taskIndex].subtasks[subtaskIndex];

  const response = await fetch(
    `${BASE_URL_Board}/${taskId}/subtasks/${subtaskIndex}.json`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedSubtask),
    }
  );

  if (!response.ok) {
    throw new Error("Error sending data to Firebase");
  }
}

// Base URL for users
const BASE_URL_USERS =
  "https://join-b197b-default-rtdb.europe-west1.firebasedatabase.app/users";

/**
 * Loads user data from the database.
 *
 * @param {string} [path=""] - Optional path for loading specific users.
 * @returns {Promise<void>} A promise that resolves when users are loaded.
 */
async function loadDataUsers(path = "") {
  let response = await fetch(BASE_URL_USERS + path + ".json");
  let responseToJson = await response.json();

  allUsers = Object.keys(responseToJson).map((key) => ({
    Uid: key,
    ...responseToJson[key],
  }));
}

/**
 * Posts a new user to the database.
 *
 * @param {string} [path=""] - Optional path for posting the user.
 * @param {Object} [data={}] - The user data to be posted.
 * @returns {Promise<Object>} A promise that resolves to the response JSON.
 */
async function postDataUsers(path = "", data = {}) {
  let response = await fetch(BASE_URL_USERS + path + ".json", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}
