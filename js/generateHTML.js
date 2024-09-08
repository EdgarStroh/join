function generateLetterSectionHTML(letter) {
    return `
        <div class="letter_section">
            <h3>${letter}</h3> 
            <img src="../assets/icons/seperator_contacts.svg" alt="Seperator">
        </div>
    `;
}

function generateContactContent(name, email, id, color, uid) {
    return `
        <div id="${uid}" onclick="toggleBackground(this); openContact(${id})" class="single_contact flex">
            <div class="profil_badge flex">
                <span style="background-color: ${color}">${getInitials(name)}</span> 
            </div>
            <div class="contact_info flex">
                <h3>${name}</h3> 
                <p>${email}</p> 
            </div>
        </div>
    `;
}

function generateExtendedContact(name, email, phone, color, Uid, id) {
    return `
    <div class="contact_headline flex">
    <div class="contact_content_extended flex">
        <span class="profil_badge_extended flex" style="background-color:${color}">${getInitials(name)}</span>
        <div class="contact_info_extended flex">
        <h3>${name}</h3>
        <div class="contact_tools flex">
            <div onclick="openEditContact(${id})" class="edit flex">
                <img src="../assets/icons/edit.svg" alt="Icon edit">
                <span>Edit</span>
            </div>
            <div onclick="deleteDataContact('${Uid}')" class="delete flex">
                <img src="../assets/icons/delete.svg" alt="Icon delete">
                <span>Delete</span>
            </div>
        </div>
    </div>
    </div>

    <h4>Contact Information</h4>
            <div class="contact_details flex">
                <p>Email</p>
                <p>${email}</p>
                <p>Phone</p>
                <p>${phone}</p>
            </div>
</div>`;
}

function generateEditContact(contact) {
    return `
        <div class="flex">
            <div class="popup-bg">
                <img class="popupLogo" src="../assets/img/logo.svg">
                <h1 class="white">Edit contact</h1>
                <img class="underline" src="../assets/icons/vector_login.svg">
            </div>
            <div class="popup-Right-Side-Content">
                <div class="close_container">
                    <img class="close" onclick="closeEditContact()" src="../assets/icons/close.svg" alt="Icon close">
                </div>
                <img class="profileImg" src="../assets/img/profileImg.svg">
                <div class="popup-Right-Side">
                    <form>
                        <div class="input_login flex">
                            <input class="name" type="text" id="inputEditName" placeholder="Name" value="${contact.name}" required>
                            <input class="email" type="email" id="inputEditEmail" placeholder="Email" value="${contact.email}" required>
                            <input class="phone" type="tel" id="inputEditPhone" placeholder="Phone" value="${contact.phone}" required>
                        </div>
                        <div class="button-line flex">
                            <button type="button" class="button-white" onclick="closeEditContact()">Cancel <img src="../assets/icons/cancel.svg" alt="Icon cancel"></button>
                            <button type="button" class="button-DB" onclick="editContact('${contact.Uid}')">Save <img src="../assets/icons/create.svg" alt="Icon create"></button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;
}function generateBoardContent(board, element) {
  return `
        <div class="boardCard flex" draggable="true" ondragstart="startDragging(${element})">
            <span class="boardCategory bc1">${board.category}</span>
            <div class="boardText flex">
                <span class="bc2">${board.title}</span>
                <span class="bc3">${board.description}</span>
            </div>
            <div>
               ${board.subtasks}
                <!-- Placeholder for users and icon -->
                <span>Users and Icon</span>
            </div>
        </div>
    `;
}