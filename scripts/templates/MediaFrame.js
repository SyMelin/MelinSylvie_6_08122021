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

        frame.addEventListener("click", function(e) {
            console.log(e.target);
            const frameCard = e.target;
            const mediaCard = frameCard.parentElement;
          //  console.log("mediaCard", mediaCard);
            mediaCardAll = document.getElementsByClassName("thumb-imgfull");
            const mediaArray = Array.from(mediaCardAll);
            let mediaCardIndex = mediaArray.indexOf(mediaCard);
            console.log("mediaCardIndex", mediaCardIndex);
            const clone = mediaCard.cloneNode(true);
            clone.setAttribute("cardIndex", mediaCardIndex);
            clone.classList.add("clone");
            displayModalL(clone);
        });


        return frame;
  
    };
};