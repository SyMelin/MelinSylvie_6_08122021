class MediaItemFrame {

    /**
     * @param {Object} mediaItem un élément de media
     */

    constructor(mediaItem) {
        this._mediaItem = mediaItem;
    };
    
    createMediaItemFrame () {

        this._frame = document.createElement("div");
        this._frame.classList.add("thumb-img", "thumb-img--inMain");
        this._frame.setAttribute("role", "link");
        this._frame.setAttribute("aria-label", `${this._mediaItem.alt}`+", closeup view");
       // this._frame.setAttribute('alt', this._mediaItem.alt); //
        // frame.setAttribute('onclick', "displayModalL()");

        if(this._mediaItem.video) {

            //Récupère le nom du fichier video
           // const videoName = String(this._mediaItem.video).replace(/\.[^/.]+$/, "").replaceAll("_", " ");
           // const videoName = String(this._mediaItem.video).replace(".mp4", "").replaceAll("_", " ");
           // this._mediaItem.title = videoName;

            //Crée l'élement video
            this._video = document.createElement("video");
            this._video.setAttribute("src", `assets/photographers/${this._mediaItem.photographerId}/${this._mediaItem.video}`);
            //this._video.setAttribute("controls", "false");
            this._video.style.objectFit = "cover";
            this._video.style.borderRadius = this._radius;
            this._frame.appendChild(this._video);
        } else {
             //Crée l'élement image
            this._frame.style.backgroundImage = "url("+`assets/photographers/${this._mediaItem.photographerId}/${this._mediaItem.image}`+")";
            this._frame.style.backgroundSize = "cover";
            this._frame.style.backgroundPosition = "center";
          //  frame.setAttribute('alt', this._mediaItem.title);
        };

        //Ouverture de la modale Lightbox au clic sur une image
        this._frame.addEventListener("click", this.preloadModalLightbox.bind(this));
        
        //Ouverture de la modale Lightbox via le touche Echap
        this._frame.addEventListener("keyup", (e) => {
            const modal = document.querySelector(".modal");
            const modalState = modal.getAttribute("aria-hidden");
            console.log(modalState);
            if ((e.key === "Enter") && (modalState === "true")) {
                e.preventDefault();
                this.preloadModalLightbox();
            };
        }); 

        return this._frame;
  
    };

    preloadModalLightbox(){
        
        //Si l'image cliquée ne se situe pas déjà dans la lightbox, affichage du carrousel dans la modale

        if ((this._frame.classList.contains("thumb-img--inLightbox")) !== true) {
            const newLightboxModal = new Modal("lightbox_modal", 'lightbox');
            newLightboxModal.createModal();
            this._frameAll = document.querySelectorAll(".mediaWrapper .thumb-imgfull .thumb-img");
            this._frameAll.forEach((frame) => {
                ["thumb-img--inMain", "thumb-img--inLightbox" ].map(element => frame.classList.toggle(element));
                let ariaLabel = String(frame.getAttribute("aria-label"));
                ariaLabel = ariaLabel.replace(", closeup view", "");
                frame.setAttribute("role", "image");
                frame.setAttribute("aria-label", ariaLabel);
                if (frame.firstChild){
                    frame.setAttribute("role", "video");
                    const video = frame.firstChild;
                    video.setAttribute("controls", true);
                    video.pause();
                    video.currentTime = "0";
                };
            });

        //On récupère la mediaCard dont l'image a été cliquée
        this._mediaCard = this._frame.parentElement;
 
        //On récupère toutes les mediaCard
        this._mediaCardAll = document.querySelectorAll(".mediaWrapper .thumb-imgfull");
        const mediaArray = Array.from(this._mediaCardAll);
        
        //On récupère l'index de la mediaCard dans le tableau regroupant toutes les mediaCard
        let cardIndex = mediaArray.indexOf(this._mediaCard);
        
        this._mediaWrapper = document.querySelector(".mediaWrapper");
        ["mediaWrapper--inMain", "mediaWrapper--inLightbox" ].map(element => this._mediaWrapper.classList.toggle(element));

        document.querySelector(".carousel").appendChild(this._mediaWrapper);
        this._lightboxCarousel = new Carousel(document.querySelector(".carousel .mediaWrapper"), cardIndex);
        
       // console.log("cardIndex", cardIndex);

        displayModal();

        };
    };      
};