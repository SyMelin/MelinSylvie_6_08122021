class ModalContentFactory {

    constructor(type) {

        //const modalContent = document.querySelector(".modal__content");
        switch (type) {

            case 'contactForm' :
                let contactFormModal = new ContactFormModal(type, "post", "", photographerData.profile);
                contactFormModal.create();
            break;

            case 'lightbox' :
                let lightboxModal = new LightboxModal();
                lightboxModal.create();
            break;
         };
    };
};