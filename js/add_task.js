let prioButtons = document.querySelectorAll('#prio button');

for (let i = 0; i < prioButtons.length; i++) {
    prioButtons[i].addEventListener('click', (event) => {
        const selectedButton = event.currentTarget;
        const activePrioClass = selectedButton.getAttribute('id') + 'Active';
        const activeButtonBool = selectedButton.classList.contains(activePrioClass);

        if (!activeButtonBool) {
            // Remove the active class from all buttons
            prioButtons.forEach(button => {
                const buttonActiveClass = button.getAttribute('id') + 'Active';
                if (button.classList.contains(buttonActiveClass)) {
                    button.classList.remove(buttonActiveClass);
                    console.log("active prio class should be removed");
                    document.getElementById(button.getAttribute('id') + 'Img').src = '../assets/icons/' + button.getAttribute('id') + '.svg';
                }
            });

            // Add active class to the selected button
            selectedButton.classList.add(activePrioClass);
            document.getElementById(selectedButton.getAttribute('id') + 'Img').src = '../assets/icons/' + selectedButton.getAttribute('id') + 'Selected.svg';
        } else {
            // Remove active class if the same button is clicked again
            selectedButton.classList.remove(activePrioClass);
            document.getElementById(selectedButton.getAttribute('id') + 'Img').src = '../assets/icons/' + selectedButton.getAttribute('id') + '.svg';
        }
    });
}