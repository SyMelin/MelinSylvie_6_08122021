class Carousel {

    /**
     * @param {HTMLElement} element
     * @param {Number} index Index de l'élément cliqué
     */

    constructor (element, index) {
        this._element = element;
        this._index = index;
        this._children = [].slice.call(element.children);
        let ratio = this._children.length;
        this._container = document.querySelector("#lightbox-frame .mediaWrapper");
        this._container.style.width = (ratio * 100) + "%";
        this._children.forEach((child) => {
            child.style.width = (100 / ratio ) + "%";
        })
        
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
        

        //Crée le bouton Suivant
        this._nextBtn = this.createNavBtn();
        this._nextBtn.classList.add("lightbox__next");

        const lightbox = document.querySelector(".lightbox");
        console.log(lightbox);
        lightbox.prepend(this._prevBtn);
        lightbox.appendChild(this._nextBtn); 

        //Ajout des fonctions appelées au clic sur chaque bouton
        this._prevBtn.addEventListener("click", this.prev.bind(this));
        this._nextBtn.addEventListener("click", this.next.bind(this));
    };

    prev(){

        console.log("cardIndex", this._index);
        const indexMin = 0;
        const indexMax = this._children.length;

        if (this._index >= (1 + indexMin) && this._index < indexMax) {
            this._index-- ; //index vers lequel on veut aller
            console.log("carIndextogoto", this._index);
            this.gotoItem(this._index);
            if (this._index == indexMin) {
                this._prevBtn.classList.add("navBtn-hidden");
            } else if (this._nextBtn.classList.contains("navBtn-hidden")){
                this._nextBtn.classList.remove("navBtn-hidden");
            };
        };
    };

    next(){

        console.log("cardIndex", this._index);
        const indexMin = 0;
        const indexMax = this._children.length;
       
        if (this._index >= indexMin && this._index < (indexMax - 1)) {
            this._index++ ;
            console.log("carIndextogoto", this._index);
            this.gotoItem(this._index);
            if (this._index == (indexMax-1)) {
                this._nextBtn.classList.add("navBtn-hidden");
            } else if (this._prevBtn.classList.contains("navBtn-hidden")){
                this._prevBtn.classList.remove("navBtn-hidden");
            };
        };
    };

    gotoItem(index) {
       // console.log("cardIndexGoTO", index);
        let translateX = index * -100 / this._children.length + "%";
        console.log(translateX);
        //console.log(this._container);
        this._container.style.transform = `translate3d(${translateX}, 0, 0)`;
    };

};