/**
 * Sets up event listeners and initializes the profile name display when the window loads.
 * A periodic check ensures that the necessary DOM elements are available before initializing.
 */
window.addEventListener("load", () => {
  let checkInterval = setInterval(() => {
    let profileName = document.getElementById("profileName");
    let headerSubMenu = document.getElementById("headerSubMenu");

    if (profileName && headerSubMenu) {
      let userName = localStorage.getItem("loggedInUser") || "Guest";

      // Set the profile name to the initials of the logged-in user (or 'Guest')
      profileName.innerHTML = getInitials(userName).toUpperCase();

      // Toggle the submenu visibility when the profile name is clicked
      profileName.addEventListener("click", () => {
        headerSubMenu.classList.toggle("hidden");
      });

      // Stop the interval once the elements are initialized
      clearInterval(checkInterval);
    }
  }, 100);
});

/**
 * Toggles the visibility of the header submenu.
 */
function toggleMenu() {
  let menu = document.getElementById("headerSubMenu");
  if (menu) {
    menu.classList.toggle("hidden");
  }
}

/**
 * Logs the user out by clearing local storage and redirecting to the login page.
 */
function logout() {
  localStorage.clear(); // Clears all data from local storage
  window.location.href = "login.html"; // Redirects the user to the login page
}
