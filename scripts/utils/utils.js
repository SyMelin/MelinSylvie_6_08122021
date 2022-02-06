
function manageFocusOutline () {

    allTabindex0= Array.from(document.querySelectorAll('.tabindex0'));
    console.log(allTabindex0);

    window.addEventListener('click', (e) => {
        console.log(allTabindex0);
        allTabindex0.forEach((element) => {
            element.addEventListener('focus', (e) => {
                element.classList.remove('focusVisible');
            });
        });
    });
    
    window.addEventListener('keydown', (e) => {
        console.log(allTabindex0);
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