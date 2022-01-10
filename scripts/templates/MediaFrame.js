class MediaItemFrame {

    constructor(mediaItem) {
        this._mediaItem = mediaItem;
    };
    
    createMediaItemFrame () {

        const frame = document.createElement("div");
        frame.classList.add("thumb-img");
        frame.setAttribute("role", "link");
       
        frame.setAttribute('alt', ""); //
       // frame.setAttribute('onclick', "displayModalL()");

        if(this._mediaItem.video) {

            //Récupère le nom du fichier video
            const videoName = String(this._mediaItem.video).replace(".mp4", "").replaceAll("_", " ");
            this._mediaItem.title = videoName;

            //Crée l'élement video
            const video = document.createElement("video");
            video.setAttribute("src", `assets/photographers/${this._mediaItem.photographerId}/${this._mediaItem.video}`);
            video.setAttribute("controls", true);
           // video.style.objectFit = "contain";
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
            e.preventDefault();

            if ((frame.classList.contains("inLightbox")) == true) {
                console.log("condition", "TRUE");
                e.preventDefault();
            } else{

                frame.classList.add("inLightbox");
                console.log("HEY", frame.className);
                // console.log(e.target);
            
            const frameAll = document.querySelectorAll(".mediaWrapper .thumb-imgfull  .thumb-img");
            frameAll.forEach((item) => {
                item.classList.add("inLightbox");
            });

           // console.log(e.target);

            //const frameCard = e.target;

            //On récupère la mediaCard dont l'image a été cliquée
            const mediaCard = frame.parentElement;
            //On récupère toutes les mediaCard
            mediaCardAll = document.querySelectorAll(".mediaWrapper .thumb-imgfull");
            const mediaArray = Array.from(mediaCardAll);
            //On récupère l'index de la mediaCard dans le tableau regroupant toutes les mediaCard
            let cardIndex = mediaArray.indexOf(mediaCard);
            
            const mediaWrapper = document.querySelector(".mediaWrapper");
            document.querySelector("#lightbox-frame").appendChild(mediaWrapper);
            const lightboxCarousel = new Carousel(document.querySelector("#lightbox-frame .mediaWrapper"), cardIndex);
          
            console.log("cardIndex", cardIndex);

            displayModalL();

            };
        });

        return frame;
  
    };
};