// La class PhotographerThumb crée le composant UserCard pour un photographe donné pour la page index
class PhotographerThumb {

    /**
     * @param {Object} photographer 
     */

    constructor(photographer) {
        this._photographer = photographer;
    };

    //Crée la structure de l'élément UserCard
    getUserCardDOM() {

        console.log("HELLO", this._photographer);
        
        const article = document.createElement('article');
        article.classList.add("thumb-photographer");

        // crée le lien img + h2
        const link = document.createElement('a');
        link.setAttribute('href', "../photographer.html?id=" + this._photographer.id);
        link.setAttribute('title', this._photographer.name + "-page");
        link.setAttribute('aria-label', this._photographer.name);
       
        const img = document.createElement('img');
        img.setAttribute('src', `assets/photographers/photographers_ID_photos/${this._photographer.portrait}`);
        img.setAttribute('role', 'link');
        img.setAttribute('alt', this._photographer.alt);
        img.classList.add('user');
       
        const h2 = document.createElement( 'h2' );
        h2.textContent = this._photographer.name;
        
        [img, h2].map(element => link.appendChild(element));        
        article.appendChild(link);

        // crée le paragraphe texte statique
        /* L'élément <span class="pause screenreader-text"> sert à marquer une pause dans la lecture du texte par le lecteur d'écran*/

        const paragraphe = document.createElement('p');
        paragraphe.setAttribute("aria-label", this._photographer.name+" informations");
        paragraphe.setAttribute('tabindex', '0');
        paragraphe.classList.add('tabindex0');

        const paragrapheSpan = document.createElement('span');
        paragrapheSpan.innerText = this._photographer.name+" informations.";
        paragrapheSpan.classList.add("screenreader-text");

        const location = document.createElement('p');
        location.innerHTML = `${this._photographer.city}, ${this._photographer.country}<span class="pause screenreader-text">.</span>`;
        location.setAttribute("aria-label", "location");
        location.classList.add('text-location');
        
        const tagline = document.createElement('p');
        tagline.innerHTML = `${this._photographer.tagline}<span class=" pause screenreader-text">.</span>`;
        tagline.setAttribute("aria-label", "tagline");
        
        const price = document.createElement('div');
        price.setAttribute("aria-label", "price");

        const priceText = document.createElement('p');
        priceText.textContent = this._photographer.price +"€/jour";
        priceText.setAttribute("aria-hidden", true);
        //Ajout de span pour accessibilité de price
        const priceSpan = document.createElement('span');
        priceSpan.textContent = this._photographer.price +"€ par jour";
        priceSpan.classList.add("screenreader-text");

        [priceText, priceSpan].map(element => price.appendChild(element));
        [location, tagline, price].map(element => paragraphe.appendChild(element));
        article.appendChild(paragraphe);
        
        return (article);
    };
};