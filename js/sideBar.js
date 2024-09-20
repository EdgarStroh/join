let currentSite = window.location.pathname;
let navigationLinks = document.querySelectorAll('.sideBar a');
// console.log(navigationLinks);

for(let i = 0; i < navigationLinks.length; i++){
    let link = navigationLinks[i];
    if(link.href.includes(currentSite)){
        link.classList.add('activeNavigationPoint');
    }
}

function logout(){
    localStorage.clear();
}