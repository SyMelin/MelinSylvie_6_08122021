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

        const modalContent = document.querySelector(".modalContent");

        let closeBtn =  document.createElement("div");
        closeBtn.classList.add("closeBtn");
        closeBtn.setAttribute("role", "button");
        closeBtn.setAttribute("onclick", "closeModal()");

        modalContent.appendChild(closeBtn);

        switch (this._type) {
            case 'contactForm' :
                console.log("HEEEERE");
                let fields = {
                    firstame : {
                        label : 'firstame',
                        type : 'text',
                        className: 'text-area',
                        text: 'prénom'
                    },
                    lastame : {
                        label : 'lastame',
                        type : 'text',
                        className: 'text-area',
                        text: 'Nom'
                    },
                    email : {
                        label : 'email',
                        type : 'email',
                        className: 'text-area',
                        text: 'Email'
                    },
                    message : {
                        label : 'message',
                        type : 'text',
                        className: '',
                        text: 'Votre message'
                    }
                };


                let contactForm = new ContactForm("post", "", fields);
                contactForm.create();
                console.log("CONTACTFORM", contactForm);
                modalContent.appendChild(contactForm);
                break;
            case 'lightbox' :
                let lightbox = new Lightbox();
                lightbox.create();
                modalContent.appendChild(contactForm);
                break;
        };
    };

};

class ContactForm {

    /**
     * @param {string} method methode de traitement des données
     * @param {string} action
     * @param {object}  fields {firstname {label: 'firstname', type: 'text', className: 'text-area' }}
     */

    constructor (method, action, fields) {
        this._method = method;
        this._action = action;
        this._fields = fields;
    }

    create () {

        const header = document.createElement ("header");
        const h2 = document.createElement ("h2");
        h2.textContent = "Contactez-moi";

        const closeBtn =  document.querySelector(".closeBtn");

        header.appendChild(h2);
        header.appendChild(closeBtn);

        const form = document.createElement ("form");
        form.setAttribute("methode", this._method);
        form.setAttribute("action", this._action);

        const fieldsContainer = document.createElement("div");
        fieldsContainer.classList.add("fieldsContainer");
        form.appendChild(fieldsContainer);

        console.log(this._fields);

        Array(this._fields).forEach((field) => {
            let formField = new FormField(this._field.label, this._field.type, this._field.className, this._field.text);
            formField.create();
        });
        
        const contactBtn =  document.createElement("button");
        contactBtn.textContent = "Envoyer";
        contactBtn.classList.add("contact_button");
        
       
        form.appendChild(contactBtn);
        
        
    };

};


class FormField {

    /**
     * 
     * @param {string} label label du champs
     * @param {string} type type de champs
     * @param {string} className class du champs
     * @param {string} text contenu texte du label
     */

    constructor (label, type, className, text) {
        this._label = label;
        this._type = type;
        this._name = label;
        this._id = label;
        this._class = className;
        this._text = text;
    }

    create() {
        let label =  document.createElement("label");
        label.setAttribute("for", this._label);
        label.textContent = this._text;
        console.log(label);

        let input =  document.createElement("input");
        input.setAttribute("type", this._type);
        input.setAttribute("name", this._name);
        input.setAttribute("id", this._id);
        input.setAttribute("class", this._class);
        console.log(input);

        let fieldsContainer = document.querySelector("fieldsContainer")
        console.log(fieldsContainer);
        fieldsContainer.appendChild(label);
        fieldsContainer.appendChild(input);
    };

};


function NEW(){

    let newContactForm = new Modal("contact_modal", 'contactForm');
    newContactForm.createModal();
    console.log(newContactForm);
}












function displayModal() {

    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
    modal.setAttribute("aria-hidden", "false");
    document.querySelector("#contact_modal .modalContent").focus();//met le focus sur votre modale une fois cette dernière ouverte

    const header = document.getElementById("header");
    const main = document.getElementById("main");
    header.setAttribute("aria-hidden", "true");
    main.setAttribute("aria-hidden", "true");
};

function closeModal() {
    
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");

    const header = document.getElementById("header");
    const main = document.getElementById("main");
    header.setAttribute("aria-hidden", "false");
    main.setAttribute("aria-hidden", "false");
};


// on récupère l'élément bouton de contact
//const contactBtn = document.querySelector(".contact_button");
// on écoute l'évènement "click" sur le bouton:  celui-ci déclenche la fermeture de la modale
//contactBtn.addEventListener("click", displayModal);

// Fermeture de la modale quand in appuie sur échap

// Fermeture de la modale via le touche Echap
window.addEventListener("keyup", function(e) {
    const modal = document.getElementById("contact_modal");
    const modalState = modal.getAttribute("aria-hidden");
    if ((e.key === "Escape") && (modalState === "false")) {
        e.preventDefault();
        closeModal();
    };
});