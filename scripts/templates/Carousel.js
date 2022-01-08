class Carousel {

    /**
     * @param {HTMLElement} element 
     * @param {Object} options
     * @param {Object} options.slidesToScroll Nombre d'éléments à faire défiler
     * @param {Object} options.slidesVisible Nombre d'éléments visibles dans un slide
     */


    constructor (element, options = {}) {
        this._element = element;
        this._options = Object.assign ({}, {
            slidesToScroll: 1,
            slidesVisible: 1
        }, options 
        );
    };

};