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
            console.log(e.target);

            const frameCard = e.target;

            //On récupère la mediaCard dont l'image a été cliquée
            const mediaCard = frameCard.parentElement;
            //On récupère toutes les mediaCard
            mediaCardAll = document.querySelectorAll(".mediaWrapper .thumb-imgfull");
            const mediaArray = Array.from(mediaCardAll);
            //On récupère l'index de la mediaCard dans le tableau regroupant toutes les mediaCard
            cardIndex = mediaArray.indexOf(mediaCard);
            console.log("cardIndex", cardIndex);
            endTranslationX = ("-" + (cardIndex * 641.66));
            let endTranslationXpx = endTranslationX +"px";
            console.log("px",endTranslationXpx);

            
            const mediaWrapper = document.querySelector(".mediaWrapper");
            console.log("hello", mediaWrapper);
            document.querySelector("#lightbox-frame").appendChild(mediaWrapper);
            const lightboxCarousel = new Carousel(document.querySelector("#lightbox-frame .mediaWrapper"), {
                                        slidesToScroll: 1,
                                        slidesVisible: 1
                                    });
            
            const mediaWrapperL = document.querySelector("#lightbox-frame .mediaWrapper");
            const mediaWrapperLWidth = 641 * (mediaArray.length);
            console.log(mediaWrapperLWidth);
            mediaWrapperL.style.width = mediaWrapperLWidth;



            document.documentElement.style
                .setProperty('--my-endLeft-translateX', endTranslationXpx);
            
            document.querySelector("#lightbox-frame .mediaWrapper").classList.add("start");

            

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