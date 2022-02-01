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
            let formField = new FormField(item.label, item.type, item.className, item.text, item.minlength, item.maxlength);
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

        contactBtn.addEventListener("keydown", (e) => {
            e.preventDefault();
            if (e.key === "Enter") {
                this.sendMessage();
            };
        });
    };

    sendMessage () {
        const allInputs = [].slice.call(document.getElementsByClassName("contact-form__input"));
        let validityForm = 0;
        allInputs.forEach((input) => {
            if (checkFieldValidity(input, (input.getAttribute("type"))) === true) {
                validityForm++;
            };
        return validityForm;
        });
        if (validityForm === allInputs.length) {
            console.log ("Le formulaire est valide");
            allInputs.forEach((input) => {
                console.log(input.value);
            });
            closeContactFormModal();
            alert("Le message a bien été envoyé");
        } else {
           console.log("Le formulaire n'est pas valide");
        }
    };
};


class FormField {

    /**
     * 
     * @param {string} label label du champs
     * @param {string} type type de champs
     * @param {string} className class du champs
     * @param {string} text contenu texte du lab
     */

    constructor (label, type, className, text, minlength, maxlength) {
        this._label = label;
        this._type = type;
        this._name = label;
        this._id = label;
        this._class = className;
        this._text = text;
        this._minlength = minlength;
        this._maxlength = maxlength;
    }

    createFormField() {

        let fieldBox = document.createElement("div");
        fieldBox.classList.add("formData");
        fieldBox.setAttribute("tabindex", -1);
        fieldBox.setAttribute("data-error-visible", "false");


        //Crée le label
        let label =  document.createElement("label");
        label.setAttribute("tabindex", 0);
        label.setAttribute("for", this._label);
        label.textContent = this._text;

        //Crée l'input
        if (this._type == "textarea") {
            this._input =  document.createElement("textarea");
        } else {
            this._input = document.createElement("input");
        };
        this._input.setAttribute("type", this._type);

        switch (this._type) {

            case 'text' :
                this._input.setAttribute("minlength", this._minlength);
                fieldBox.setAttribute("data-error", "Veuillez entrer au minimum " + this._minlength + " caractères ou plus");
            break;

            case 'email' :
                fieldBox.setAttribute("data-error", "Veuillez entrer une adresse e-mail valide");
            break;

            case 'textarea' :
                this._input.setAttribute("maxlength", this._maxlength);
                this._input.setAttribute("placeholder", "2000 caractères maximum");
                fieldBox.setAttribute("data-error", "Veuillez rédiger votre message. Maximum 2000 caractères");
            break;

        };
        
        this._input.setAttribute("name", this._name);
        this._input.setAttribute("id", this._id);
        this._input.setAttribute("class", this._class);
        this._input.setAttribute("required", true);
        this._input.setAttribute('aria-required', true);
        this._input.classList.add("contact-form__input");
      //  input.setAttribute("tabindex", 0);


        fieldBox.appendChild(label);
        fieldBox.appendChild(this._input);


        ///////////////////////////// Evènement au change sur un champ ///////////////////////////////////////
        this._input.addEventListener("change", (e) => {
            checkFieldValidity(this._input, this._type);
        });

        ////////////////// Evènement via la touche ENTER => Evite d'envoyer en formulaire ////////////////////
        this._input.addEventListener("keydown", function(e) {
            if (e.key === "Enter") {
                "j'ai appuyé sue ENTER";
                e.preventDefault();
            };
        });


        return fieldBox;
    };
};


function checkFieldValidity(element, type) {
    //console.log("type", type);

    switch (type) {

        case 'text' :
            if (element.value.length >= (element.getAttribute("minlength")) && (/^\b([A-zÀ-ÿ][-,a-zà-ÿ. ']+[ ]*)+$/gm.test(element.value) === true)) {
                element.parentElement.setAttribute("data-error-visible", "false");
                return true;
            } else {
                element.parentElement.setAttribute("data-error-visible", "true");
                return false;
            };
        break;

        case 'email' :
            if(!(element.validity.typeMismatch) && (/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(element.value) === true)) {
                element.parentElement.setAttribute("data-error-visible", "false");
                return true;
            } else {
                element.parentElement.setAttribute("data-error-visible", "true");
                return false;
            };
        break;

        case 'textarea' :
            //console.log(element.value.length);
            if (!(element.value) == "") {
                element.parentElement.setAttribute("data-error-visible", "false");
                return true;
            } else {
                element.parentElement.setAttribute("data-error-visible", "true");
                return false;
            };
        break;
    };
};


function openContactFormModal(){

    let newContactForm = new Modal("contact_modal", 'contactForm');
    newContactForm.createModal();
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