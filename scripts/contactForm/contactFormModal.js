class ContactFormModal extends CloseBtnContactForm{

    /**
     * @param {string} method methode de traitement des données
     * @param {string} action
     * @param {array} fields [{label: 'firstname', type: 'text', text: 'prénom', ... }, ...]
     */

    constructor (type, method, action, data) {
        super(type)
        this._method = method
        this._action = action
        this._data = data
        this._fields = [
            { 
                id : 'firstame',
                type : 'text',
                text: 'Prénom',
                minlength: '2'
            },
            {
                id : 'lastame',
                type : 'text',
                text: 'Nom',
                minlength: '2'
            },
            {
                id : 'email',
                type : 'email',
                text: 'Email'
            },
            {
                id : 'message',
                type : 'textarea',
                text: 'Votre message',
                placeholder: '2000 caractères maximum',
                maxlength: '1000'
            }
        ];
    };

    create () {

        const modalContent = document.querySelector('.modal .modal__content');
        modalContent.classList.add("modal--contact-form");

        const header = document.createElement ('header');
        header.setAttribute('tabindex', '-1');
        
        const contactTitle = document.createElement ('h1');

        contactTitle.setAttribute('id', 'contact-title');
        contactTitle.setAttribute('tabindex', '0');
        contactTitle.innerHTML = `Contactez-moi<br />${this._data.name}`;

        this._contactForm = document.createElement ('form');
        this._contactForm.classList.add('contact-form');
        this._contactForm.setAttribute('role', 'form');
        this._contactForm.setAttribute('tabindex', '-1');
        this._contactForm.setAttribute('methode', this._method);
        this._contactForm.setAttribute('action', this._action);

        const fieldsContainer = document.createElement('div');
        fieldsContainer.setAttribute('tabindex', '-1');
        fieldsContainer.classList.add('fieldsContainer');
        this._contactForm.appendChild(fieldsContainer);

        for (let item of this._fields) {
            let formField = new FormField(item);
            fieldsContainer.appendChild(formField.createFormField());
        };

        header.appendChild(contactTitle);
        [this._contactForm, header].map(element => modalContent.prepend(element));

        this.createContactBtn();
    };

    createContactBtn () {

        const contactBtn =  document.createElement('button');
      //  contactBtn.setAttribute("tabindex", 0);
        contactBtn.textContent = 'Envoyer';
        contactBtn.setAttribute('aria-label', 'Envoyer');
        contactBtn.classList.add('contact-button');
        
        this._contactForm.appendChild(contactBtn);


        //////////// Evenement sur contactBtn //////////////////

        contactBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.sendMessage();
        });

        contactBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.sendMessage();
            };
        });
    };

    sendMessage () {
        const allInputs = Array.from(document.getElementsByClassName('contact-form__input'));
        let validityForm = 0;
        allInputs.forEach((input) => {
            if (checkFieldValidity(input, (input.getAttribute('type'))) === true) {
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
            alert('Le message a bien été envoyé');
        } else {
           console.log("Le formulaire n'est pas valide");
        }
    };
};


class FormField {

    /**
     * @param {string} label label du champs
     * @param {string} type type de champs
     * @param {string} className class du champs
     * @param {string} text contenu texte du lab
     */

    constructor (item) {
        this._item = item;
        this._item.idLabel = item.id + "--label";
    }

    createFormField() {

        let formField = document.createElement('div');
        formField.classList.add('formData');
        formField.setAttribute('tabindex', -1);
        formField.setAttribute('data-error-visible', false);

        //Crée le label
        let label =  document.createElement('label');
        label.textContent = this._item.text;
        label.setAttribute('tabindex', 0);
        label.setAttribute('for', this._item.id);
        label.setAttribute('id', this._item.idLabel);
       

        //Crée l'input
        let input;
        if (this._item.type == 'textarea') {
            input = document.createElement('textarea');
            input.classList.add('text-area');
        } else {
            input = document.createElement('input');
            input.classList.add('text');
        };
        input.setAttribute('required', true);
        input.setAttribute('aria-required', true);
        input.setAttribute('aria-labelledby', this._item.idLabel);
        input.classList.add("contact-form__input"); 
        for (let [key, value] of Object.entries(this._item)) {
            input.setAttribute(key, value);
        };

        //Crée le message d'erreur
        switch (this._item.type) {

            case 'text' :
                formField.setAttribute("data-error", "Veuillez entrer au minimum " + this._item.minlength + " caractères ou plus");
            break;

            case 'email' :
                formField.setAttribute("data-error", "Veuillez entrer une adresse e-mail valide");
            break;

            case 'textarea' :
                formField.setAttribute("data-error", "Veuillez rédiger votre message. Maximum 2000 caractères");
            break;

        };
        
        //Ajoute le label et le champ à leur conteneur formField
        [label, input].map(element => formField.appendChild(element));


        ///////////////////////////// Evènement au change sur un champ ///////////////////////////////////////
        input.addEventListener("change", (e) => {
            checkFieldValidity(input, this._item.type);
        });

        ////////////////// Evènement via la touche ENTREE => Evite d'envoyer le formulaire et met le focus sur le champ suivant ////////////////////
        input.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                const allInputs = Array.from(document.getElementsByClassName('contact-form__input'));
                let indexInput = allInputs.indexOf(input);
                indexInput++ ;
                if (indexInput < allInputs.length) {
                    allInputs[indexInput].focus();
                } else {
                    const contactBtn = document.querySelector('.contact-form .contact-button');
                    contactBtn.focus();
                };
            };
        });

        return formField;
    };
};


function checkFieldValidity(element, type) {

    switch (type) {

        case 'text' :
            if (element.value.length >= (element.getAttribute('minlength')) && (/^\b([A-zÀ-ÿ][-,a-zà-ÿ. ']+[ ]*)+$/gm.test(element.value) === true)) {
                element.parentElement.setAttribute('data-error-visible', false);
                return true;
            } else {
                element.parentElement.setAttribute('data-error-visible', true);
                return false;
            };
        break;

        case 'email' :
            if(!(element.validity.typeMismatch) && (/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(element.value) === true)) {
                element.parentElement.setAttribute('data-error-visible', false);
                return true;
            } else {
                element.parentElement.setAttribute('data-error-visible', true);
                return false;
            };
        break;

        case 'textarea' :
            if (!(element.value) == "") {
                element.parentElement.setAttribute('data-error-visible', false);
                return true;
            } else {
                element.parentElement.setAttribute('data-error-visible', true);
                return false;
            };
        break;
    };
};