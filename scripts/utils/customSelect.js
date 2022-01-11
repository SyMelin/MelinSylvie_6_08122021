const sortSelect = document.getElementById("sort-select");
const options = [].slice.call(sortSelect.children);

const selectCopy = document.querySelector(".select-copy");
const optionsCopy = [].slice.call(selectCopy.children);;
optionsCopy.forEach((option) => {
    option.addEventListener("click", function(e){
        //console.log(option + " a été cliquée");
        e.preventDefault();
        
        option.setAttribute("selected", true);
        console.log("au clic, on attribut option cliquée", option.getAttribute("selected"));

        let optionIndex = optionsCopy.indexOf(option);
        let optionSelected = options[optionIndex];
        if (selectCopy.classList.contains("select-open")){

            optionsCopy.forEach((option) => {
                console.log("Attribut selected", option.getAttribute("selected"));
                if ((option.getAttribute("selected")) == "false"){
                    option.classList.remove("option-selected");
                    option.classList.add("option-notSelected");
                    console.log("AHHHHHHH", option.className);
                };
            });

            console.log(optionsCopy[optionIndex].className);

            //on ferme les options du select
            expandBtn.classList.toggle("expandBtn-less");
            selectCopy.classList.toggle("select-open");
            selectCopy.classList.toggle("select-close");

            
           
        // console.log(optionSelected);
            let optionSelectedValue = optionSelected.getAttribute("value")
            //console.log(optionSelectedValue);
            sortSelect.value = optionSelectedValue;

            //On vide le conteneur de cartes media
            const mediaWrapper = document.querySelector(".mediaWrapper");
            mediaWrapper.parentElement.removeChild(mediaWrapper);

            //On crée un nouveau fltre en fonction de select.value et on réaffiche les cartes media
            const filter = new FilterFactory(sortSelect.value, photographerMedia);
            filter.createAFilter();
            displayMedia(photographerMedia);

        };

    });

});

const expandBtn = document.querySelector(".expandBtn");
expandBtn.addEventListener("click", function(e){
    e.preventDefault();
    console.log("HELLOOO");

    expandBtn.classList.toggle("expandBtn-less");
    selectCopy.setAttribute("selected", true);
    selectCopy.classList.toggle("select-open");
    selectCopy.classList.toggle("select-close");

    optionsCopy.forEach((option) => {
        option.setAttribute("selected", false);
        //console.log(option.getAttribute("selected"));
        option.style.cursor = "pointer";
        if (option.classList.contains("option-notSelected")) {
            option.classList.remove("option-notSelected");
            option.classList.add("option-selected");
        };
        //console.log("Etat à l'ouverture des choix : ", option.className);
    });






    
});