class PhotographerHeader {

    /**
     * @param {Object} photographerData 
     */

    constructor(photographerData) {
        this._photographerData = photographerData;
    };

    createPhotographerHeader () {

        //.photographer-profile
        const photographerProfile = document.querySelector('.photographer-profile');
        
        const h1 = document.createElement("h1");
        h1.textContent = this._photographerData.name;
        h1.setAttribute("tabindex", "2");

        
        // crée le paragraphe texte statique
        const paragraphe = document.createElement('p'); //ajout
        paragraphe.classList.add("text");
        paragraphe.setAttribute('tabindex', "3");

        const textLocation = document.createElement("p");
        textLocation.classList.add('text-location');
        textLocation.textContent = this._photographerData.city + ", " + this._photographerData.country;
        //location.setAttribute("tabindex", "3");

        const textTagline = document.createElement('p');
        textTagline.textContent = this._photographerData.tagline;

        paragraphe.appendChild(textLocation); //ajout
        paragraphe.appendChild(textTagline); //ajout

        photographerProfile.appendChild(h1);
        photographerProfile.appendChild(paragraphe);


        //Element .user
        const user = document.querySelector('.photograph-header .user-container');
        
        const img = document.createElement("img");
        img.setAttribute("src", `assets/photographers/photographers_ID_photos/${this._photographerData.portrait}`);
        img.classList.add('user');
        img.setAttribute("tabindex", "5");

        user.appendChild(img);

    };

};