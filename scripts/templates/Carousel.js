class Carousel {

    /**
     * @param {HTMLElement} element
     * @param {Number} index Index de l'élément cliqué
     */

    constructor (element, index) {
        this._element = element;
        this._index = index;
        this._children = [].slice.call(element.children);
        console.log([].slice.call(element.children));
        this._indexMin = 0;
        this._indexMax = this._children.length - 1;
        //console.log("indexMax", this._indexMax);
        let ratio = this._children.length;
        this._container = document.querySelector(".mediaWrapper-inLightbox");
        this._container.setAttribute("tabindex", "1");
        this._container.style.width = (ratio * 100) + "%";
        this._children.forEach((child) => {
            child.style.width = (100 / ratio ) + "%";
        });
     /*   const thumbImg = document.querySelectorAll("#lightbox-frame .mediaWrapper .thumb-img");
        thumbImg.forEach((image) => {
            image.setAttribute("tabindex", "2");
            console.log("done");
        });
        const titles = document.querySelectorAll("#lightbox-frame .mediaWrapper .title-caption");
        titles.forEach((title) => {
            title.setAttribute("tabindex", "3");
            console.log("titledone");
        });*/
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
        let button = document.createElement("div");
        button.setAttribute("role", "link");
        button.classList.add("navBtn");
        return button;
    };

    createNavigation () {

        //Crée le bouton Précédent
        this._prevBtn = this.createNavBtn();
        this._prevBtn.classList.add("navBtn-prev");
        this._prevBtn.setAttribute("tabindex", "1");
        this._prevBtn.setAttribute("aria-label", "Previous image");
        if (this._index == this._indexMin) {
            this._prevBtn.classList.add("navBtn-hidden");
            this._prevBtn.setAttribute("aria-hidden", true);
        };

        //Crée le bouton Suivant
        this._nextBtn = this.createNavBtn();
        this._nextBtn.classList.add("navBtn-next");
        this._nextBtn.setAttribute("tabindex", "2");
        this._nextBtn.setAttribute("aria-label", "Next image");
        if (this._index == this._indexMax) {
            this._nextBtn.classList.add("navBtn-hidden");
            this._nextBtn.setAttribute("aria-hidden", true);
        };  

        const lightbox = document.querySelector(".lightbox");
        lightbox.appendChild(this._prevBtn); 

       // lightbox.prepend(this._prevBtn);
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
                this._prevBtn.setAttribute("aria-hidden", true);
            } else if (this._nextBtn.classList.contains("navBtn-hidden")){
                this._nextBtn.classList.remove("navBtn-hidden");
                this._nextBtn.setAttribute("aria-hidden", false);
            };
        };
    };

    next(){

        if (this._index >= this._indexMin && this._index < this._indexMax) {
            this._index++ ;
            this.gotoItem(this._index);
            if (this._index == (this._indexMax)) {
                this._nextBtn.classList.add("navBtn-hidden");
                this._nextBtn.setAttribute("aria-hidden", true);
            } else if (this._prevBtn.classList.contains("navBtn-hidden")){
                this._prevBtn.classList.remove("navBtn-hidden");
                this._prevBtn.setAttribute("aria-hidden", false);
            };
        };
    };

    gotoItem(index) {
        // console.log("cardIndexGoTO", index);
        let translateX = index * -100 / this._children.length + "%";
        //console.log(translateX);
        this._container.style.transform = `translate3d(${translateX}, 0, 0)`;
        this._children.forEach((child) => {
           child.setAttribute("aria-hidden", true);
        });
        console.log("index", index);
        this._children[index].setAttribute("aria-hidden", false);
       
        //console.log(this._children[index]);
       // console.log(this._children[index - 1]);
       // console.log(this._children[index + 1]);
    };
};