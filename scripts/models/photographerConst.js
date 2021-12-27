class photographerConst {
    constructor (photographer) {
        this._name = photographer.name
        this._id = photographer.id
        this._city = photographer.city
        this._country = photographer.country
        this._tagline = photographer.tagline
        this._price = photographer.price
        this._portrait = photographer.portrait
    }

    get name() {
        return this._name
    }

    get id() {
        return this._id
    }

    get city() {
        return this._city
    }

    get country() {
        return this._country
    }

    get tagline() {
        return this._tagline
    }

    get price() {
        return this._price
    }

    get portrait() {
        return "/assets/photographers/${this._portrait}" //A revoir qiuand images ajoutées
    }
}