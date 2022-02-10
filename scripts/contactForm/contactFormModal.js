/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import CloseBtnContactForm from "../contactForm/closeBtnContactForm.js"

export default class ContactFormModal extends CloseBtnContactForm{

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
                maxlength: '1000'
            }
        ];
    }

    create () {

        const modalContent = document.querySelector('.modal .modal__content');
        modalContent.classList.add("modal--contact-form");

        const header = document.createElement ('header');
        header.setAttribute('tabindex', -1);
        
        const contactTitle = document.createElement ('h1');
        contactTitle.innerHTML = `Contactez-moi<br />${this._data.name}`;
        contactTitle.setAttribute('id', 'contact-title');
        contactTitle.setAttribute('tabindex', 0);
        contactTitle.classList.add('tabindex0');

        this._contactForm = document.createElement ('form');
        this._contactForm.classList.add('contact-form');
        this._contactForm.setAttribute('role', 'form');
        this._contactForm.setAttribute('methode', this._method);
        this._contactForm.setAttribute('action', this._action);
        this._contactForm.setAttribute('tabindex', -1);

        const fieldsContainer = document.createElement('div');
        fieldsContainer.setAttribute('tabindex', -1);
        fieldsContainer.classList.add('fieldsContainer');
        this._contactForm.appendChild(fieldsContainer);

        for (let item of this._fields) {
            let formField = new FormField(item);
            fieldsContainer.appendChild(formField.createFormField());
        }

        header.appendChild(contactTitle);
        [this._contactForm, header].map(element => modalContent.prepend(element));

        this.createContactBtn();
    }

    createContactBtn () {

        const contactBtn =  document.createElement('button');
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
            }
        });
    }

    sendMessage () {
        const allInputs = Array.from(document.getElementsByClassName('formField__input'));
        let validityForm = 0;
        allInputs.forEach((input) => {
            if (checkFieldValidity(input, (input.getAttribute('type'))) == true) {
                validityForm++;
            }
        return validityForm;
        });
        if (validityForm === allInputs.length) {
            console.log ("Le formulaire est valide");
            allInputs.forEach((input) => {
                console.log(input.value);
            });
            this.initContactFormModal(); //Méthode de la classe CloseBtnContactForm
            alert('Le message a bien été envoyé');
        } else {
           console.log("Le formulaire n'est pas valide");
           const firstInvalidInput = document.querySelector('.formField[data-error-visible="true"] .formField__input');
           firstInvalidInput.focus();
        }
    }
}


class FormField {

    /**
     * @param {string} label label du champ
     * @param {string} type type de champ
     * @param {string} className class du champ
     * @param {string} text contenu texte du lab
     */

    constructor (item) {
        this._item = item;
        this._item.idLabel = item.id + "--label";
    }

    createFormField() {

        this._formField = document.createElement('div');
        this._formField.classList.add('formField');
        this._formField.setAttribute('tabindex', -1);
        this._formField.setAttribute('data-error-visible', false);

        //Crée le label
        let label =  document.createElement('label');
        label.textContent = this._item.text;
        label.setAttribute('tabindex', 0);
        label.setAttribute('for', this._item.id);
        label.setAttribute('id', this._item.idLabel);
        label.classList.add('tabindex0', 'formField__label');
       

        //Crée l'input
        let input;
        if (this._item.type == 'textarea') {
            input = document.createElement('textarea');
            input.classList.add('text-area');
            input.setAttribute('placeholder', this._item.maxlength + " caractères maximum");
        } else {
            input = document.createElement('input');
            input.classList.add('text');
            input.setAttribute('placeholder', this._item.text);
        }
        input.setAttribute('required', true);
        input.setAttribute('aria-labelledby', this._item.idLabel);
        input.classList.add('formField__input'); 
        for (let [key, value] of Object.entries(this._item)) {
            input.setAttribute(key, value);
        }

        //Crée le message d'erreur
        let dataError = document.createElement('span');
        dataError.setAttribute('tabindex', 0);
        dataError.classList.add('formField__data-error', 'tabindex0', 'hidden');
        // ajout de span pour accessibilité de dataError
        let dataErrorSpanPrev = document.createElement('span');
        dataErrorSpanPrev.classList.add('screenreader-text');
        dataErrorSpanPrev.textContent = "Message d'erreur :"
       
        let dataErrorBox = document.createElement('span');
        let dataErrorText;

        switch (this._item.type) {

            case 'text' :
                dataErrorText = "Veuillez entrer au minimum " + this._item.minlength + " caractères ou plus";
            break;

            case 'email' :
                dataErrorText = "Veuillez entrer une adresse e-mail valide";
            break;

            case 'textarea' :
                dataErrorText = "Veuillez rédiger votre message. Maximum " + this._item.maxlength + " caractères";
            break;

        }

        // ajout de span pour accessibilité de dataError
        let dataErrorSpanNext = document.createElement('span');
        dataErrorSpanNext.classList.add('screenreader-text');
        dataErrorSpanNext.textContent = " dans le champ de saisie précédent";

        dataErrorBox.textContent = dataErrorText;

        [dataErrorSpanPrev, dataErrorBox, dataErrorSpanNext].map(element => dataError.appendChild(element));
        
        //Ajoute le label et le champ à leur conteneur formField
        [label, input, dataError].map(element => this._formField.appendChild(element));


        ///////////////////////////// Evènement au change sur un champ ///////////////////////////////////////
        input.addEventListener('change', (e) => {
            checkFieldValidity(input, this._item.type);
        });

        input.addEventListener('blur', (e) => {
            checkFieldValidity(input, this._item.type);
        });

        ////////////////// Evènement via la touche ENTREE sur un champs autre que textarea => Evite d'envoyer le formulaire ////////////////////
        input.addEventListener('keydown', (e) => {
            if (e.key === "Enter") {
                if (this._item.type !== "textarea") {
                    e.preventDefault();
                    if (checkFieldValidity(input, this._item.type) === true){
                        const label = input.previousSibling;
                        const allLabels = Array.from(document.getElementsByClassName('formField__label'));
                        let indexLabel = allLabels.indexOf(label);
                        indexLabel++ ;
                        if (indexLabel < allLabels.length) {
                            allLabels[indexLabel].focus();
                        } else {
                            input.nextSibling.focus();
                        }
                    }
                }
            }
        });
        
        this.setEventListenerArrow();

        return this._formField;
    }

