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
        

        let modalContent = document.querySelector(".modalContent");
        let closeBtn =  document.querySelector(".modalContent .closeBtn");

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
                        text: 'Prénom'
                    },
                    {
                        label : 'lastame',
                        type : 'text',
                        className: 'text',
                        text: 'Nom'
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
                        text: 'Votre message'
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
                //closeBtn.setAttribute("tabindex", "3");
                closeBtn.setAttribute("tabindex", "0");

                modal.style.height = "auto";
                modal.setAttribute("aria-label", "image closeup view");
                modal.setAttribute("tabindex", "0");
                //modalContent.setAttribute("tabindex", "-1");

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
    document.querySelector(".modal").focus();
   // modal.setAttribute("tabindex", 1);
    //modal.setAttribute("aria-modal", true);
    //document.querySelector(".modalContent").focus();//met le focus sur votre modale une fois cette dernière ouverte
    const header = document.getElementById("header");
    const main = document.getElementById("main");
    header.setAttribute("aria-hidden", true);
    main.setAttribute("aria-hidden", true);
    /*
    const allTabindex0 = [].slice.call(document.getElementsByClassName("tabindex0"));
    allTabindex0.forEach((element) => {
        element.removeAttribute("tabindex");
    });
    */
};

function closeModal() {

    const modal = document.querySelector(".modal");
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", true);
    //modal.setAttribute("aria-modal", false);

    //Remettre le focus sur le reste du document???????

    const modalContent = document.querySelector(".modalContent");
    const children = [].slice.call(modalContent.children);
    console.log(children);
    let closeBtn =  document.querySelector(".modalContent .closeBtn");
    children.forEach((child) => {
        if (child != closeBtn) {
            //console.log("notBTN");
            modalContent.removeChild(child);
            console.log(modalContent);
        };
    });

    const header = document.getElementById("header");
    const main = document.getElementById("main");

    header.setAttribute("aria-hidden", false);
    main.setAttribute("aria-hidden", false);

    const allTabindex0 = [].slice.call(document.getElementsByClassName("tabindex0"));
    allTabindex0.forEach((element) => {
        element.setAttribute("tabindex", 0);
    });

    modal.setAttribute("id", "");
    console.log("modal", modal);

    closeBtn.removeAttribute("onclick");
};
/*
let closeBtn = document.querySelector(".modalContent .closeBtn");
console.log(closeBtn);
console.log(closeBtn.attributes);
console.log(closeBtn.getAttribute("onclick"));
console.log(closeFunction);
closeBtn.addEventListener("keyup", (e) => {
    e.preventDefault;
    if (e.key === "Enter") {
        console.log(closeBtn.getAttribute("onclick"));
        closeFunction();
    };
});*/