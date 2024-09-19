let allContacts = [];
let allBoardContent = [];
let allUsers = [];

async function onloadFunctionData() {
    await loadDataContacts("");
    await loadDataBoards("");
    await loadDataUsers("");
}

//                              +++ CONTACT +++

const BASE_URL_Contact = "https://join-b197b-default-rtdb.europe-west1.firebasedatabase.app/contacts";

// load for contacts
async function loadDataContacts(path = "") {
    let response = await fetch(BASE_URL_Contact + path + ".json");
    let contactsData = await response.json();

    allContacts = Object.keys(contactsData).map(key => ({
        Uid: key,
        ...contactsData[key]
    }));
}

// post for contacts
async function postDataContacts(path = "", data = {}) {
    let response = await fetch(BASE_URL_Contact + path + ".json", {
        method: "POST",
        header: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)

    });
    return responseToJSon = await response.json();
}

// update contact
async function updateContactInFirebase(id, data) {
  const response = await fetch(`${BASE_URL_Contact}/${id}.json`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(
      `Fehler beim Aktualisieren des Kontakts: ${response.statusText}`
    );
  }

  return response.json();
}

//                              +++ BOARD +++

const BASE_URL_Board = "https://join-b197b-default-rtdb.europe-west1.firebasedatabase.app/tasks";

// load task's for board
async function loadDataBoards(path = "") {
    let response = await fetch(BASE_URL_Board + path + ".json");
    let localBoardContent = await response.json();

    allBoardContent = Object.keys(localBoardContent).map(key => ({
        Uid: key,
        ...localBoardContent[key]
    }));

    // renderBoardList();
}

// post task's for board
async function postDataBoards(path = "", data = {}) {
    let response = await fetch(BASE_URL_Board + path + ".json", {
        method: "POST",
        header: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)

    });
    return responseToJSon = await response.json();
}

// update subtasks
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
    throw new Error("Fehler beim Senden der Daten an Firebase");
  }
}

//                              +++ USER +++

const BASE_URL_USERS = "https://join-b197b-default-rtdb.europe-west1.firebasedatabase.app/users";

// load user
async function loadDataUsers(path = "") {
    let response = await fetch(BASE_URL_USERS + path + ".json");
    let responseToJson = await response.json();
    
    allUsers = Object.keys(responseToJson).map((key) => ({
      Uid: key,
      ...responseToJson[key],
    }));
}
// post users
async function postDataUsers(path = "", data = {}) {
    let response = await fetch(BASE_URL_USERS + path + ".json", {
        method: "POST",
        header: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)

    });
    return responseToJSon = await response.json();
}
