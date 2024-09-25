async function updateContacts() {
  await loadDataContacts("");
  renderContactList();
}

function openContact(id) {
  renderExtendedContact(id);
  toggleMenuMobile(id);
}

function addContact() {
  let contactData = getContactFormData();
  postDataContacts("", contactData);
  resetContactForm();
  closePopup();
  showPopupContact();
  updateContacts();
}

function getContactFormData() {
  return {
    name: document.getElementById("inputName").value,
    email: document.getElementById("inputEmail").value,
    phone: document.getElementById("inputPhone").value,
    color: getRandomColor(),
  };
}

function resetContactForm() {
  document.getElementById("inputName").value = "";
  document.getElementById("inputEmail").value = "";
  document.getElementById("inputPhone").value = "";
}

function addContactMobile() {
  let contactData = getContactFormDataMobile();
  postDataContacts("", contactData);
  resetContactForm();
  closePopup();
  showPopupContact();
  updateContacts();
}

function getContactFormDataMobile() {
  return {
    name: document.getElementById("inputNameMobile").value,
    email: document.getElementById("inputEmailMobile").value,
    phone: document.getElementById("inputPhoneMobile").value,
    color: getRandomColor(),
  };
}

function resetContactFormMobile() {
  document.getElementById("inputNameMobile").value = "";
  document.getElementById("inputEmailMobile").value = "";
  document.getElementById("inputPhoneMobile").value = "";
}

function renderExtendedContact(id) {
  let extendedContact = document.getElementById("extended_contact");

  extendedContact.innerHTML = "";
  extendedContact.classList.remove("slideIn", "show");

  extendedContact.innerHTML += generateExtendedContact(
    allContacts[id].name,
    allContacts[id].email,
    allContacts[id].phone,
    allContacts[id].color,
    allContacts[id].Uid,
    id
  );

  setTimeout(() => {
    extendedContact.classList.add("slideIn", "show");
  }, 10);
}

function renderContactList() {
  let contactsContainer = document.getElementById("contacts");
  contactsContainer.innerHTML = "";

  let currentLetter = "";
  let html = "";

  allContacts = Object.values(allContacts).sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  allContacts.forEach((contact, id) => {
    const firstLetter = contact.name.charAt(0).toUpperCase();

    if (firstLetter !== currentLetter) {
      currentLetter = firstLetter;
      html += generateLetterSectionHTML(currentLetter);
    }

    html += generateContactContent(
      contact.name,
      contact.email,
      id,
      contact.color
    );
  });

  contactsContainer.innerHTML = html;
}
function openPopupMobile() {
  const popupOverlay = document.getElementById("popupOverlayMobile");
  const popupModal = document.getElementById("popupModalMobile");

  popupOverlay.style.display = "flex";
  popupModal.style.display = "block";
  // popupModal.style.opacity = "1";
  // Entferne die `hide`-Klasse (falls vorhanden) und füge die `show`-Klasse hinzu
  popupModal.classList.remove("hide");
  popupModal.classList.add("show");

}
function closePopupMobile() {
  document.getElementById("popupOverlayMobile").style.display = "none";
  document.getElementById("popupModalMobile").style.display = "none";
}

function showPopupContact() {
  const overlay = document.getElementById("popupOverlay");
  const success = document.getElementById("popupContactSuccess");

  overlay.style.display = "flex";
  success.style.display = "flex";
  success.style.opacity = "0";

  setTimeout(() => {
    success.style.opacity = "1";
  }, 1);

  setTimeout(function () {
    closePopupSuccess();
  }, 1250);
}

function closePopupSuccess() {
  document.getElementById("popupOverlay").style.display = "none";
  document.getElementById("popupContactSuccess").style.display = "none";
  loadDataUsers("");
}

function mobileShowContact() {
  if (window.innerWidth < 800) {
    document.getElementById("contact_list").style.display = "none";
    document.getElementById("headline_contacts").style.display = "flex";
    document.getElementById("arrow_left_contact").style.display = "flex";
    document.getElementById("headline_contacts").style.left = "auto";
    document.getElementById("headline_contacts").style.width = "100%";
    document.getElementById("headline_contacts").style.height = "auto";
    document.getElementById("mobileAddButton").style.display = "none";
    document.getElementById("renderEditDelete").style.display = "flow";

  }
}

function mobileShowContactReverse() {
  document.getElementById("contact_list").style.display = "flex";
  document.getElementById("headline_contacts").style.display = "none";
  document.getElementById("arrow_left_contact").style.display = "none";
  document.getElementById("mobileAddButton").style.display = "flow";
  document.getElementById("renderEditDelete").style.display = "none";
  let menu = document.getElementById("mobileSubMenu");
  if (menu && !menu.classList.contains("hidden")) {
    menu.classList.add("hidden");
  }
}



// window.addEventListener("load", () => {
//   let mobileMenuIcon = document.getElementById("mobileMenuIcon");

//   if (mobileMenuIcon) {
//     // Call the correct function toggleMenuMobile, not toggleMenu
//     mobileMenuIcon.addEventListener("click", toggleMenuMobile);
//   } else {
//     console.error("Das Menü-Icon wurde nicht gefunden.");
//   }
// });
