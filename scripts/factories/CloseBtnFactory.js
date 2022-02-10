/* eslint-disable no-undef */
/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
/** La classe CloseBtnFactory génère le bouton de fermeture des modales selon leur type.
 *  Elle est accompagnée de sa sous-classe générale CloseBtn
*/

import CloseBtnContactForm from "../contactForm/closeBtnContactForm.js";
import CloseBtnLightbox from "../lightbox/closeBtnLightbox.js";


export default class CloseBtnFactory {

    /**
     * @param {string} type type de modale à créer
     */

    constructor(type) {

        switch (type) {
            case 'contactForm' :
                // eslint-disable-next-line no-case-declarations
                // eslint-disable-next-line no-undef
                let closeBtnContactForm = new CloseBtnContactForm(type);
                closeBtnContactForm.set();
            break;
            case 'lightbox' :
                let closeBtnLightbox = new CloseBtnLightbox(type);
                closeBtnLightbox.set(); 
            break;
        }
    } 
}