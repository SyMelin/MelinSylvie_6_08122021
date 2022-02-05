class LightboxModal {

    create() {
        const modalContent = document.querySelector('.modal__content');
        modalContent.classList.add('modal--lightbox');

        const carousel = document.createElement('div');
        carousel.classList.add('carousel');
        carousel.setAttribute('tabindex', -1);

        modalContent.prepend(carousel);
    };
};