class PhotographerInfo {

    constructor(photographerData) {
        this._photographerData = photographerData;
    };

    createPhotographerInfo () {
        const info = document.getElementById("info");

        const totalLikes = document.getElementById("totalLikes");
        totalLikes.textContent = likeTotal;

        const price = document.getElementById("price");
        price.textContent = this._photographerData.price + "€ / jour";
    };

};