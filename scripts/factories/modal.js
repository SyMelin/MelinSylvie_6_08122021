// La classe Modal génère des modales selon leur type.
// Elle permet également de gérer les éléments communs aux différents types de modale.
// Elle contient éga
class Modal {

    /**
     * @param {string} id id de la modale à créer
     * @param {string} type type de modale à créer
     */

    constructor (id, type) {
        this._id = id;
        this._type = type;
    }

    createModal () {
        
        const modal = document.querySelector(".modal")
        modal.setAttribute("id", this._id);

        const allTabindex0 = Array.from(document.getElementsByClassName("tabindex0"));

        let modalContent = document.querySelector(".modal__content");
        let closeBtn =  document.querySelector(".modal__content .closeBtn");

        switch (this._type) {

            case 'contactForm' :

                allTabindex0.forEach((element) => {
                    element.removeAttribute("tabindex");
                });

                const fields = [
                    { 
                        label : 'firstame',
                        type : 'text',
                        className: 'text',
                        text: 'Prénom',
                        minlength: '2'
                    },
                    {
                        label : 'lastame',
                        type : 'text',
                        className: 'text',
                        text: 'Nom',
                        minlength: '2'
                    },
                    {
                        label : 'email',
                        type : 'email',
                        className: 'text',
                        text: 'Email'
                    },
                    {
                        label : 'message',
                        type : 'textarea',
                        className: 'text-area',
                        text: 'Votre message',
                        maxlength: '1000'
                    }
                ];

                let contactFormModal = new ContactFormModal("post", "", photographerProfile, fields);
                contactFormModal.create();
                closeBtn.setAttribute("onclick", "closeContactFormModal()");
                closeBtn.setAttribute("aria-label", "Close Contact form");
                closeBtn.setAttribute("tabindex", "0");

                modal.style.height = "100%";
                modal.setAttribute("aria-labelledby", "contact-title");
                modal.setAttribute("tabindex", "1");
               // modalContent.setAttribute("tabindex", "-1");
    
            break;

            case 'lightbox' :

                allTabindex0.forEach((element) => {
                    if (element.classList.contains("inMain")){
                        element.removeAttribute("tabindex");
                    };
                }); 
                
                let lightboxModal = new LightboxModal();
                lightboxModal.create();
                closeBtn.setAttribute("onclick", "closeLightboxModal()");
                closeBtn.setAttribute("aria-label", "Close dialog");
                closeBtn.setAttribute("tabindex", "0");

                modal.style.height = "auto";
                modal.setAttribute("aria-label", "image closeup view");
                modal.setAttribute("tabindex", "1");
               // modalContent.setAttribute("tabindex", "-1");

            break;
        };
    };
};