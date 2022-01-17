class ContactForm {

    /**
     * @param {string} method methode de traitement des données
     * @param {string} action
     * @param {array} fields [{label: 'firstname', type: 'text', className: 'text-area' }]
     */

    constructor (method, action, fields) {
        this._method = method;
        this._action = action;
        this._fields = fields;
    }

    create () {

        const modalContent = document.querySelector(".modal .modalContent");
        modalContent.classList.add("contactForm");

        const header = document.createElement ("header");
        
        const h2 = document.createElement ("h2");
        h2.textContent = "Contactez-moi";

        const form = document.createElement ("form");
        form.setAttribute("methode", this._method);
        form.setAttribute("action", this._action);

        const fieldsContainer = document.createElement("div");
        fieldsContainer.classList.add("fieldsContainer");
        form.appendChild(fieldsContainer);

        for (let item of this._fields) {
            let formField = new FormField(item.label, item.type, item.className, item.text);
            fieldsContainer.appendChild(formField.createFormField());
            
        };

        const contactBtn =  document.createElement("button");
        contactBtn.textContent = "Envoyer";
        contactBtn.classList.add("contact_button");
        
        form.appendChild(contactBtn);
        console.log("form", form);

        header.appendChild(h2);
        modalContent.appendChild(header);
        modalContent.appendChild(form);
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

    createFormField() {

        let fieldBox = document.createElement("div");

        //Crée le label
        let label =  document.createElement("label");
        label.setAttribute("for", this._label);
        label.textContent = this._text;

        //Crée l'input
        let input =  document.createElement("input");
        input.setAttribute("type", this._type);
        input.setAttribute("name", this._name);
        input.setAttribute("id", this._id);
        input.setAttribute("class", this._class);

        fieldBox.appendChild(label);
        fieldBox.appendChild(input);

        return fieldBox;
    };
};


function openContactForm(){

    let newContactForm = new Modal("contact_modal", 'contactForm');
    newContactForm.createModal();
    //console.log(newContactForm);
    displayModal();
};

function closeContactForm() {
    const modalContent = document.querySelector(".modal .modalContent");
    modalContent.classList.remove("contactForm");
    closeModal();
}

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
        closeContactForm();
    };
});