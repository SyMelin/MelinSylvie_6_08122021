class Carousel {

    /**
     * @param {HTMLElement} element
     * @param {Number} index Index de l'élément cliqué
     */

    constructor (element, index) {
        this._element = element;
        this._index = index;
        this._indexMin = 0;
        this._indexMax = this._children.length - 1;
        this._container = document.querySelector('.mediaWrapper.inLightbox');
        this._container.setAttribute('tabindex', -1);
        this._container.mediaCards = Array.from(element.children);
        this._container.mediaCards.forEach((card) => {
            ['inMain', 'inLightbox'].map(element => card.classList.toggle(element));
        });
        this._container.mediaLike = document.querySelectorAll('.carousel .mediaCard__like');
        this._container.mediaLike.forEach((like) => {
            ['like-caption-visible', 'hidden'].map(element => like.classList.toggle(element));
        });

        this.gotoItem(this._index);
        this.createNavigation();
    };

    createNavBtn () {
        let button = document.createElement('div');
        button.setAttribute('role', 'link');
        button.classList.add('navBtn');
        return button;
    };

    createNavigation () {

        //Crée le bouton Précédent
        this._prevBtn = this.createNavBtn();
        this._prevBtn.classList.add('navBtn--prev');
        this._prevBtn.setAttribute('tabindex', 0);
        this._prevBtn.setAttribute('aria-label', 'Image précédente');
        if (this._index == this._indexMin) {
            this._prevBtn.classList.add('navBtn--hidden');
            this._prevBtn.setAttribute('aria-hidden', true);
        };

        //Crée le bouton Suivant
        this._nextBtn = this.createNavBtn();
        this._nextBtn.classList.add('navBtn--next');
        this._nextBtn.setAttribute('tabindex', 0);
        this._nextBtn.setAttribute('aria-label', 'Image suivante');
        if (this._index == this._indexMax) {
            this._nextBtn.classList.add('navBtn--hidden');
            this._nextBtn.setAttribute('aria-hidden', true);
        };  

        const carousel = document.querySelector('.carousel');

        [this._prevBtn, this._nextBtn].map(element => carousel.appendChild(element));


        ///////////////// Navigation au clavier////////////////////

        //Fonctions appelées au clic sur chaque bouton
        this._prevBtn.addEventListener('click', this.prev.bind(this));
        this._nextBtn.addEventListener('click', this.next.bind(this));

        //Fonctions appelées avec ENTREE sur chaque bouton
        this._prevBtn.addEventListener('keyup', (e) => {
            e.preventDefault();
            if (e.key === "Enter") {
                this.prev();
            };
        });

        this._nextBtn.addEventListener('keyup', (e) => {
            e.preventDefault();
            if (e.key === "Enter") {
                this.next();
            };
        });

        //Fontions appelées avec les flèches gauche et droite
        // !!! Ne fonctionne pas si lecteur d'écran NVDA utilisé
        window.addEventListener('keyup', (e) => {
            const lightboxModal = document.getElementById('lightbox_modal');
            if (lightboxModal) {
                switch(e.key) {
                    case 'ArrowLeft' :
                        e.preventDefault();
                        this.prev();
                    break;
                    case 'ArrowRight' :
                        e.preventDefault();
                        this.next();
                    break;
                };
            };
        });
    };

    prev(){
        if (this._index > this._indexMin && this._index <= this._indexMax) {
            this._index-- ; //index vers lequel on veut aller
            this.gotoItem(this._index);
            let thumbImg = this._container.mediaCards[this._index].firstChild;
            thumbImg.focus();
            if (this._index == this._indexMin) {
                this._prevBtn.classList.add('navBtn--hidden');
                this._prevBtn.setAttribute('aria-hidden', true);
            } else if (this._nextBtn.classList.contains('navBtn--hidden')){
                this._nextBtn.classList.remove('navBtn--hidden');
                this._nextBtn.setAttribute('aria-hidden', false);
            };
        };
    };

    next(){
        if (this._index >= this._indexMin && this._index < this._indexMax) {
            this._index++ ; //index vers lequel on veut aller
            this.gotoItem(this._index);
            let thumbImg = this._container.mediaCards[this._index].firstChild;
            thumbImg.focus();
            if (this._index == (this._indexMax)) {
                this._nextBtn.classList.add('navBtn--hidden');
                this._nextBtn.setAttribute('aria-hidden', true);
            } else if (this._prevBtn.classList.contains('navBtn--hidden')){
                this._prevBtn.classList.remove('navBtn--hidden');
                this._prevBtn.setAttribute('aria-hidden', false);
            };
        };
    };

    gotoItem(index) {
        this._container.mediaCards.forEach((card) => {
            if (card !== this._container.mediaCards[index]) {
                card.classList.add('hidden');
            } else {
                card.classList.remove('hidden');  
            };
        });
    };
};