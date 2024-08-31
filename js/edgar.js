function onloadFunctionData() {
    // + LOAD +
    loadDataContacts("");
    loadDataBoards("");
    loadDataUsers("");

    // + POST +

    // postDataContacts("", {
    //     "email": "test@hotmail.com",
    //     "phone": "1234/56789"
    // });

    // postDataBoards("", {
    //     "asigned": { 
    //         "name": "ka" 
    //     },
    //     "category": "", 
    //     "date": "", 
    //     "description": "", 
    //     "prio": "", 
    //     "status": "", 
    //     "subtasks": {
    //         "0": { "done": "", "goal": "" },  
    //         "1": { "done": "", "goal": "" },  
    //         "2": { "done": "", "goal": "" }
    //     },
    //     "title": ""             
    // });

    // postDataUsers("", {
    //     "id": "testID",
    //     "color": "#testColor",
    //     "email": "bla@blub.de",
    //     "name": "Son Goku",
    //     "phone": "1111/22222"
    // });

}

//                              +++ CONTACT +++
// link for contacts
const BASE_URL_Contact = "https://join-b197b-default-rtdb.europe-west1.firebasedatabase.app/contacts";


// load for contacts
async function loadDataContacts(path = "") {
    let response = await fetch(BASE_URL_Contact + path + ".json");
    let responseToJson = await response.json();
    console.log("Contacts:");
    console.log(responseToJson);
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

//                              +++ BOARD +++
// link for task for board
const BASE_URL_Board = "https://join-b197b-default-rtdb.europe-west1.firebasedatabase.app/tasks";

// load task's for board
async function loadDataBoards(path = "") {
    let response = await fetch(BASE_URL_Board + path + ".json");
    let responseToJson = await response.json();
    console.log("Task's for Board:");
    console.log(responseToJson);
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

//                              +++ USER +++
// link for users
const BASE_URL_USERS = "https://join-b197b-default-rtdb.europe-west1.firebasedatabase.app/users";

// load user
async function loadDataUsers(path = "") {
    let response = await fetch(BASE_URL_USERS + path + ".json");
    let responseToJson = await response.json();
    console.log("Users:");
    console.log(responseToJson);
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