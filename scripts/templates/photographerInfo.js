class PhotographerInfo {

    constructor(photographerData) {
        this._photographerData = photographerData;
    };

    createPhotographerInfo () {
        const info = document.getElementById("info");

        const totalLikes = document.getElementById("totalLikes");
        totalLikes.textContent = likeTotal;

        const price = document.getElementById("price");
        price.setAttribute("aria-hidden", true);
        price.textContent = this._photographerData.price + "€ / jour";
        const priceSpan = document.createElement('span');
        priceSpan.classList.add("screenreader-text");
        priceSpan.textContent = this._photographerData.price +"€ par jour";

        info.appendChild(priceSpan);

    };

};