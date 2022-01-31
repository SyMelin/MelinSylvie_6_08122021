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
        //console.log("contactTitle", contactTitle);

        this._contactForm = document.createElement ("form");
        this._contactForm.classList.add("contact-form");
        this._contactForm.setAttribute("role", "form");
        this._contactForm.setAttribute("tabindex", "-1");
        this._contactForm.setAttribute("methode", this._method);
        this._contactForm.setAttribute("action", this._action);

        const fieldsContainer = document.createElement("div");
        fieldsContainer.setAttribute("tabindex", "-1");
        fieldsContainer.classList.add("fieldsContainer");
        this._contactForm.appendChild(fieldsContainer);

        for (let item of this._fields) {
            let formField = new FormField(item.label, item.type, item.className, item.text);
            fieldsContainer.appendChild(formField.createFormField());
        };

        header.appendChild(contactTitle);
        modalContent.prepend(this._contactForm);
        modalContent.prepend(header);

        this.createContactBtn();
    };

    createContactBtn () {
        
        const contactBtn =  document.createElement("button");
      //  contactBtn.setAttribute("tabindex", 0);
        contactBtn.textContent = "Envoyer";
        contactBtn.setAttribute("aria-label", "Envoyer");
        contactBtn.classList.add("contact-button");
        
        this._contactForm.appendChild(contactBtn);


        //////////// Evenement sur contactBtn //////////////////

        contactBtn.addEventListener("click", (e) => {
            e.preventDefault();
            this.sendMessage();
        });

        contactBtn.addEventListener("keyup", (e) => {
            e.preventDefault();
            if (e.key === "Enter") {
                this.sendMessage();
            };
        });
    };

    sendMessage () {
        const allInputs = [].slice.call(document.getElementsByClassName("contact-form__input"));
        console.log(allInputs);
        allInputs.forEach((input) => {
            console.log(input.value);
        });
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
        input.classList.add("contact-form__input");
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

// Fermeture de la modale via la touche Echap

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