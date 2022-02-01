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
        

        let modalContent = document.querySelector(".modal__content");
        let closeBtn =  document.querySelector(".modal__content .closeBtn");

        switch (this._type) {

            case 'contactForm' :

                const allTabindex0 = [].slice.call(document.getElementsByClassName("tabindex0"));
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
                
                let lightboxModal = new LightboxModal();
                lightboxModal.create();
                closeBtn.setAttribute("onclick", "closeLightboxModal()");
                closeBtn.setAttribute("aria-label", "Close dialog");
                closeBtn.setAttribute("tabindex", "0");

                modal.style.height = "auto";
                modal.setAttribute("aria-label", "image closeup view");
                modal.setAttribute("tabindex", "1");
               // modalContent.setAttribute("tabindex", "-1");

                const main = document.getElementById("main");
                main.classList.add("hidden");

            break;
        };
    };
};


function displayModal() {

    const modal = document.querySelector(".modal");
	modal.style.display = "block";
    modal.setAttribute("aria-hidden", false);
    document.querySelector(".modal").focus();//met le focus sur la modale une fois cette dernière ouverte
  
    const header = document.getElementById("header");
    const main = document.getElementById("main");
    header.setAttribute("aria-hidden", true);
    main.setAttribute("aria-hidden", true);
   
};


function closeModal() {

    //On rend la modale inaccessible
    const modal = document.querySelector(".modal");
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", true);

    //On vide le contenu de la modale de tout ses éléments sauf le bouton close
    const modalContent = document.querySelector(".modal__content");
    const children = [].slice.call(modalContent.children);
    let closeBtn =  document.querySelector(".modal__content .closeBtn");
    children.forEach((child) => {
        if (child != closeBtn) {
            modalContent.removeChild(child);
        };
    });

    //On rend accessible le reste de la page
    const header = document.getElementById("header");
    const main = document.getElementById("main");
    header.setAttribute("aria-hidden", false);
    main.setAttribute("aria-hidden", false);

    //On rétablit les tabindex = 0 sur les éléments concernés
    const allTabindex0 = [].slice.call(document.getElementsByClassName("tabindex0"));
    allTabindex0.forEach((element) => {
        element.setAttribute("tabindex", 0);
    });

    //On établit de retour la modale par défaut
    modal.removeAttribute("id");
    closeBtn.removeAttribute("onclick");
};