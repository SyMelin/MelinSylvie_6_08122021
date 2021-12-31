//Mettre le code JavaScript lié à la page photographer.html

//Récupère l'id du photographe contenu dans l'url de la page photopgrapher.html
function getId() {

    const param = window.location.search;
    //console.log(param);
    const idPhotographer = param.replace("?id=", ""); //retire ?id= des pramètres de l'URL, récupère uniquement l'identifiant
    //console.log(idPhotographer);
    return idPhotographer;
}

//Récupère tous les photographes
async function getPhotographers() {
    const photographers = await apiPhotographers;
    //console.log(media);
    return photographers;
};

//Récupère les données profil du photographe grâce à l'id récupéré depuis l'URL
async function getPhotographerData(photographers, idPhotographer) {
    let photographerIndex;
    let photographerData;
    for (let photographer of photographers){
        if (photographer.id == idPhotographer) {
            //photographerData.push(photographer);
            photographerIndex = photographers.indexOf(photographer);
            photographerData = photographers[photographerIndex];
        };
    };
    console.log("photographerData", photographerData);
    return photographerData;
};

async function PHData() {
    const photographers = await getPhotographers();
    const idPhotographer = getId();
    console.log(getPhotographerData(photographers, idPhotographer));
    return getPhotographerData(photographers, idPhotographer);
}

PHData();

async function displayPhotographerHeader(photographerData) {
    const template = new PhotographerHeader(photographerData);
    return photographerHeader = template.createPhotographerHeader();
}

async function TEST3() {
    const photographerData = await PHData();
    console.log("Test3", photographerData);
    return displayPhotographerHeader(photographerData);
}

TEST3();


//Récupère tous les media
async function getMedia() {
    const media = await apiMedia;
    //console.log(media);
    return media;
};


//Récupère les media du photographe de la page grâce à l'id récupéré depuis l'URL
async function getPhotographerMedia(media, idPhotographer) {
    let photographerMedia = [];
    for (let medium of media){
        if (medium.photographerId == idPhotographer) {
            photographerMedia.push(medium);
        };
    };
    return photographerMedia;
};

async function TEST() {
    const media = await getMedia();
    const idPhotographer = getId();
    return getPhotographerMedia(media, idPhotographer);
};

TEST();

//Affiche les medias su la page du photographe
async function displayMedia(batch){
    const mediaWrapper = document.createElement('div');
    mediaWrapper.classList.add("mediaWrapper");
    mediaWrapper.style.display = "flex";
    mediaWrapper.style.justifyContent = "space-between";
    mediaWrapper.style.flexWrap ="wrap";
    const main = document.getElementById("main");
    main.appendChild(mediaWrapper);
    console.log("batchTest", batch);
    for (let mediaItem of batch) {
        const template = new MediaItemCard(mediaItem);
        const mediaItemCard = template.createMediaItemCard();
        mediaWrapper.appendChild(mediaItemCard);
    };
};

async function TEST2() {
    const batch = await TEST();
    console.log("batchTest2", batch);
    return displayMedia(batch);
}

TEST2();