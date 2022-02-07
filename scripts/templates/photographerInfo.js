class PhotographerInfo {

    /**
     * @param {Object} profile photographerProfile
     */

    constructor(profile) {
        this._profile = profile;
    };

    createPhotographerInfo () {
        const info = document.getElementById('info');
        info.setAttribute('aria-label', this._profile.name + "informations supplémentaires");
        // ajout de span pour accessibilité de info
        const infoSpan = document.createElement('span');
        infoSpan.textContent = this._profile.name + "informations supplémentaires .";
        infoSpan.classList.add('screenreader-text');

        const totalLikes = document.getElementById('totalLikes');
        totalLikes.textContent = likeTotal;
        totalLikes.setAttribute('aria-label', 'nombre de likes');

        const price = document.getElementById('price');
        price.setAttribute('aria-hidden', true);
        price.setAttribute('aria-label', 'price');
        price.textContent = this._profile.price + "€ / jour";
        // ajout de span pour accessibilité de price
        const priceSpan = document.createElement('span');
        priceSpan.classList.add('screenreader-text');
        priceSpan.textContent = this._profile.price +"€ par jour";

        info.prepend(infoSpan);
        info.appendChild(priceSpan);
    };
};