//Personnalise le rendu du focus
// eslint-disable-next-line no-unused-vars
export function manageFocusOutline () {

    // eslint-disable-next-line no-undef
    let allTabindex0= Array.from(document.querySelectorAll('.tabindex0'));

    // eslint-disable-next-line no-unused-vars
    window.addEventListener('click', (e) => {
        // eslint-disable-next-line no-undef
        allTabindex0.forEach((element) => {
            // eslint-disable-next-line no-unused-vars
            element.addEventListener('focus', (e) => {
                element.classList.remove('focusVisible');
            });
        });
    });
    
    // eslint-disable-next-line no-unused-vars
    window.addEventListener('keydown', (e) => {
        // eslint-disable-next-line no-undef
        allTabindex0.forEach((element) => {
            // eslint-disable-next-line no-unused-vars
            element.addEventListener('focus', (e) => {
                element.classList.add('focusVisible');
            });
        });
    });
    // eslint-disable-next-line no-undef
    allTabindex0.forEach((element) => {
        // eslint-disable-next-line no-unused-vars
        element.addEventListener('blur', (e) => {
            element.classList.remove('focusVisible');
        }); 
    });  
}