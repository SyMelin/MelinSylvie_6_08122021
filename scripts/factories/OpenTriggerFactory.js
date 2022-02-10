/* eslint-disable no-undef */
/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
/** La classe OpenTriggerFactory génère les éléments qui déclenchnte l'ouverure des modales selon leur type.
 *  Elle est accompagnée de sa sous-class générale OpenTrigger
*/

import OpenTriggerContactButton from "../contactForm/openTriggerContactForm.js";
import OpenTriggerLightbox from "../lightbox/openTriggerLightbox.js";

export default class OpenTriggerFactory {

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
        }
    }    
}