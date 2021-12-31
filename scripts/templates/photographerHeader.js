class PhotographerHeader {

    constructor(photographerData) {
        this._photographerData = photographerData;
    };

    createPhotographerHeader () {

        const photographerProfile = document.querySelector('.photographer-profile');
        
        const name = document.createElement("p");
        name.textContent = this._photographerData.name;

        const location = document.createElement("p");
        name.textContent = this._photographerData.name + ", " + this._photographerData.country;

        photographerProfile.appendChild(name);
        photographerProfile.appendChild(location);
    };

};