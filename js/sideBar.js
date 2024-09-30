document.addEventListener('DOMContentLoaded', function () {
    w3.includeHTML(function () {
        let currentSite = window.location.pathname.toLowerCase().replace(/\/$/, '');
        console.log(`Current site: ${currentSite}`);

        // Select all sidebar links (both normal and mobile)
        let allLinks = document.querySelectorAll('.sideBar a, .mobileSideBar a');

        for (let i = 0; i < allLinks.length; i++) {
            let link = allLinks[i];
            let linkPath = new URL(link.href).pathname.toLowerCase().replace(/\/$/, '');
            console.log(`Checking link: ${linkPath}`);

            if (linkPath === currentSite) {
                if (link.closest('.sideBar')) {
                    link.classList.add('activeNavigationPoint');
                    console.log(`Active Navigation Point added to: ${link.href}`);
                } else if (link.closest('.mobileSideBar')) {
                    link.classList.add('activeMobileNavigationPoint');
                    console.log(`Active Mobile Navigation Point added to: ${link.href}`);
                }
            }
        }
    });
});