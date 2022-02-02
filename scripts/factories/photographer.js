// Crée le composant UserCard pour un photographe donné
function photographerFactory(data) {
    
    const { name, id, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/photographers_ID_photos/${portrait}`;
    
    //Crée la structure de l'élément UserCard
    function getUserCardDOM() {
        
        const article = document.createElement( 'article' );

        // crée le lien img + h2
        const link = document.createElement('a');
        link.setAttribute('href', "../photographer.html?id=" + id);
        link.setAttribute('title', name + "-page");
       
        const img = document.createElement( 'img' );
        img.classList.add('user');
        img.setAttribute('src', picture);
        img.setAttribute('alt', name);
       
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        [img, h2].map(element => link.appendChild(element));        
        article.appendChild(link);

        // crée le paragraphe texte statique
        const paragraphe = document.createElement('p');
       
        const textLocation = document.createElement('p');
        textLocation.classList.add('text-location');
        textLocation.textContent = city + ", " + country;
        
        const textTagline = document.createElement('p');
        textTagline.textContent = tagline;
        
        const textPrice = document.createElement('p');
        textPrice.textContent = price +"€/jour";
        
        [textLocation, textTagline, textPrice].map(element => paragraphe.appendChild(element));
        article.appendChild(paragraphe);
        
        return (article);
    }
    return { name, picture, getUserCardDOM }
}