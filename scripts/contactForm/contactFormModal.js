class ContactFormModal extends CloseBtnContactForm{

    /**
     * @param {string} method methode de traitement des données
     * @param {string} action
     * @param {array} fields [{label: 'firstname', type: 'text', className: 'text-area' }]
     */

    constructor (type, method, action, photographerData) {
        super(type)
        this._method = method
        this._action = action
        this._photographerData = photographerData
        this._fields = [
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
    };

    create () {

        const modalContent = document.querySelector(".modal .modal__content");
        modalContent.classList.add("modal--contact-form");

        const header = document.createElement ("header");
        header.setAttribute("tabindex", "-1");
        
        const contactTitle = document.createElement ("h1");

        contactTitle.setAttribute("id", "contact-title");
        contactTitle.setAttribute("tabindex", "0");
        contactTitle.innerHTML = `Contactez-moi<br />${this._photographerData.name}`;

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
        [this._contactForm, header].map(element => modalContent.prepend(element));

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
            if (e.key === "Enter") {
                e.preventDefault();
                this.sendMessage();
            };
        });
    };

    sendMessage () {
        const allInputs = Array.from(document.getElementsByClassName("contact-form__input"));
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
            this.initContactFormModal(); //Méthode de la class CloseBtnContactForm
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
        // input.setAttribute("tabindex", 0);

        [label, this._input].map(element => fieldBox.appendChild(element));


        ///////////////////////////// Evènement au change sur un champ ///////////////////////////////////////
        this._input.addEventListener("change", (e) => {
            checkFieldValidity(this._input, this._type);
        });

        ////////////////// Evènement via la touche ENTREE => Evite d'envoyer le formulaire ////////////////////
        this._input.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                const allInputs = Array.from(document.getElementsByClassName("contact-form__input"));
                let indexInput = allInputs.indexOf(this._input);
                console.log(indexInput);
                indexInput++ ;
                console.log (indexInput);
                if (indexInput < allInputs.length) {
                    allInputs[indexInput].focus();
                } else {
                    const contactBtn = document.querySelector(".contact-form .contact-button");
                    contactBtn.focus();
                };
            };
        });

        return fieldBox;
    };
};


function checkFieldValidity(element, type) {

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