/* eslint-disable no-undef */
/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
/** La classe ModalContentFactory génère le contenu des modales selon leur type.
*/


class ModalContentFactory {

    /**
     * @param {string} type type de modale à créer
     */

    constructor(type) {

        switch (type) {

            case 'contactForm' :
                let contactFormModal = new ContactFormModal(type, 'post', "", photographerProfile);
                contactFormModal.create();
            break;

            case 'lightbox' :
                let lightboxModal = new LightboxModal();
                lightboxModal.create();

                //On enlève la possibilité de focus sur les éléments concernés
                allTabindex0 = Array.from(document.getElementsByClassName('tabindex0'));
                allTabindex0.forEach((element) => {
                    if (element.classList.contains('inMain')){
                        element.removeAttribute('tabindex');
                    }
                });
            break;
         }
    }
}