class PhotographerHeader {

    constructor(photographerData) {
        this._photographerData = photographerData;
    };

    createPhotographerHeader () {

        //.photographer-profile
        const photographerProfile = document.querySelector('.photographer-profile');
        
        const h1 = document.createElement("h1");
        h1.textContent = this._photographerData.name;

        const location = document.createElement("p");
        location.textContent = this._photographerData.city + ", " + this._photographerData.country;

        const textTagline = document.createElement('p');
        textTagline.textContent = this._photographerData.tagline;

        photographerProfile.appendChild(h1);
        photographerProfile.appendChild(location);
        photographerProfile.appendChild(textTagline);


        //Element .user
        const user = document.querySelector('.photograph-header .user');
        
        const img = document.createElement("img");
        img.setAttribute("src", `assets/photographers/photographers_ID_photos/${this._photographerData.portrait}`);
        img.classList.add('user');

        user.appendChild(img);

    };

};