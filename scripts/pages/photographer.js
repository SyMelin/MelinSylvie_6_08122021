//consigne : Mettre le code JavaScript lié à la page photographer.html


//Déclaration des variables utiles
const api = new Api("../data/photographers.json");
let photographerProfile;
let photographerMedia;

let mediaCardAll = document.getElementsByClassName("thumb-imgfull");

let likeTotal = 0;


//Récupère l'id du photographe contenu dans l'url de la page photographer.html
function getId() {

    const param = window.location.search;
    const idPhotographer = param.replace("?id=", ""); //retire ?id= des pramètres de l'URL, récupère uniquement l'identifiant
    return idPhotographer;
};

//Affiche le header complété de la page du photographe
async function displayPhotographerHeader(photographerData) {
    const template = new PhotographerHeader(photographerData);
    return photographerHeader = template.createPhotographerHeader();
};

//Affiche les medias sur la page du photographe
async function displayMedia(photographerMedia){
    
    const mediaWrapper = document.createElement('div');
    mediaWrapper.classList.add("mediaWrapper", "inMain");
    
    const main = document.getElementById("main");
    main.appendChild(mediaWrapper);

    for (let mediaItem of photographerMedia) {
        const template = new MediaItemCard(mediaItem);
        const mediaItemCard = template.createMediaItemCard();
        mediaWrapper.appendChild(mediaItemCard);
    };
};

// Calcul la somme totale des likes de medias cumulés
function sumLikes() {
    likeTotal = 0;
    for (let mediaItem of photographerMedia) {
        likeTotal += mediaItem.likes;
    };
    const totalLikes = document.getElementById("totalLikes");
    totalLikes.textContent = likeTotal;
    return likeTotal;
};

//Affiche les infos supplémentaires
async function displayInfo(photographerData){
    const template = new PhotographerInfo(photographerData);
    return photographerInfo = template.createPhotographerInfo();
};


////////////// Initialise la page photographer.html ////////////////
async function initPhotographer() {
    
    //const idPhotographer = getId();
    //const api = new Api("../data/photographers.json"); 

    //Récupération des données profil du photographe
    photographerProfile = await api.getPhotographerProfileWithAlt();

    //Affichage des données profil du photographe
    displayPhotographerHeader(photographerProfile);
    
    //Récupération des données media du photographe
    photographerMedia = await api.getPhotographerMedia();

    //Media filtrer par popularité par défaut
    new Filter('date', photographerMedia);

    //Affichage des média
    displayMedia(photographerMedia);

    sumLikes();
    displayInfo(photographerProfile);

    let modal = new Modal('', 'init');
    modal.createModal();

};

initPhotographer();

