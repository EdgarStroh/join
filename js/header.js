window.addEventListener("load", () => {
  /**
   * Initializes the profile name and sets up the click event for the profile name element.
   * Displays the user's initials and toggles the visibility of the header submenu.
   */
  let profileName = document.getElementById("profileName");
  let headerSubMenu = document.getElementById("headerSubMenu");

  if (profileName && headerSubMenu) {
    let userName = localStorage.getItem("loggedInUser") || "Guest";

    profileName.innerHTML = getInitials(userName).toUpperCase();
    profileName.addEventListener("click", () => {
      headerSubMenu.classList.toggle("hidden");
    });
  } else {
    console.error("Profilname oder Menü nicht gefunden.");
  }
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
