document.addEventListener('DOMContentLoaded', function() {
    w3.includeHTML(function() {
        let currentSite = window.location.pathname.toLowerCase().replace(/\/$/, '');
        let mobileLinks = document.querySelectorAll('.mobileSideBar a');

        for(let i = 0; i < mobileLinks.length; i++) {
            let mobileLink = mobileLinks[i];
            let mobileLinkPath = new URL(mobileLink.href).pathname.toLowerCase().replace(/\/$/, '');
            if(mobileLinkPath === currentSite) {
                mobileLink.classList.add('activeMobileNavigationPoint');
            }
        }
    });
});