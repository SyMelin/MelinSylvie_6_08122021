/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/**
 * code JavaScript lié à la page photographer.html
*/

// Calcul la somme totale des likes de medias cumulés
export function sumLikes(media) {
    likeTotal = 0;
    for (let mediaItem of media) {
        likeTotal += mediaItem.likes;
    }
    const totalLikes = document.getElementById('totalLikes');
    totalLikes.textContent = likeTotal;
    return likeTotal;
}

import MediaItemCard from "../templates/mediaItemCard.js";
import PhotographerInfo from "../templates/photographerInfo.js";
import Filter from "../factories/filterFactory.js";
import Modal from "../factories/modal.js";
import { manageFocusOutline } from "../utils/utils.js";

//Affiche les medias sur la page du photographe
export async function displayMedia(media){
    
    //Crée le conteneur de media
    const mediaWrapper = document.createElement('div');
    mediaWrapper.classList.add('mediaWrapper', 'inMain');

    //Ajout de chaque media au conteneur
    for (let mediaItem of media) {
        // eslint-disable-next-line no-undef
        const mediaItemCard = new MediaItemCard(mediaItem).createMediaItemCard();
        mediaWrapper.appendChild(mediaItemCard);
    }
    
    //Ajout du conteneur au main
    const main = document.getElementById('main');
    main.appendChild(mediaWrapper);  
}


// Initialise la page photographer.html
async function initPhotographer() {

    //On met le focus sur l'image-lien logo du site
    const headerLink = document.getElementById("header__link");
    headerLink.focus();

    //Récupération des données du photographe
    // eslint-disable-next-line no-undef
    const api = new Api("data/photographers.json");
    photographerData = await api.getPhotographerData();
    photographerProfile = photographerData.profile;
    photographerMedia = photographerData.media;

    //Affichage des données profil du photographe
    // eslint-disable-next-line no-undef
    new PhotographerHeader(photographerProfile).createPhotographerHeader();

    //Affichage des données supplémentaires
    sumLikes(photographerMedia);
    new PhotographerInfo(photographerProfile).createPhotographerInfo();

    //Media filtrés par date par défaut au chargement
    new Filter('date', photographerMedia);

    //Affichage des média
    displayMedia(photographerMedia);

    //Initialisation de la modale
    new Modal('', 'init').createModal();

    //On personnalise le rendu du focus des éléménts
    manageFocusOutline();
}


initPhotographer();