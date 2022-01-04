//consigne : Mettre le code JavaScript lié à la page photographer.html

//Récupère l'id du photographe contenu dans l'url de la page photopgrapher.html
function getId() {

    const param = window.location.search;
    //console.log(param);
    const idPhotographer = param.replace("?id=", ""); //retire ?id= des pramètres de l'URL, récupère uniquement l'identifiant
    //console.log(idPhotographer);
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
    mediaWrapper.classList.add("mediaWrapper");
    mediaWrapper.style.display = "flex";
    mediaWrapper.style.justifyContent = "space-between";
    mediaWrapper.style.flexWrap ="wrap";
    const main = document.getElementById("main");
    main.appendChild(mediaWrapper);
    //console.log("photographerMediaTest2", photographerMedia);
    for (let mediaItem of photographerMedia) {
        const template = new MediaItemCard(mediaItem);
        const mediaItemCard = template.createMediaItemCard();
        mediaWrapper.appendChild(mediaItemCard);
    };
};


//Initialise la page photographer.html
async function initPhotographer() {
    //const idPhotographer = getId();
    const api = new Api("../data/photographers.json"); 
    const photographerProfile = await api.getPhotographerProfile();
    displayPhotographerHeader(photographerProfile);
    const photographerMedia = await api.getPhotographerMedia();
    displayMedia(photographerMedia);
};

initPhotographer();
