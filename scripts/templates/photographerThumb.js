// Crée le composant UserCard pour un photographe donné
class PhotographerThumb {

    constructor(photographer) {
        this._photographer = photographer;
    };

    //Crée la structure de l'élément UserCard
    getUserCardDOM() {
        
        const article = document.createElement('article');

        // crée le lien img + h2
        const link = document.createElement('a'); //ajout
        link.setAttribute('href', "../photographer.html?id=" + this._photographer.id); //ajout
        link.setAttribute('title', this._photographer.name + "-page"); //ajout
       
        const img = document.createElement('img');
        img.classList.add('user');
        img.setAttribute('src', `assets/photographers/photographers_ID_photos/${this._photographer.portrait}`);
        img.setAttribute('alt', this._photographer.name);
       
        const h2 = document.createElement( 'h2' );
        h2.textContent = this._photographer.name;
        
        link.appendChild(img);
        link.appendChild(h2);
        
        article.appendChild(link);

        // crée le paragraphe texte statique
        const paragraphe = document.createElement('p'); //ajout
       
        const textLocation = document.createElement('p'); //ajout
        textLocation.classList.add('text-location');
        textLocation.textContent = this._photographer.city + ", " + this._photographer.country; //ajout
        
        const textTagline = document.createElement('p'); //ajout
        textTagline.textContent = this._photographer.tagline; //ajout
        
        const textPrice = document.createElement('p'); //ajout
        textPrice.textContent = this._photographer.price +"€/jour"; //ajout
        
        paragraphe.appendChild(textLocation); //ajout
        paragraphe.appendChild(textTagline); //ajout
        paragraphe.appendChild(textPrice); //ajout
       
        article.appendChild(paragraphe); //ajout
        article.classList.add("thumb-photographer");
        
        return (article);
    };
};