const prioButtons = document.querySelectorAll('#prio button');

for(i= 0; i<prioButtons.length; i++){
    prioButtons[i].addEventListener('click', (event)=>{
        const selectedButton = event.target;
        if(selectedButton.classList.contains('activePrio') === false){
            for(const button of prioButtons){
                if(button.classList.contains('activePrio')){
                    button.classList.remove('activePrio')
                };
            }
            selectedButton.classList.add('activePrio');
        }
    });
}