//La class PhotographerHeader remplit l'éléménent photographer-header de la page d'un photographe
class PhotographerHeader {

    /**
     * @param {Object} photographerData 
     */

    constructor(photographerData) {
        this._photographerData = photographerData;
    };

    createPhotographerHeader () {

        //Rempli l'élément .photographer-profile
        const photographerProfile = document.querySelector('.photographer-profile');
        
        const h1 = document.createElement("h1");
        h1.textContent = this._photographerData.name;
        h1.setAttribute("tabindex", "0");
        h1.classList.add("tabindex0", "inMain");

        
        // Crée le paragraphe texte statique
        const paragraphe = document.createElement('p');
        paragraphe.setAttribute('tabindex', "0");
        paragraphe.classList.add("text", "tabindex0", "inMain");


        const textLocation = document.createElement("p");
        textLocation.classList.add('text-location');
        textLocation.textContent = this._photographerData.city + ", " + this._photographerData.country;

        const textTagline = document.createElement('p');
        textTagline.textContent = this._photographerData.tagline;

        [textLocation, textTagline].map(element => paragraphe.appendChild(element));
        [h1, paragraphe].map(element => photographerProfile.appendChild(element));


        //Element .user
        const user = document.querySelector('.photograph-header .user-container');
        
        const img = document.createElement("img");
        img.setAttribute("src", `assets/photographers/photographers_ID_photos/${this._photographerData.portrait}`);
        img.setAttribute("tabindex", "0");
        img.setAttribute("aria", this._photographerData.alt);
        img.classList.add('user', 'tabindex0', 'inMain');

        user.appendChild(img);
    };
};