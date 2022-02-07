class Api {

    /**
     * @param {URL} url url de récupération des données (ici, chemin du fichier json)
     */

    constructor (url) {
        this._url = url;
    }

    //Un tableau contenant tous les objets données profil des photographes est retourné - sans attribut alt
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


    //Un tableau donnée photographe contenant l'objet données profil et le tableau données média d'un photographe précis est retourné
    async getPhotographerData () {
        return fetch(this._url)
                .then(function(res) {
                    if (res.ok) {
                        return res.json();
                    }
                })
                .then(function(value){

                    //On récupère l'id du photographe concerné par la page en cours
                    const idPhotographer = getId(); //fonction définie dans le fichier pages/photgraphers.js
                    let photographerIndex;

                    //On crée un objet dans lequel on  stockera les données du photographe
                    let photographerData = new Object ();


                    //On récupère les données de profil du photographe
                    let photographerProfile;
                    //On parcourt tous les photographes
                    for (let photographer of value.photographers){
                        if (photographer.id == idPhotographer) {
                            //On ajoute l'attribut ALT complété par le nom du photographe
                            if (!photographer.alt || photographer.alt == ""){
                                photographer.alt = String(photographer.name);
                            }
                            //On récupère l'index du photographe dont l'id correspond à l'id du photographe de la page, puis on récupère l'objet profil à l'index correspondant 
                            photographerIndex = value.photographers.indexOf(photographer);
                            photographerProfile = value.photographers[photographerIndex];
                        };
                    };
                    //On stocke l'objet de profil dans l'objet données du photographe
                    photographerData.profile =  photographerProfile;

                    //On récupère tous les objets média du photographe dans un tableau
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
                    //On ajoute le tableau de données média du photographe à l'entrée media de l'objet globale de données photographe
                    photographerData.media =  photographerMedia;

                    return photographerData;
                })
                .catch(function(err){
                    console.log(err);
                });
    };
};