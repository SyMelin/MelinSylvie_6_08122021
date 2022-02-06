//class Listbox {
/*
    /**
     * @param {HTMLElement} element listbox
     */

    //constructor (element) {
    //    this._element = element;
    //}
//}

//On définie l'option annoncée par le screenreader
const listboxLabel = document.getElementById('listbox-label');
const listboxLabelSpan = document.createElement('span');
listboxLabelSpan.classList.add('screenreader-text');

function setLisboxLabelSpanText () {
    let selectedOption = document.querySelector('.option[aria-selected="true"]');
    let selectedOptionText = selectedOption.innerText
    listboxLabelSpan.innerText = selectedOptionText
};

setLisboxLabelSpanText();

const listbox = document.querySelector('.listbox');
const options = Array.from(listbox.children);

const expandBtn = document.querySelector('.expandBtn');

const expandBtnSpan = document.createElement('span');
expandBtnSpan.textContent = "Cliquer sur ce bouton pour ouvrir la liste d'option";
expandBtnSpan.classList.add('screenreader-text');

listboxLabel.appendChild(listboxLabelSpan);
expandBtn.appendChild(expandBtnSpan);


//////////// Fonction utile pour l'évenement sur une option de la listbox /////////////////

function selectAnOption (option) {

    options.forEach((childOption) => {
        childOption.setAttribute('aria-selected', false);
        childOption.setAttribute('tabindex', -1);
    });
    
    listbox.setAttribute('aria-expanded', false);
    listbox.focus();
    
    //Au clic, on attribut option cliquée", option.setAttribute("aria-selected"));
    option.setAttribute('aria-selected', true);
    
    //On récupère l'id de l'option cliquée
    let optionSelected = option.getAttribute('id');

    if (listbox.classList.contains('listbox--open')){

        options.forEach((childOption) => {
            if ((childOption.getAttribute('aria-selected')) == "false"){
                childOption.classList.remove("option--selected");
                childOption.classList.add("option--notSelected");
            };
        });

        //on ferme les options du select
        expandBtn.setAttribute('aria-expanded', false);
        expandBtnSpan.textContent = "Cliquer sur ce bouton pour ouvrir la liste d'option";
        expandBtn.classList.toggle('expandBtn--less');
        listbox.classList.toggle('listbox--open');
        listbox.classList.toggle('listbox--close');


        //On vide le conteneur de cartes media
        const mediaWrapper = document.querySelector('.mediaWrapper');
        mediaWrapper.parentElement.removeChild(mediaWrapper);

        //On crée un nouveau filtre en fonction de Value et on réaffiche les cartes media
        new FilterFactory(optionSelected, photographerMedia);
        displayMedia(photographerMedia); //fonction du script pages/photographers.js

        //On modifie l'option annoncée par le screenreader
        setLisboxLabelSpanText();

    };
};


//////////// Evenement sur une option de la listbox /////////////////

//au  clic sur une option
options.forEach((option) => {
    option.addEventListener('click', function(e){
        e.preventDefault();
        selectAnOption(option);
    });
});

//avec ENTER sur une option
options.forEach((option) => {
    option.addEventListener('keyup', function(e){
        e.preventDefault();
        if (e.key === "Enter") {
            selectAnOption(option);
        };
    });
});


///////////////////fonction EVenement sur option avec flèches ////////////////////

function moveToOption (e, option) {
    if (e.key === "ArrowUp" || (e.key === "ArrowDown")){
        e.preventDefault();
        if (e.key === "ArrowUp") {
            let previousOption = option.previousSibling.previousSibling;
            if (previousOption.classList.contains('option')) {
                previousOption.focus();
            }
        } else {
            let nextOption = option.nextSibling.nextSibling;
            if (nextOption.classList.contains('option')) {
                nextOption.focus();
            }
        };
    };
};

//////////// Fonction utile pour l'évenement sur le bouton expand de la listbox /////////////////

function changeListboxDisplay () {

    let state = listbox.getAttribute('aria-expanded');

    //On affiche les options de la listbox
    expandBtn.setAttribute('aria-expanded', true);
    expandBtn.classList.toggle('expandBtn--less');
    expandBtnSpan.textContent = "Cliquer sur ce bouton pour fermer la liste d'option";
    listbox.classList.toggle('listbox--open');
    listbox.classList.toggle('listbox--close');

    listbox.focus();

    options.forEach((option) => {
        option.setAttribute('tabindex', 0);

        option.addEventListener('keydown', function(e) {
            moveToOption (e, option);
        });

        if (option.classList.contains('option--notSelected')) {
            ['option--notSelected', 'option--selected'].map(element => option.classList.toggle(element));
        };
    });

    //Selon l'état de la listbox enregistré au clic
    if (state == "false") {
        listbox.setAttribute('aria-expanded', true);
    } else {
        expandBtn.setAttribute('aria-expanded', false);
        expandBtnSpan.textContent = "Cliquer sur ce bouton pour ouvrir la liste d'option";
        listbox.setAttribute('aria-expanded', false);
        options.forEach((option)=> {
            option.setAttribute('tabindex', -1);
            if ((option.getAttribute('aria-selected')) == "false") { 
                ['option--notSelected', 'option--selected'].map(element => option.classList.toggle(element));
            };
        })   
    };
};


//////////// Evenement sur le bouton expand de la listbox /////////////////

//au  clic sur le bouton expand
expandBtn.addEventListener('click', function(e){
    e.preventDefault();
    changeListboxDisplay();
});

 //avec ENTRER sur le bouton expand
 expandBtn.addEventListener('keyup', function(e){
    e.preventDefault();
    if (e.key === "Enter") {
        changeListboxDisplay();
    };
});
