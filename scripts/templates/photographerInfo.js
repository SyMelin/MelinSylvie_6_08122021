class PhotographerInfo {

    /**
     * @param {Object} profile photographerProfile
     */

    constructor(profile) {
        this._profile = profile;
    };

    createPhotographerInfo () {
        const info = document.getElementById("info");

        const totalLikes = document.getElementById("totalLikes");
        totalLikes.textContent = likeTotal;

        const price = document.getElementById("price");
        price.setAttribute("aria-hidden", true);
        price.textContent = this._profile.price + "€ / jour";
        const priceSpan = document.createElement('span');
        priceSpan.classList.add("screenreader-text");
        priceSpan.textContent = this._profile.price +"€ par jour";

        info.appendChild(priceSpan);

    };

};