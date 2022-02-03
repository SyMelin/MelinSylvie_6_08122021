class ModalContentFactory {

    constructor(type) {

        //const modalContent = document.querySelector(".modal__content");
        switch (type) {

            case 'contactForm' :
                const allTabindex0 = Array.from(document.getElementsByClassName("tabindex0"));
                allTabindex0.forEach((element) => {
                    element.removeAttribute("tabindex");
                });

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