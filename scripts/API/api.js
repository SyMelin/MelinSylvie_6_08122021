class Api {

    constructor (url) {
        this._url = url;
    }

    
    //Un tableau contenant tous les photographes est retourné - sans attribut alt
    async getPhotographersWithoutAlt () {
        return fetch(this._url) //on interroge le service web: ici le fichier json est déjà fourni en exemple
                .then(function(res) {
                    if (res.ok) {
                        return res.json(); //si la requête s'est bien passée, les données sont retournées au format JSON
                    }
                })
                .then(function(value) { //les données profil concernant les photographes sont retournées
                    let photographers;
                    return photographers = value.photographers;
                })
                //ajout de la propriété ALT
                .then(function(photographers){
                    console.log("photographers", photographers);
                    for (let photographer of photographers){
                       // console.log(photographer.name)
                       /*
                        if (!photographer.alt || photographer.alt == ""){
                            photographer.alt = String(photographer.name);
                        };
                        */
                       if (!photographer.alt || photographer.alt !== "") {
                           photographer.alt = "";
                       }
                        console.log(photographer);
                       // console.log(photographer.alt);
                    };
                    return photographers;
                })
                .catch(function(err){ //En cas d'erreur, la fonction affiche le type d'erreur
                    console.log(err);
                });
    };
/*
     //Un tableau contenant tous les photographes est retourné - avec d'attribut alt
     async getPhotographersWithAlt () {
        return fetch(this._url) //on interroge le service web: ici le fichier json est déjà fourni en exemple
                .then(function(res) {
                    if (res.ok) {
                        return res.json(); //si la requête s'est bien passée, les données sont retournées au format JSON
                    }
                })
                .then(function(value) { //les données profil concernant les photographes sont retournées
                    let photographers;
                    return photographers = value.photographers;
                })
                //ajout de la propriété ALT
                .then(function(photographers){
                    console.log("photographers", photographers);
                    for (let photographer of photographers){
                       // console.log(photographer.name)
                        if (!photographer.alt || photographer.alt == ""){
                            photographer.alt = String(photographer.name);
                        };
                        console.log(photographer);
                      //  console.log(photographer.alt);
                    };
                    return photographers;
                })
                .catch(function(err){ //En cas d'erreur, la fonction affiche le type d'erreur
                    console.log(err);
                });
    };
*/
/*
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
*/

    //Un tableau contenant les données profile d'un photographe est retourné
    async getPhotographerProfileWithAlt () {
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
                .then(function(photographers){
                    console.log("photographers", photographers);
                    for (let photographer of photographers){
                      //  console.log(photographer.name)
                        if (!photographer.alt || photographer.alt == ""){
                            photographer.alt = String(photographer.name);
                        }
                        //console.log(photographer);
                        //console.log(photographer.alt);
                    };
                    return photographers;
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
                    };
                })
                .then(function(value) {
                    let media;
                    return media = value.media;
                })
                //Ajout de la propriété ALT
                .then (function(media) {
                    console.log("media", media);
                    for (let mediaItem of media){
                        if (!mediaItem.alt || mediaItem.alt == ""){
                            if (mediaItem.video){
                                mediaItem.alt =  String(mediaItem.video).replace(/\.[^/.]+$/, "").replaceAll("_", " ");
                                //Pour les videos, on ajoute la propriété TITLE
                                mediaItem.title = mediaItem.alt;
                            } else if (mediaItem.image) {
                                mediaItem.alt =  String(mediaItem.image).replace(/\.[^/.]+$/, "").replaceAll("_", " ");
                            } else {
                                mediaItem.alt = "";
                            };
                        };
                       // console.log(mediaItem);
                       // console.log(mediaItem.alt);
                    };
                    return media;
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