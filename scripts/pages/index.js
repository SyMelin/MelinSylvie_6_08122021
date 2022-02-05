/**
 * code JavaScript lié à la page index.html
*/


//Affiche le profil de chaque photographe
async function displayData(photographers) {
    const photographersSection = document.querySelector('.photographer_section');
    photographers.forEach((photographer) => {
        const userCardDOM = new PhotographerThumb(photographer).getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

//Initialise la page index.html
async function init() {

    //On met le focus sur l'image-lien logo du site
    const headerLink = document.getElementById("header__link");
    headerLink.focus();

    //On affiche les UserCards
    const api = new Api("../data/photographers.json"); 
    const photographers = await api.getPhotographersWithoutAlt(); //On récupère tous les photographes
    displayData(photographers);
};

init();