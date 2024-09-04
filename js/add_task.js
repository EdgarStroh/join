//prio buttons

let priority = "";

let prioButtons = document.querySelectorAll('#prio button');

for (let i = 0; i < prioButtons.length; i++) {
    prioButtons[i].addEventListener('click', (event) => {
        const selectedButton = event.currentTarget;
        priority = event.currentTarget.value;
        const activePrioClass = selectedButton.getAttribute('id') + 'Active';
        const activeButtonBool = selectedButton.classList.contains(activePrioClass);

        if (!activeButtonBool) {
            // Remove the active class from all buttons
            prioButtons.forEach(button => {
                const buttonActiveClass = button.getAttribute('id') + 'Active';
                if (button.classList.contains(buttonActiveClass)) {
                    button.classList.remove(buttonActiveClass);
                    console.log("active prio class should be removed");
                    document.getElementById(button.getAttribute('id') + 'Img').src = '../assets/icons/' + button.getAttribute('id') + '.svg';
                }
            });

            // Add active class to the selected button
            selectedButton.classList.add(activePrioClass);
            document.getElementById(selectedButton.getAttribute('id') + 'Img').src = '../assets/icons/' + selectedButton.getAttribute('id') + 'Selected.svg';
        } else {
            // Remove active class if the same button is clicked again
            selectedButton.classList.remove(activePrioClass);
            document.getElementById(selectedButton.getAttribute('id') + 'Img').src = '../assets/icons/' + selectedButton.getAttribute('id') + '.svg';
        }
    });
}

//contacts

// link for contacts
const BASE_URL_Contact = "https://join-b197b-default-rtdb.europe-west1.firebasedatabase.app/contacts";

// load for contacts
async function loadDataContacts(path = "") {
    let response = await fetch(BASE_URL_Contact + path + ".json");
    let contactsData = await response.json();
    // Convert the Firebase object to an array of contacts
    return allContacts = Object.keys(contactsData).map(key => contactsData[key]);
}

let contactSelection = document.getElementById('contactSelection');
let contactList = document.getElementById('contactList');
let contact = document.querySelectorAll('.contact');

//render contacts
async function renderContactList(){
    const contacts = await loadDataContacts();
    for(i = 0; i < contacts.length; i++){
        const firstLetter = contacts[i]['name'][0];
        const spaceIndex = contacts[i]['name'].indexOf(' ');
        const firstLetterAfterSpace = contacts[i]['name'][spaceIndex+1];
        contactList.innerHTML += `
                <div class='contact flex' onclick='addTaskContact(event)'>
                    <div class='flex'>
                        <span class='circle flex' style='background:${contacts[i]['color']}'>${firstLetter+firstLetterAfterSpace}</span>
                        <span>${contacts[i]['name']}</span>
                    </div>
                    <input type="checkbox" value="${contacts[i]}">
                </div>
        `;
    }
}

renderContactList();

function toggleContactListView(){
    contactList.classList.toggle('hidden');
};

//adds the possibility to click beside the checkbox
function addTaskContact(event){
    if(event.target.type !== 'checkbox'){
        let checkbox = event.currentTarget.querySelector('input[type="checkbox"]');
        if(checkbox.checked === true){
            checkbox.checked = false;
        } else {
            checkbox.checked = true;
        }
        event.currentTarget.classList.toggle('selectedContact');
    }
}

//form handling

let addTaskForm =  document.getElementById('addTaskForm');
let title = document.getElementById('title');
let date = document.getElementById('date');
let description = document.getElementById('description');
let category = document.getElementById('category');


addTaskForm.addEventListener('submit', (event)=>{
    event.preventDefault();
    let selectedContacts = document.querySelectorAll('#contactList .contact input[type="checkbox"]:checked');
    console.log(title.value);
    console.log(date.value);
    console.log(description.value);
    console.log(category.value);
    console.log(priority);
    for(i=0; i<selectedContacts.length; i++){
        console.log(selectedContacts[i].value);
    }
});