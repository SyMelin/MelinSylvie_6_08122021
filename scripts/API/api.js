class Api {
    constructor (url) {
        this._url = url;
    };
    
    //Un tableau contenant tous les photographes est retourné
    async getPhotographers () {
        return fetch(this._url) //on interroge le service web: ici le fichier json est déjà fourni en exemple
                .then(function(res) {
                    if (res.ok) {
                        return res.json(); //si la requête s'est bien passée, les données sont retournées au format JSON
                    }
                })
                .then(function(value) { //les données profil concernant les photographes sont retournées
                    return value.photographers;
                })
                .catch(function(err){ //En cas d'erreur, la fonction affixhe le type d'erreur
                    console.log(err);
                });
    };

    //Un tableau contenant tous les media est retourné
    async getMedia () {
        return fetch(this._url)
                .then(function(res) {
                    if (res.ok) {
                        return res.json();
                    }
                })
                .then(function(value) { //les données concernant tous les media sont retournées
                    return value.media;
                })
                .catch(function(err){ //En cas d'erreur, la fonction affixhe le type d'erreur
                    console.log(err);
                });
    };

    //Un tableau contenant les données profile d'un photographe est retourné
    async getPhotographerProfile () {
        return fetch(this._url)
                .then(function(res) {
                    if (res.ok) {
                        return res.json();
                    }
                })
                .then(function(value) {
                    let photographers;
                    return photographers = value.photographers;
                })
                .then (function(photographers) {
                    const idPhotographer = getId();
                    let photographerIndex;
                    let photographerProfile;
                    //On parcourt tous les photographes, on récupère l'index du photographe dont l'id correspond à l'id du photographe de la page, puis on récupère l'élément de à l'index correspondant 
                    for (let photographer of photographers){
                        if (photographer.id == idPhotographer) {
                            //photographerData.push(photographer);
                            photographerIndex = photographers.indexOf(photographer);
                            photographerProfile = photographers[photographerIndex];
                        };
                    };
                    console.log("photographerProfil", photographerProfile);
                    return photographerProfile;
                })
                .catch(function(err){
                    console.log(err);
                });
    };

    //Un tableau contenant les media d'un photographe est retourné
    async getPhotographerMedia () {
        return fetch(this._url)
                .then(function(res) {
                    if (res.ok) {
                        return res.json();
                    }
                })
                .then(function(value) {
                    let media;
                    return media = value.media;
                })
                //On parcourt tous les media et on récupère les medias dont l'id correspond à l'id du photographe de la page
                .then (function(media) {
                    const idPhotographer = getId();
                    let photographerMedia = [];
                    for (let mediaItem of media){
                        if (mediaItem.photographerId == idPhotographer) {
                            photographerMedia.push(mediaItem);
                        };
                    };
                    console.log("photographerMedia", photographerMedia);
                    return photographerMedia;
                })
                .catch(function(err){
                    console.log(err);
                });
    };

};