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
                .then(function(value){
                    //ajout de la propriété ALT vide
                    for (let photographer of value.photographers){
                       if (!photographer.alt || photographer.alt !== "") {
                           photographer.alt = "";
                       }
                    };
                    return value.photographers; //les données profil concernant les photographes sont retournées
                })
                .catch(function(err){ //En cas d'erreur, la fonction affiche le type d'erreur
                    console.log(err);
                });
    };


    //Un tableau contenant les données profil d'un photographe est retourné
    async getPhotographerData () {
        return fetch(this._url)
                .then(function(res) {
                    if (res.ok) {
                        return res.json();
                    }
                })
                .then(function(value){

                    //On récupère l'id du photographe concerné par la page en cours
                    const idPhotographer = getId();
                    let photographerIndex;

                    //On crée un objet qui récupère les données du photographe
                    let photographerData = new Object ();


                    //On récupère les données de profil du photographe
                    let photographerProfile;
                    //On parcourt tous les photographes
                    for (let photographer of value.photographers){
                        if (photographer.id == idPhotographer) {
                            //On ajout l'attribut alt complété
                            if (!photographer.alt || photographer.alt == ""){
                                photographer.alt = String(photographer.name);
                            }
                            //On récupère l'index du photographe dont l'id correspond à l'id du photographe de la page, puis on récupère l'élément de à l'index correspondant 
                            photographerIndex = value.photographers.indexOf(photographer);
                            photographerProfile = value.photographers[photographerIndex];
                        };
                    };
                    photographerData.profile =  photographerProfile;

                    //On récupère les média du photographe
                    let photographerMedia = [];
                    for (let mediaItem of value.media){
                        if (mediaItem.photographerId == idPhotographer) {
                            if (!mediaItem.alt || mediaItem.alt == ""){
                                //On ajoute l'attribut ALT complété
                                if (mediaItem.image) {
                                    mediaItem.alt =  String(mediaItem.image).replace(/\.[^/.]+$/, "").replaceAll("_", " ");
                                } else if ( mediaItem.video){
                                    mediaItem.alt =  String(mediaItem.video).replace(/\.[^/.]+$/, "").replaceAll("_", " ");
                                    //Pour les videos, on ajoute la propriété TITLE
                                    mediaItem.title = mediaItem.alt;
                                } else {
                                    mediaItem.alt = "";
                                };
                            };
                            photographerMedia.push(mediaItem);
                        };
                    };
                    photographerData.media =  photographerMedia;

                    return photographerData;
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
                //On parcourt tous les media et on récupère les media dont l'id correspond à l'id du photographe de la page
                .then (function(value) {
                    const idPhotographer = getId();
                    let photographerMedia = [];
                    for (let mediaItem of value.media){
                        if (mediaItem.photographerId == idPhotographer) {
                            if (!mediaItem.alt || mediaItem.alt == ""){
                                //On ajoute l'attribut ALT complété
                                if (mediaItem.image) {
                                    mediaItem.alt =  String(mediaItem.image).replace(/\.[^/.]+$/, "").replaceAll("_", " ");
                                } else if ( mediaItem.video){
                                    mediaItem.alt =  String(mediaItem.video).replace(/\.[^/.]+$/, "").replaceAll("_", " ");
                                    //Pour les videos, on ajoute la propriété TITLE
                                    mediaItem.title = mediaItem.alt;
                                } else {
                                    mediaItem.alt = "";
                                };
                            };
                            photographerMedia.push(mediaItem);
                        };
                    };
                    return photographerMedia;
                })
                .catch(function(err){
                    console.log(err);
                });
    };
};