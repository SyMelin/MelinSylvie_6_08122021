const apiPhotographers = fetch("../data/photographers.json") //on interroge le service web: ici le fichier json est déjà fourni en exemple
            .then(function(res) {
                if (res.ok) {
                    return res.json(); //si la requête s'est bien passée, les données sont retournées au format JSON
                }
            })
            .then(function(value) { //les données concernant les photogrpahes sont retournées
                return value.photographers;
            })
            .catch(function(err){ //En cas d'erreur, la fonction affixhe le type d'erreur
                console.log(err);
            });


const apiMedia = fetch("../data/photographers.json") //on interroge le service web: ici le fichier json est déjà fourni en exemple
                            .then(function(res) {
                                if (res.ok) {
                                    return res.json(); //si la requête s'est bien passée, les données sont retournées au format JSON
                                }
                            })
                            .then(function(value) { //les données concernant les photogrpahes sont retournées
                                return value.media;
                            })
                            .catch(function(err){ //En cas d'erreur, la fonction affixhe le type d'erreur
                                console.log(err);
                            });
                            

const aTest =  fetch("../data/photographers.json") //on interroge le service web: ici le fichier json est déjà fourni en exemple
                .then(function(res) {
                    if (res.ok) {
                        return res.json(); //si la requête s'est bien passée, les données sont retournées au format JSON
                    }
                })
                .then(function(value) {
                    let mediaAll;
                    //console.log("mediAll");
                    return mediaAll = value.media;
                })
                .then(function(mediaAll) {
                    let photographerMedia = [];
                    for (let mediaItem of mediaAll) {
                        if (mediaItem.photographerId == id) {
                            photographerMedia.push(mediaItem);
                        };
                    };
                    console.log("phMediaId", photographerMedia);
                    return photographerMedia;
                })
                .catch(function(err){ //En cas d'erreur, la fonction affixhe le type d'erreur
                    console.log(err);
                });