    setEventListenerArrow () {
        
        //La navigation via flèches haut et bas ne fonctionne pas comme attendue si lecteur d'écran (NVDA) utilisé
        let allFormFieldChildren = Array.from(this._formField.children);
        allFormFieldChildren.forEach((child) => {
            child.addEventListener('keydown', function(e) {
                if (e.key == "ArrowDown" || e.key == "ArrowUp") {
                    if (child.tagName.toLowerCase() == "label"){
                        if (e.key == "ArrowDown") {
                            child.nextSibling.focus();
                        } else {
                            if (child.parentElement.previousSibling) {
                                let previousElement = child.parentElement.previousSibling.lastChild;
                                if (!(previousElement.classList.contains('hidden'))) {
                                    previousElement.focus();
                                } else if (previousElement.classList.contains('hidden')) {
                                    previousElement.previousSibling.focus();
                                }
                            } /*else {};*/
                        }
                    } else if (child.tagName.toLowerCase() == "input") {
                        if (e.key == "ArrowDown") {
                            checkFieldValidity(child, child.type);
                            if (!(child.nextSibling.classList.contains('hidden'))) {
                                child.nextSibling.focus();
                            } else if (child.nextSibling.classList.contains('hidden')) {
                                child.parentElement.nextElementSibling.firstChild.focus();
                            } /*else {};*/
                        } else {
                            checkFieldValidity(child, child.type);
                            child.previousSibling.focus();
                        }
                    } else if (child.tagName.toLowerCase() == "span") {
                        if (e.key == "ArrowDown") {
                            child.parentElement.nextSibling.firstChild.focus();
                        } else {
                            child.previousSibling.focus();
                        }
                    } /*else {};*/
                }
            });
        });
    }
}

/********************* Fonctions pour la Validation des champs ou du formulaire **************************/

let isTextValid = function (element) {
    if (element.value.length >= (element.getAttribute('minlength')) && (/^\b([A-zÀ-ÿ][-,a-zà-ÿ. ']+[ ]*)+$/gm.test(element.value))){
        return true;
    }};

let isEmailValid = function (element) {
    if (!(element.validity.typeMismatch) && (/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(element.value))) {
        return true;    
    }};

let isMessageValid = function(element) {
   if ((element.value.length > 0) && (/^\b([A-zÀ-ÿ0-9.,;:!§µ£°#$%&’"'<>*+/=?^_`{|}~-]+[ ]*)+$/gm.test(element.value))){
       return true;
   }};


function checkFieldValidity(element, type) {
    let test;
    switch (type) {

        case 'text' :
            test = isTextValid(element);
        break;
        case 'email' :
            test = isEmailValid(element);
        break;
        case 'textarea' :
            test = isMessageValid(element);
        break;

    }
    if (test) {
        element.parentElement.setAttribute('data-error-visible', false);
        element.nextSibling.classList.add('hidden');
        element.setAttribute('aria-invalid', false);
        return true;
    } else {
        element.parentElement.setAttribute('data-error-visible', true)
        element.nextSibling.classList.remove('hidden');
        element.setAttribute('aria-invalid', true);
        return false;
    }
}