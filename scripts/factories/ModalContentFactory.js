class ModalContentFactory {

    constructor(type) {

        switch (type) {

            case 'contactForm' :
                let contactFormModal = new ContactFormModal(type, 'post', "", photographerProfile);
                contactFormModal.create();
            break;

            case 'lightbox' :
                let lightboxModal = new LightboxModal();
                lightboxModal.create();

                allTabindex0 = Array.from(document.getElementsByClassName('tabindex0'));
                console.log(allTabindex0);
                allTabindex0.forEach((element) => {
                    if (element.classList.contains('inMain')){
                        element.removeAttribute('tabindex');
                    };
                console.log(allTabindex0);
                });
            break;
         };
    };
};