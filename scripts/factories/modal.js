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

                let contactForm = new ContactForm("post", "", photographerProfile, fields);
                contactForm.create();
                closeBtn.setAttribute("onclick", "closeContactForm()");
                closeBtn.setAttribute("aria-label", "Close Contact form");
            break;

            case 'lightbox' :
                let lightbox = new Lightbox();
                lightbox.create();
                closeBtn.setAttribute("onclick", "closeLightbox()");
                closeBtn.setAttribute("aria-label", "Close dialog");
            break;
        };
    };
};

function displayModal() {

    const modal = document.querySelector(".modal");
	modal.style.display = "block";
    modal.setAttribute("aria-hidden", "false");
    document.querySelector(".modalContent").focus();//met le focus sur votre modale une fois cette dernière ouverte
    const header = document.getElementById("header");
    const main = document.getElementById("main");
    header.setAttribute("aria-hidden", "true");
    main.setAttribute("aria-hidden", "true");
};

function closeModal() {

    const modal = document.querySelector(".modal");
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");

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
    header.setAttribute("aria-hidden", "false");
    main.setAttribute("aria-hidden", "false");

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