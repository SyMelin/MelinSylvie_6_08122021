class Carousel {

    /**
     * @param {HTMLElement} element
     * @param {Number} index Index de l'élément cliqué
     */

    constructor (element, index) {
        this._element = element;
        this._index = index;
        this._children = [].slice.call(element.children);
        //console.log([].slice.call(element.children));
        this._indexMin = 0;
        this._indexMax = this._children.length - 1;
        //console.log("indexMax", this._indexMax);
        //let ratio = this._children.length;
        this._container = document.querySelector(".mediaWrapper--inLightbox");
        this._container.setAttribute("tabindex", "-1");
        //this._container.style.width = (ratio * 100) + "%";
        this._children.forEach((child) => {
            ["thumb-imgfull--inMain", "thumb-imgfull--inLightbox" ].map(element => child.classList.toggle(element));
            child.setAttribute("role", "image");
        });
        //this._children.forEach((child) => {
            //child.style.width = (100 / ratio ) + "%";
       // });
        this._container.mediaLike = document.querySelectorAll(".carousel .mediaCard__like");
        //console.log("likes",  this._container.mediaLike);
        this._container.mediaLike.forEach((like) => {
            ["like-caption-visible", "hidden" ].map(element => like.classList.toggle(element));
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
        this._prevBtn.classList.add("navBtn--prev");
        this._prevBtn.setAttribute("tabindex", "0");
        this._prevBtn.setAttribute("aria-label", "Previous image");
        if (this._index == this._indexMin) {
            this._prevBtn.classList.add("navBtn--hidden");
            this._prevBtn.setAttribute("aria-hidden", true);
        };

        //Crée le bouton Suivant
        this._nextBtn = this.createNavBtn();
        this._nextBtn.classList.add("navBtn--next");
        this._nextBtn.setAttribute("tabindex", "0");
        this._nextBtn.setAttribute("aria-label", "Next image");
        if (this._index == this._indexMax) {
            this._nextBtn.classList.add("navBtn--hidden");
            this._nextBtn.setAttribute("aria-hidden", true);
        };  

        const carousel = document.querySelector(".carousel");

        [this._prevBtn, this._nextBtn].map(element => carousel.appendChild(element));
        

        ///////////////// Navigation au clavier////////////////////

        //Fonctions appelées au clic sur chaque bouton
        this._prevBtn.addEventListener("click", this.prev.bind(this));
        this._nextBtn.addEventListener("click", this.next.bind(this));

        //Fonctions appelées avec ENTRER sur le bouton
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

        //Fontions appelées avec les flèches gauche et droite
        // !!! Ne fonctionne pas si lecteur d'écran NVDA utilisé
        window.addEventListener("keyup", (e) => {
            const lightboxModal = document.getElementById("lightbox_modal");
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

        //console.log("cardIndex", this._index);
        if (this._index > this._indexMin && this._index <= this._indexMax) {
            this._index-- ; //index vers lequel on veut aller
         /*   ([].slice.call(this._children[this._index + 1].children)).forEach((child) => {
                child.removeAttribute("tabindex");
            });*/
            this.gotoItem(this._index);
            let thumbImg = this._children[this._index].firstChild;
            thumbImg.focus();
            if (this._index == this._indexMin) {
                this._prevBtn.classList.add("navBtn--hidden");
                this._prevBtn.setAttribute("aria-hidden", true);
            } else if (this._nextBtn.classList.contains("navBtn--hidden")){
                this._nextBtn.classList.remove("navBtn--hidden");
                this._nextBtn.setAttribute("aria-hidden", false);
            };
        };
    };

    next(){

        if (this._index >= this._indexMin && this._index < this._indexMax) {
            this._index++ ;
          /*  ([].slice.call(this._children[this._index - 1].children)).forEach((child) => {
                child.removeAttribute("tabindex");
            });*/
            this.gotoItem(this._index);
            let thumbImg = this._children[this._index].firstChild;
            thumbImg.focus();
            if (this._index == (this._indexMax)) {
                this._nextBtn.classList.add("navBtn--hidden");
                this._nextBtn.setAttribute("aria-hidden", true);
            } else if (this._prevBtn.classList.contains("navBtn--hidden")){
                this._prevBtn.classList.remove("navBtn--hidden");
                this._prevBtn.setAttribute("aria-hidden", false);
            };
        };
    };

    gotoItem(index) {
        // console.log("cardIndexGoTO", index);
      //  let translateX = index * -100 / this._children.length + "%";
        //console.log(translateX);
     //   this._container.style.transform = `translate3d(${translateX}, 0, 0)`;
        //console.log(this._children[index]);
        this._children.forEach((child) => {
            if (child !== this._children[index]) {
               // child.setAttribute("aria-hidden", true);
                child.classList.add("hidden");
                //console.log(child);
            } else {
               // child.setAttribute("aria-hidden", false);
                child.classList.remove("hidden");
               
            };
        });
        console.log("index", index);
       // this._children[index]
        //this._children[index].setAttribute("tabindex", "-1");
      /*  ([].slice.call(this._children[index].children)).forEach((child) => {
            child.setAttribute("tabindex", "0");
        });*/
       
        //console.log(this._children[index]);
       // console.log(this._children[index - 1]);
       // console.log(this._children[index + 1]);
    };
};