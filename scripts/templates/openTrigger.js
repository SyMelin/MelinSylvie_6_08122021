/* eslint-disable no-unused-vars */
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
    }
}