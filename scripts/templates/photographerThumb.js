// Crée le composant UserCard pour un photographe donné
class PhotographerThumb {

    /**
     * @param {Object} photographer 
     */

    constructor(photographer) {
        this._photographer = photographer;
    };

    //Crée la structure de l'élément UserCard
    getUserCardDOM() {
        
        const article = document.createElement('article');
        article.classList.add("thumb-photographer");

        // crée le lien img + h2
        const link = document.createElement('a');
        link.setAttribute('href', "../photographer.html?id=" + this._photographer.id);
        link.setAttribute('title', this._photographer.name + "-page");
        link.setAttribute('aria-label', `${this._photographer.name}`);
       
        const img = document.createElement('img');
        img.classList.add('user');
        img.setAttribute('src', `assets/photographers/photographers_ID_photos/${this._photographer.portrait}`);
        img.setAttribute('role', 'link');
        img.setAttribute('alt', this._photographer.alt);
       
        const h2 = document.createElement( 'h2' );
        h2.textContent = this._photographer.name;
        
        link.appendChild(img);
        link.appendChild(h2);
        
        article.appendChild(link);

        // crée le paragraphe texte statique
        const paragraphe = document.createElement('p');
        paragraphe.setAttribute('tabindex', "0");
       
        const textLocation = document.createElement('p');
        textLocation.classList.add('text-location');
        textLocation.textContent = this._photographer.city + ", " + this._photographer.country;
        
        const textTagline = document.createElement('p');
        textTagline.textContent = this._photographer.tagline;
        
        const textPrice = document.createElement('p');
        textPrice.textContent = this._photographer.price +"€/jour";
        textPrice.setAttribute("aria-hidden", true);
        const textPriceSpan = document.createElement('span');
        textPriceSpan.classList.add("screenreader-text");
        textPriceSpan.textContent = this._photographer.price +"€ par jour";
        
        paragraphe.appendChild(textLocation);
        paragraphe.appendChild(textTagline);
        paragraphe.appendChild(textPrice);
        paragraphe.appendChild(textPriceSpan);
       
        article.appendChild(paragraphe);
        
        return (article);
    };
};