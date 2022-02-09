/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
class MediaItemFrame extends OpenTriggerLightbox {

    /**
     * @param {Object} mediaItem un élément de media
     */

    constructor(type, mediaItem) {
        super(type);
        this._mediaItem = mediaItem;
    }
    
    createMediaItemFrame () {

        this._frame = document.createElement('div');
        this._frame.classList.add('thumb-img', 'inMain', 'link');
        this._frame.setAttribute('role', 'link');
        this._frame.setAttribute('aria-label', `${this._mediaItem.alt}`+", closeup view");

        if(this._mediaItem.video) {
            //Crée l'élement video
            this._frame.classList.add('thumb-img--video');
            this._video = document.createElement('video');
            this._video.setAttribute('src', `assets/photographers/${this._mediaItem.photographerId}/${this._mediaItem.video}`);
            
            this._frame.appendChild(this._video);
        } else {
            //Crée l'élement image
            this._frame.classList.add('thumb-img--image');
            this._frame.style.backgroundImage = "url("+`assets/photographers/${this._mediaItem.photographerId}/${this._mediaItem.image}`+")";
        }

        this.setEventListener(this._frame);

        return this._frame;
    }
}