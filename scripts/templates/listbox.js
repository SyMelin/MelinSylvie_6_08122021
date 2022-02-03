class Listbox {

    /**
     * @param {HTMLElement} element listbox
     */

    constructor (element) {
        this._element = element;
    }

}

const listbox = document.querySelector(".listbox");
const options = Array.from(listbox.children);

const expandBtn = document.querySelector(".expandBtn");



//////////// Fonction utile pour l'évenement sur une option de la listbox /////////////////

function selectAnOption (option) {

    options.forEach((childOption) => {
        childOption.setAttribute("aria-selected", "false");
    });
    
    listbox.setAttribute("aria-expanded", "false");
    listbox.focus();
    
    //Au clic, on attribut option cliquée", option.getAttribute("aria-selected"));
    option.setAttribute("aria-selected", "true");
    
    //On récupère l'id de l'option cliquée
    let optionSelected = option.getAttribute("id");

    if (listbox.classList.contains("listbox-open")){

        options.forEach((childOption) => {
            if ((childOption.getAttribute("aria-selected")) == "false"){
                childOption.classList.remove("option-selected");
                childOption.classList.add("option-notSelected");
            };
        });

        //on ferme les options du select
        expandBtn.setAttribute("aria-expanded", "false");
        expandBtn.classList.toggle("expandBtn-less");
        listbox.classList.toggle("listbox-open");
        listbox.classList.toggle("listbox-close");


        //On vide le conteneur de cartes media
        const mediaWrapper = document.querySelector(".mediaWrapper");
        mediaWrapper.parentElement.removeChild(mediaWrapper);

        //On crée un nouveau filtre en fonction de Value et on réaffiche les cartes media
        new FilterFactory(optionSelected, photographerMedia);
        displayMedia(photographerMedia);

    };
};


//////////// Evenement sur une option de la listbox /////////////////

//au  clic sur une option
options.forEach((option) => {
    option.addEventListener("click", function(e){
        //console.log(option + " a été cliquée");
        e.preventDefault();
        selectAnOption(option);
    });
});

//avec ENTER sur une option
options.forEach((option) => {
    option.addEventListener("keyup", function(e){
        e.preventDefault();
        if (e.key === "Enter") {
            selectAnOption(option);
        };
    });
});



//////////// Fonction utile pour !'évenement sur le bouton expand de la listbox /////////////////

function changeListboxDisplay () {

    let state = listbox.getAttribute("aria-expanded");

    //on affiche les options de la listbox
    expandBtn.setAttribute("aria-expanded", "true");
    expandBtn.classList.toggle("expandBtn-less");
    listbox.classList.toggle("listbox-open");
    listbox.classList.toggle("listbox-close");

    listbox.focus();

    options.forEach((option) => {
        if (option.classList.contains("option-notSelected")) {
            ["option-notSelected", "option-selected" ].map(element => option.classList.toggle(element));
        };
    });

    //Selon l'état de la listbox enregistré au clic
    if (state == "false") {
       // console.log("on vient de boucler");
        listbox.setAttribute("aria-expanded", "true");
      //  console.log(listbox.getAttribute("aria-expanded"));
    } else {
       // console.log("on vient d'ouvrir et on veut refermer")
        expandBtn.setAttribute("aria-expanded", "false");
        listbox.setAttribute("aria-expanded", "false");
       // console.log(listbox.getAttribute("aria-expanded"));
        options.forEach((option)=> {

            if ((option.getAttribute("aria-selected")) !== "true") {
                ["option-notSelected", "option-selected" ].map(element => option.classList.toggle(element));
            };
        })   
    };
};


//////////// Evenement sur le bouton expand de la listbox /////////////////

//au  clic sur le bouton expand
expandBtn.addEventListener("click", function(e){
    e.preventDefault();
    changeListboxDisplay();
});

 //avec ENTRER sur le bouton expand
 expandBtn.addEventListener("keyup", function(e){
    e.preventDefault();
    if (e.key === "Enter") {
        changeListboxDisplay();
    };
});
