/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import { manageFocusOutline } from "../utils/utils.js";


export default class CloseBtnContactForm extends CloseBtn {

    /**
     * @param {string} type type de modale à créer
     */

    constructor (type) {
        super(type)
    }

    set() {

        let closeBtn =  document.querySelector('.modal__content .closeBtn');
        closeBtn.setAttribute('aria-label', 'Close Contact form');
        closeBtn.setAttribute('tabindex', 0);
        closeBtn.classList.add('tabindex0');

        // Fermeture de la modale au clic sur closeBtn
        closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.closeContactFormModal(e);
        });


        // Fermeture de la modale via la touche Enter sur closeBtn
        closeBtn.addEventListener('keyup', (e) => {
            e.preventDefault();
            if (e.key === "Enter") {
                this.closeContactFormModal(e);
            }
        });

        // Fermeture de la modale via la touche Echap
        window.addEventListener('keyup', (e) => {
            e.preventDefault();
            if (e.key === "Escape") {
                this.closeContactFormModal(e);
            }
        });
    }

    prepareBeforeClosingContactForm() {
        const modal = document.querySelector('.modal');
        modal.removeAttribute('aria-labelledby');
        const modalContent = document.querySelector('.modal .modal__content');
        modalContent.classList.remove("modal--contact-form");
    
        // Le bouton contact du header récupère le focus à la fermeture du formulaire de contact
        const contactBtn = document.querySelector('.photograph-header .contact-button');
        contactBtn.focus();
    }

    initContactFormModal() {
        this.prepareBeforeClosingContactForm();
        this.closeModal(); //méthode de la classe CloseBtn
    }

    closeContactFormModal(event){
        const modal = document.getElementById('contact-modal');
        if (modal) {
            const modalState = modal.getAttribute('aria-hidden');
            if (modalState == "false") {
                event.preventDefault();
                this.initContactFormModal();
            }
        }
        //On réinitialise la personnalisation du focus
        manageFocusOutline();
    }
}