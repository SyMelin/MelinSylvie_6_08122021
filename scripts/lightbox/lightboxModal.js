/* eslint-disable no-unused-vars */
export default class LightboxModal {

    create() {
        const modalContent = document.querySelector('.modal__content');
        modalContent.classList.add('modal--lightbox');

        const carousel = document.createElement('div');
        carousel.classList.add('carousel');
        carousel.setAttribute('tabindex', -1);

        //On ajoute au contenu de la modale le carrousel dont la création est effectué lors du pré-chargement de la modale lighbox cf: classe OpenTriggerLightbox.preloadModalLightbox(frame)
        modalContent.prepend(carousel);
    }
}