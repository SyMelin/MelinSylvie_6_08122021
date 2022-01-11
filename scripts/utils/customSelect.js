const sortSelect = document.getElementById("sort-select");
const options = [].slice.call(sortSelect.children);

const selectCopy = document.querySelector(".select-copy");
const optionsCopy = [].slice.call(selectCopy.children);
//console.log(optionsCopy);
optionsCopy.forEach((option) => {
    option.addEventListener("click", function(e){
        console.log(option + " a été cliquée");
        let optionIndex = optionsCopy.indexOf(option);
        //console.log("optionIndex", optionIndex);
        let optionSelected = options[optionIndex];
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

    });

});