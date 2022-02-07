/** La classe OpenTriggerFactory génère les éléments qui déclenchnte l'ouverure des modales selon leur type.
 *  Elle est accompagnée de sa sous-class générale OpenTrigger
*/


class OpenTriggerFactory {

    /** 
     * @param {string} type type de modale à créer
     */

    constructor(type) {
        switch(type) {
            case 'contactForm' :
                const contactButton = new OpenTriggerContactButton(type);
                contactButton.set();
            break;
            case 'lightbox' :
                const frameAll = new OpenTriggerLightbox(type);
                frameAll.set();
            break;
        };
    }    
};



class OpenTrigger {

    /**
     * @param {string} type type de modale à créer
     */
    
    constructor(type) {
        this._type = type;
    }

    displayModal() {
        const modal = document.querySelector('.modal');
        ['modal--close', 'modal--open'].map(element => modal.classList.toggle(element));
        modal.setAttribute('aria-hidden', false);
        document.querySelector('.modal').focus(); //met le focus sur la modale une fois cette dernière ouverte
      
        const header = document.getElementById('header');
        const main = document.getElementById('main');
        header.setAttribute('aria-hidden', true);
        main.setAttribute('aria-hidden', true);
    };
};