let differentColors = [
  "#FF7A00",
  "#FF5EB3",
  "#6E52FF",
  "#9327FF",
  "#00BEE8",
  "#1FD7C1",
  "#FF745E",
  "#FFA35E",
  "#FC71FF",
  "#FFC701",
  "#0038FF",
  "#C3FF2B",
  "#FFE62B",
  "#FF4646",
  "#FFBB2B",
];

/**
 * Returns a random color from the predefined list of colors.
 *
 * @returns {string} A randomly selected color in hexadecimal format.
 */
function getRandomColor() {
  let randomIndex = Math.floor(Math.random() * differentColors.length);
  return differentColors[randomIndex];
}

/**
 * Extracts the initials from a given name.
 *
 * @param {string} name - The full name from which to extract initials.
 * @returns {string} The initials derived from the name.
 */
function getInitials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
}

/**
 * Toggles the background of a contact element by adding an active class
 * and removing it from all other contact elements.
 *
 * @param {HTMLElement} element - The contact element to be activated.
 */
function toggleBackground(element) {
  let contacts = document.querySelectorAll(".single_contact");
  contacts.forEach(function (contact) {
    contact.classList.remove("active");
  });

  element.classList.add("active");
}

/**
 * Toggles the visibility of a popup modal and its overlay.
 *
 * @param {string} popupOverlayId - The ID of the popup overlay element.
 * @param {string} popupModalId - The ID of the popup modal element.
 * @param {boolean} [show=true] - A flag indicating whether to show or hide the popup.
 */
function togglePopup(popupOverlayId, popupModalId, show = true) {
  const popupOverlay = document.getElementById(popupOverlayId);
  const popupModal = document.getElementById(popupModalId);

  popupOverlay.style.display = show ? "flex" : "none";
  popupModal.classList.toggle("show", show);
  popupModal.classList.toggle("hide", !show);

  if (show) {
    popupModal.style.display = "block";
  } else {
    setTimeout(() => {
      popupModal.style.display = "none";
    }, 120);
  }
}

/**
 * Opens the popup modal by calling the togglePopup function with the show parameter set to true.
 */
function openPopup() {
  togglePopup("popupOverlay", "popupModal", true);
}

/**
 * Closes the popup modal by calling the togglePopup function with the show parameter set to false.
 */
function closePopup() {
  togglePopup("popupOverlay", "popupModal", false);
}

/**
 * Navigates the user back to the previous page, or to the index page if no referrer exists.
 */
function goBack() {
  const referrer = document.referrer;
  if (referrer) {
    window.location.href = referrer;
  } else {
    window.location.href = "login.html";
  }
}

/**
 * Checks if a user is logged in by verifying the presence of a logged-in user in local storage.
 * If no user is logged in, redirects to the index page.
 */
function checkLogin() {
  if (!localStorage.getItem("loggedInUser")) {
    window.location.href = "login.html";
  }
}
