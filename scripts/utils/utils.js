//Personnalise le rendu du focus
function manageFocusOutline () {

    allTabindex0= Array.from(document.querySelectorAll('.tabindex0'));

    window.addEventListener('click', (e) => {
        allTabindex0.forEach((element) => {
            element.addEventListener('focus', (e) => {
                element.classList.remove('focusVisible');
            });
        });
    });
    
    window.addEventListener('keydown', (e) => {
        allTabindex0.forEach((element) => {
            element.addEventListener('focus', (e) => {
                element.classList.add('focusVisible');
            });
        });
    });
    allTabindex0.forEach((element) => {
        element.addEventListener('blur', (e) => {
            element.classList.remove('focusVisible');
        }); 
    });  
};