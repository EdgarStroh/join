window.addEventListener('load', ()=>{
    let profileName = document.getElementById('profileName');
    let headerSubMenu = document.getElementById('headerSubMenu');
    function returnNameInitials(){
        let userName = localStorage.getItem('inputName') || "Guest";
        let string;
        if(userName === undefined){
            string = userName.substring(0,1);
        } else{
            let spacePosition = userName.indexOf(' ');
            string = userName.substring(spacePosition+1, spacePosition+2);
        }
        return string;
    }
    profileName.innerHTML = returnNameInitials();
    profileName.addEventListener('click', ()=>{
        headerSubMenu.classList.toggle('hidden');
    })
})