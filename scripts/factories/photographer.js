// Crée le composant UserCard pour un photographe donné
function photographerFactory(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;
    
    //Crée la structure de l'élément UserCard
    function getUserCardDOM() {
        const article = document.createElement( 'article' );

        // création du lien img + h2
        const link = document.createElement('a'); //ajout
        link.href="../photographer.html"; //ajout
        link.title="photographer-page"; //ajout
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt", name);
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        link.appendChild(img);
        link.appendChild(h2);
        article.appendChild(link);

        // création du paragraphe texte statique
        const paragraphe = document.createElement('p'); //ajout
        const textLocation = document.createElement('p'); //ajout
        textLocation.classList.add('text-location');
        textLocation.textContent = city + ", " + country; //ajout
        const textTagline = document.createElement('p'); //ajout
        textTagline.textContent = tagline; //ajout
        const textPrice = document.createElement('p'); //ajout
        textPrice.textContent = price +"€/jour"; //ajout
        paragraphe.appendChild(textLocation); //ajout
        paragraphe.appendChild(textTagline); //ajout
        paragraphe.appendChild(textPrice); //ajout
        article.appendChild(paragraphe); //ajout
        return (article);
    }
    return { name, picture, getUserCardDOM }
}