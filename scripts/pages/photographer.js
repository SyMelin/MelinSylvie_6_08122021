//Mettre le code JavaScript lié à la page photographer.html

//Récupère l'id du photographe contenu dans l'url de la page photopgrapher.html
function getId() {

    const param = window.location.search;
    console.log(param);
    const idPhotographer = param.replace("?id=", ""); //retire ?id= des pramètres de l'URL, récupère uniquement l'identifiant
    console.log(idPhotographer);
    return idPhotographer;
}




async function getMedia() {
    const media = await apiMedia;
    console.log(media);
    return media;
};

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

async function displayMedia(batch){
    const mediaWrapper = document.createElement('div');
    mediaWrapper.classList.add("mediaWrapper");
    const main = document.getElementById("main");
    main.appendChild(mediaWrapper);
    for (let item of batch) {
        const box = document.createElement("div");
        box.innerHTML="<p>test</p>";
        mediaWrapper.appendChild(box);
    };
};

async function TEST2() {
    const batch = await TEST();
    return displayMedia(batch);
}

TEST2();