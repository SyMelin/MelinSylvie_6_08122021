class ContactFormModal {

    /**
     * @param {string} method methode de traitement des données
     * @param {string} action
     * @param {array} fields [{label: 'firstname', type: 'text', className: 'text-area' }]
     */

    constructor (method, action, photographerData, fields) {
        this._method = method;
        this._action = action;
        this._photographerData = photographerData;
        this._fields = fields;
    }

    create () {

        const modalContent = document.querySelector(".modal .modal__content");
        modalContent.classList.add("modal--contact-form");

        const header = document.createElement ("header");
        header.setAttribute("tabindex", "-1");
        
        const contactTitle = document.createElement ("h1");

        contactTitle.setAttribute("id", "contact-title");
        contactTitle.setAttribute("tabindex", "0");
        contactTitle.innerHTML = `Contactez-moi<br />${this._photographerData.name}`;
        console.log("contactTitle", contactTitle);

        const contactForm = document.createElement ("form");
        contactForm.classList.add("contact-form");
        contactForm.setAttribute("role", "form");
        contactForm.setAttribute("tabindex", "-1");
        contactForm.setAttribute("methode", this._method);
        contactForm.setAttribute("action", this._action);

        const fieldsContainer = document.createElement("div");
        fieldsContainer.setAttribute("tabindex", "-1");
        fieldsContainer.classList.add("fieldsContainer");
        contactForm.appendChild(fieldsContainer);

        for (let item of this._fields) {
            let formField = new FormField(item.label, item.type, item.className, item.text);
            fieldsContainer.appendChild(formField.createFormField());
            
        };

        const contactBtn =  document.createElement("button");
      //  contactBtn.setAttribute("tabindex", 0);
        contactBtn.textContent = "Envoyer";
        contactBtn.setAttribute("aria-label", "Envoyer");
        contactBtn.classList.add("contact-button");
        
        contactForm.appendChild(contactBtn);
        console.log("contactForm", contactForm);

        header.appendChild(contactTitle);
        modalContent.prepend(contactForm);
        modalContent.prepend(header);
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
        fieldBox.setAttribute("tabindex", -1);

        //Crée le label
        let label =  document.createElement("label");
        label.setAttribute("tabindex", 0);
        label.setAttribute("for", this._label);
        label.textContent = this._text;

        //Crée l'input
        let input;
        if (this._type == "textarea") {
            input =  document.createElement("textarea");
        } else {
            input =  document.createElement("input");
        };
        input.setAttribute("type", this._type);
        input.setAttribute("name", this._name);
        input.setAttribute("id", this._id);
        input.setAttribute("class", this._class);
        input.setAttribute("required", true);
        input.setAttribute('aria-required', true);
      //  input.setAttribute("tabindex", 0);

        fieldBox.appendChild(label);
        fieldBox.appendChild(input);

        return fieldBox;
    };
};


function openContactFormModal(){

    let newContactForm = new Modal("contact_modal", 'contactForm');
    newContactForm.createModal();
    //console.log(newContactForm);
    displayModal();
};

function closeContactFormModal() {
    const modal = document.querySelector(".modal");
    modal.removeAttribute("aria-labelledby");
    const modalContent = document.querySelector(".modal .modal__content");
   // modalContent.removeAttribute("tabindex");
    modalContent.classList.remove("modal--contact-form");
    closeModal();
}

// on récupère l'élément bouton de contact
//const contactBtn = document.querySelector(".contact-button");
// on écoute l'évènement "click" sur le bouton:  celui-ci déclenche la fermeture de la modale
//contactBtn.addEventListener("click", displayModal);

// Fermeture de la modale quand in appuie sur échap

// Fermeture de la modale via le touche Echap

window.addEventListener("keyup", function(e) {
    e.preventDefault();
    const modal = document.getElementById("contact_modal");
   // console.log("modal", modal);
    if (modal) {
        const modalState = modal.getAttribute("aria-hidden");
            //console.log("modalState", modalState);
            if ((e.key === "Escape") && (modalState === "false")) {
                e.preventDefault();
                closeContactFormModal();
            };
    };
});