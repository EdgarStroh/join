document.addEventListener("DOMContentLoaded", function () {
  w3.includeHTML(function () {
    const currentSite = window.location.pathname;
    const allLinks = document.querySelectorAll(".sideBar a, .mobileSideBar a");

    allLinks.forEach((link) => {
      const linkPath = new URL(link.href).pathname;
      if (linkPath === currentSite) {
        addActiveClass(link);
      }
    });
  });
});

/**
 * Adds an active class to the specified link based on its parent sidebar.
 *
 * @param {HTMLElement} link - The link element to which the active class will be added.
 */
function addActiveClass(link) {
  if (link.closest(".sideBar")) {
    link.classList.add("activeNavigationPoint");
  } else if (link.closest(".mobileSideBar")) {
    link.classList.add("activeMobileNavigationPoint");
  }
}
