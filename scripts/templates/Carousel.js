class Carousel {

    /**
     * @param {HTMLElement} element
     * @param {Number} number Index de l'élément cliqué
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
        let button  = document.createElement("img");
        button.setAttribute("role", "link");
        button.setAttribute("src" , "assets/icons/arrow_left.svg");
        button.classList.add("navBtn");
        return button;
    };

    createNavigation () {
        const prevBtn = this.createNavBtn();
        prevBtn.classList.add("lightbox__prev");
        console.log(prevBtn);
        const nextBtn = this.createNavBtn();
        nextBtn.classList.add("lightbox__next");

        const lightbox = document.querySelector(".lightbox");
        console.log(lightbox);
        lightbox.prepend(prevBtn);
        lightbox.appendChild(nextBtn); 

        prevBtn.addEventListener("click", this.prev.bind(this));
        nextBtn.addEventListener("click", this.next.bind(this));
    };

    prev(){

        const indexMin = 0;
        const indexMax = this._children.length;

        if (this._index >= (1 + indexMin) && this._index < indexMax) {
            this._index-- ;
            this.gotoItem(this._index);
        };
    };

    next(){

        console.log("cardIndexNext", this._index);
        const indexMin = 0;
        const indexMax = this._children.length;
       
        if (this._index >= indexMin && this._index < (indexMax - 1)) {
            this._index++ ;
            console.log("carIndex", this._index);
            this.gotoItem(this._index);
        };
    };

    gotoItem(index) {
        console.log("cardIndexGoTO", index);
        let translateX = index * -100 / this._children.length + "%";
        console.log(translateX);
        console.log(this._container);
        this._container.style.transform = `translate3d(${translateX}, 0, 0)`;
    };

};