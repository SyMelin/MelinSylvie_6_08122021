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
const optionsCopy = [].slice.call(selectCopy.children);;
optionsCopy.forEach((option) => {
    option.addEventListener("click", function(e){
        //console.log(option + " a été cliquée");
        e.preventDefault();
        
        optionsCopy.forEach((option) => {
            option.setAttribute("selected", false);
        });
        
        selectCopy.setAttribute("selected", "false");
        
        //Au clic, on attribut option cliquée", option.getAttribute("selected"));
        option.setAttribute("selected", true);
        
        //On récupère l'id de l'option cliquée
        let optionSelected = option.getAttribute("id");

        if (selectCopy.classList.contains("select-open")){

            optionsCopy.forEach((option) => {
                //console.log("Attribut selected", option.getAttribute("selected"));
                if ((option.getAttribute("selected")) == "false"){
                    option.classList.remove("option-selected");
                    option.classList.add("option-notSelected");
                };
            });

            //on ferme les options du select
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

    });

});

//Evenement sur le bouton expand du select

const expandBtn = document.querySelector(".expandBtn");
expandBtn.addEventListener("click", function(e){
    e.preventDefault();

    let state = selectCopy.getAttribute("selected");
    console.log(state);

    //on affiche le menu select
    expandBtn.classList.toggle("expandBtn-less");
    selectCopy.classList.toggle("select-open");
    selectCopy.classList.toggle("select-close");

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
        selectCopy.setAttribute("selected", "true");
        console.log(selectCopy.getAttribute("selected"));
    } else {
        console.log("on vient d'ouvrir et on veut refermer")
        selectCopy.setAttribute("selected", "false");
        console.log(selectCopy.getAttribute("selected"));
        optionsCopy.forEach((option)=> {

            if ((option.getAttribute("selected")) !== "true") {
                option.classList.remove("option-selected");
                option.classList.add("option-notSelected");
            };
        })   
    }
});