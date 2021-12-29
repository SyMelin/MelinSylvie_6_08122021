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