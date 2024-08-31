function onloadFunctionData(){
    loadDataContacts("");
    loadDataBoards("");
    loadDataUsers("");
}
// link for contacts
const BASE_URL_Contact = "https://join-b197b-default-rtdb.europe-west1.firebasedatabase.app/contacts";

// load for contacts
async function loadDataContacts(path=""){
    let response = await fetch(BASE_URL_Contact + path + ".json");
    let responseToJson = await response.json();
    console.log("Contacts:");
    console.log(responseToJson);
}

// link for task for board
const BASE_URL_Board = "https://join-b197b-default-rtdb.europe-west1.firebasedatabase.app/tasks";

// load for task for board
async function loadDataBoards(path=""){
    let response = await fetch(BASE_URL_Board + path + ".json");
    let responseToJson = await response.json();
    console.log("Task's for Board:");
    console.log(responseToJson);
}

// link for users
const BASE_URL_USERS = "https://join-b197b-default-rtdb.europe-west1.firebasedatabase.app/users";

// load for task for board
async function loadDataUsers(path=""){
    let response = await fetch(BASE_URL_USERS + path + ".json");
    let responseToJson = await response.json();
    console.log("Users:");
    console.log(responseToJson);
}