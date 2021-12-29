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
        
        const img = document.createElement("img");
        
        const title = document.createElement("p");
        title.textContent = item.title;

        const like = document.createElement("p");
        like.textContent = item.likes;

        box.appendChild(img);
        box.appendChild(title);
        box.appendChild(like);

        mediaWrapper.appendChild(box);
    };
};

async function TEST2() {
    const batch = await TEST();
    console.log(batch);
    return displayMedia(batch);
}

TEST2();