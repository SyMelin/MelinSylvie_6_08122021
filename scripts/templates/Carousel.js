class Carousel {

    /**
     * @param {HTMLElement} element
     * @param {Number} index Index de l'élément cliqué
     */

    constructor (element, index) {
        this._element = element;
        this._index = index;
        this._children = [].slice.call(element.children);
        this._indexMin = 0;
        this._indexMax = this._children.length - 1;
        //console.log("indexMax", this._indexMax);
        let ratio = this._children.length;
        this._container = document.querySelector(".mediaWrapper-inLightbox");
        this._container.style.width = (ratio * 100) + "%";
        this._children.forEach((child) => {
            child.style.width = (100 / ratio ) + "%";
        });
        this._container.mediaLike = document.querySelectorAll("#lightbox-frame .mediaCard__like");
       /// console.log(this._container.mediaLike);
        this._container.mediaLike.forEach((like) => {
            like.classList.toggle("like-caption-visible");
            like.classList.toggle("hidden");
        });

        this.gotoItem(this._index);
        this.createNavigation();

    };

    createNavBtn () {
        let button  = document.createElement("div");
        button.setAttribute("role", "link");
        button.classList.add("navBtn");
        return button;
    };

    createNavigation () {

        //Crée le bouton Précédent
        this._prevBtn = this.createNavBtn();
        this._prevBtn.classList.add("lightbox__prev");
        this._prevBtn.setAttribute("tabindex", "4");
        if (this._index == this._indexMin) {
            this._prevBtn.classList.add("navBtn-hidden");
        };

        //Crée le bouton Suivant
        this._nextBtn = this.createNavBtn();
        this._nextBtn.classList.add("navBtn-next");
        this._nextBtn.setAttribute("tabindex", "5");
        if (this._index == this._indexMax) {
            this._nextBtn.classList.add("navBtn-hidden");
        };  

        const lightbox = document.querySelector(".lightbox");
        lightbox.prepend(this._prevBtn);
        lightbox.appendChild(this._nextBtn); 

        //Ajout des fonctions appelées au clic sur chaque bouton
        this._prevBtn.addEventListener("click", this.prev.bind(this));
        this._nextBtn.addEventListener("click", this.next.bind(this));

        //Ajout des fonctions appelées avec ENTRER sur le bouton
        this._prevBtn.addEventListener("keyup", (e) => {
            e.preventDefault();
            if (e.key === "Enter") {
                this.prev();
            };

        });

        this._nextBtn.addEventListener("keyup", (e) => {
            e.preventDefault();
            if (e.key === "Enter") {
                this.next();
            };

        });
    };

    prev(){

        //console.log("cardIndex", this._index);
        if (this._index > this._indexMin && this._index <= this._indexMax) {
            this._index-- ; //index vers lequel on veut aller
            this.gotoItem(this._index);
            if (this._index == this._indexMin) {
                this._prevBtn.classList.add("navBtn-hidden");
            } else if (this._nextBtn.classList.contains("navBtn-hidden")){
                this._nextBtn.classList.remove("navBtn-hidden");
            };
        };
    };

    next(){

        if (this._index >= this._indexMin && this._index < this._indexMax) {
            this._index++ ;
            this.gotoItem(this._index);
            if (this._index == (this._indexMax)) {
                this._nextBtn.classList.add("navBtn-hidden");
            } else if (this._prevBtn.classList.contains("navBtn-hidden")){
                this._prevBtn.classList.remove("navBtn-hidden");
            };
        };
    };

    gotoItem(index) {
        // console.log("cardIndexGoTO", index);
        let translateX = index * -100 / this._children.length + "%";
        //console.log(translateX);
        this._container.style.transform = `translate3d(${translateX}, 0, 0)`;
    };

};