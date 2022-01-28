class CustomSelect {

    /**
     * @param {HTMLElement} element select
     */

    constructor (element) {
        this._element = element;
    }

}

const sortSelect = document.getElementById("sort-select");
const options = [].slice.call(sortSelect.children);

const selectCopy = document.querySelector(".select-copy");
const optionsCopy = [].slice.call(selectCopy.children);

const expandBtn = document.querySelector(".expandBtn");



//////////// Fonction utile pour l'évenement sur une option de la listbox /////////////////

function selectAnOption (option) {

    optionsCopy.forEach((childOption) => {
        childOption.setAttribute("aria-selected", false);
    });
    
    selectCopy.setAttribute("aria-expanded", "false");
    selectCopy.focus();
    
    //Au clic, on attribut option cliquée", option.getAttribute("aria-selected"));
    option.setAttribute("aria-selected", true);
    
    //On récupère l'id de l'option cliquée
    let optionSelected = option.getAttribute("id");

    if (selectCopy.classList.contains("select-open")){

        optionsCopy.forEach((childOption) => {
            //console.log("Attribut aria-selected", option.getAttribute("aria-selected"));
            if ((childOption.getAttribute("aria-selected")) == "false"){
                childOption.classList.remove("option-selected");
                childOption.classList.add("option-notSelected");
            };
        });

        //on ferme les options du select
        expandBtn.setAttribute("aria-expanded", "false");
        expandBtn.classList.toggle("expandBtn-less");
        selectCopy.classList.toggle("select-open");
        selectCopy.classList.toggle("select-close");


        //On vide le conteneur de cartes media
        const mediaWrapper = document.querySelector(".mediaWrapper");
        mediaWrapper.parentElement.removeChild(mediaWrapper);

        //On crée un nouveau filtre en fonction de select.value et on réaffiche les cartes media
      
        sortSelect.value = optionSelected
        const filter = new FilterFactory(sortSelect.value, photographerMedia);
        filter.createAFilter();
        displayMedia(photographerMedia);

    };
};


//////////// Evenement sur une option de la listbox /////////////////

//au  clic sur une option
optionsCopy.forEach((option) => {
    option.addEventListener("click", function(e){
        //console.log(option + " a été cliquée");
        e.preventDefault();
        selectAnOption(option);
    });
});

//avec ENTER sur une option
optionsCopy.forEach((option) => {
    option.addEventListener("keyup", function(e){
        e.preventDefault();
        if (e.key === "Enter") {
            selectAnOption(option);
        };
    });
});



//////////// Fonction utile pour !'évenement sur le bouton expand du select /////////////////

function changeSelectDisplay () {

    let state = selectCopy.getAttribute("aria-expanded");
    console.log(state);

    //on affiche le menu select
    expandBtn.setAttribute("aria-expanded", "true");
    expandBtn.classList.toggle("expandBtn-less");
    selectCopy.classList.toggle("select-open");
    selectCopy.classList.toggle("select-close");

    selectCopy.focus();

    optionsCopy.forEach((option) => {
        option.style.cursor = "pointer";
        if (option.classList.contains("option-notSelected")) {
            option.classList.remove("option-notSelected");
            option.classList.add("option-selected");
        };
        //console.log("Etat à l'ouverture des choix : ", option.className);
    });

    //Selon l'état du select enregistré au clic
    if (state == "false") {
        console.log("on vient de boucler");
        selectCopy.setAttribute("aria-expanded", "true");
        console.log(selectCopy.getAttribute("aria-expanded"));
    } else {
        console.log("on vient d'ouvrir et on veut refermer")
        expandBtn.setAttribute("aria-expanded", "false");
        selectCopy.setAttribute("aria-expanded", "false");
        console.log(selectCopy.getAttribute("aria-expanded"));
        optionsCopy.forEach((option)=> {

            if ((option.getAttribute("aria-selected")) !== "true") {
                option.classList.remove("option-selected");
                option.classList.add("option-notSelected");
            };
        })   
    };
};


//////////// Evenement sur le bouton expand du select /////////////////

//au  clic sur le bouton expand
expandBtn.addEventListener("click", function(e){
    e.preventDefault();
    changeSelectDisplay();
});

 //avec ENTRER sur le bouton expand
 expandBtn.addEventListener("keyup", function(e){
    e.preventDefault();
    if (e.key === "Enter") {
        changeSelectDisplay;
    };
});
