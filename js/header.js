window.addEventListener("load", () => {
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

function toggleMenu() {
  let menu = document.getElementById("headerSubMenu");
  if (menu) {
    menu.classList.toggle("hidden");
  }
}
