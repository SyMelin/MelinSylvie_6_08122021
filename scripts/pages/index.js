/**
 * code JavaScript lié à la page index.html
*/

import { manageFocusOutline } from "../utils/utils.js";


// eslint-disable-next-line no-unused-vars
//export let allTabindex0;


//Affiche le profil de chaque photographe
async function displayData(photographers) {
    const photographersSection = document.querySelector('.photographer_section');
    photographers.forEach((photographer) => {
        // eslint-disable-next-line no-undef
        const userCardDOM = new PhotographerThumb(photographer).getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

//Initialise la page index.html
async function init() {

    //On met le focus sur l'image-lien logo du site
    const headerLink = document.getElementById("header__link");
    headerLink.focus();

    //On affiche les UserCards des photographes
    // eslint-disable-next-line no-undef
    const api = new Api("data/photographers.json"); 
    const photographers = await api.getPhotographersWithoutAlt(); //On récupère tous les photographes
    displayData(photographers);

    //On personnalise le rendu du focus des éléménts
    // eslint-disable-next-line no-undef
    manageFocusOutline();

}

init();