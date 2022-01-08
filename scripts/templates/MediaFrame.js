class MediaItemFrame {

    constructor(mediaItem, width, height, radius) {
        this._mediaItem = mediaItem;
        this._width = width;
        this._height = height;
        this._radius = radius;
    };
    
    createMediaItemFrame () {

        const frame = document.createElement("div");
        frame.classList.add("thumb-img");
        frame.setAttribute("role", "link");
       
        frame.setAttribute('alt', ""); //
       // frame.setAttribute('onclick', "displayModalL()");
        frame.style.width = this._width;
        frame.style.height = this._height;
        frame.style.borderRadius = this._radius;

        if(this._mediaItem.video) {

            //Récupère le nom du fichier video
            const videoName = String(this._mediaItem.video).replace(".mp4", "").replaceAll("_", " ");
            this._mediaItem.title = videoName;

            //Crée l'élement video
            const video = document.createElement("video");
            video.setAttribute("src", `assets/photographers/${this._mediaItem.photographerId}/${this._mediaItem.video}`);
            video.setAttribute("width", this._width);
            video.setAttribute("height", this._height);
            video.setAttribute("controls", true);
            video.style.objectFit = "cover";
            video.style.borderRadius = this._radius;
            frame.appendChild(video);
        } else {
             //Crée l'élement image
            frame.style.backgroundImage = "url("+`assets/photographers/${this._mediaItem.photographerId}/${this._mediaItem.image}`+")";
            frame.style.backgroundSize = "cover";
            frame.style.backgroundPosition = "center";
          //  frame.setAttribute('alt', this._mediaItem.title);
        };

        //Au clic sur une image, affichage du carrousel dans la modale
        frame.addEventListener("click", function(e) {
            console.log(e.target);
            
            const mediaWrapper = document.querySelector(".mediaWrapper");
            console.log("hello", mediaWrapper);
            document.querySelector("#lightbox_modal .modalContent").appendChild(mediaWrapper);
            const lightboxCarousel = new Carousel(document.querySelector("#lightbox_modal .modalContent .mediaWrapper"), {
                                        slidesToScroll: 1,
                                        slidesVisible: 1
                                    });
            displayModalL();

        });


/*      
        // Evenement sur frame
        frame.addEventListener("click", function(e) {
            console.log(e.target);
            const frameCard = e.target;

            //On récupère la mediaCard dont l'image a été cliquée
            const mediaCard = frameCard.parentElement;

            //On récupère toutes les mediaCard
            mediaCardAll = document.getElementsByClassName("thumb-imgfull");
            const mediaArray = Array.from(mediaCardAll);

            //On récupère l'index de la mediaCard dans le tableau regroupant toutes les mediaCard
            let mediaCardIndex = mediaArray.indexOf(mediaCard);
            //console.log("mediaCardIndex", mediaCardIndex);

            //On crée un clone de la mediaCard
            const clone = mediaCard.cloneNode(true);
            clone.setAttribute("cardIndex", mediaCardIndex);
            clone.classList.add("clone");

            //On affiche le clone dans la modale lightbox
            displayModalL(clone);
        });
*/


        return frame;
  
    };
};