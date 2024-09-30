document.addEventListener('DOMContentLoaded', function() {
    w3.includeHTML(function() {
        let currentSite = window.location.pathname.toLowerCase().replace(/\/$/, '');
        let navigationLinks = document.querySelectorAll('.sideBar a');

        for(let i = 0; i < navigationLinks.length; i++) {
            let link = navigationLinks[i];
            let linkPath = new URL(link.href).pathname.toLowerCase().replace(/\/$/, '');
            if(linkPath === currentSite) {
                link.classList.add('activeNavigationPoint');
            }
        }
    });
});