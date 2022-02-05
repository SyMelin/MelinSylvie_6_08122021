class ModalContentFactory {

    constructor(type) {

        switch (type) {

            case 'contactForm' :
                let contactFormModal = new ContactFormModal(type, "post", "", photographerProfile);
                contactFormModal.create();
            break;

            case 'lightbox' :
                let lightboxModal = new LightboxModal();
                lightboxModal.create();
            break;
         };
    };
};