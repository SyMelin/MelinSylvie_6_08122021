class MediaItemCard {

    /**
     * @param {Object} mediaItem un élément de media
     */

    constructor(mediaItem) {
        this._mediaItem = mediaItem;
    };

    createMediaItemCard () {

        const mediaItemCard = document.createElement("article");
        mediaItemCard.classList.add("thumb-imgfull", "inMain");

        const template = new MediaItemFrame(this._mediaItem, this._width, this._height, this._radius);
        const frame = template.createMediaItemFrame();
        frame.setAttribute("tabindex", "0");
        frame.classList.add("tabindex0");
        
        const caption = document.createElement("div");
        caption.classList.add("caption");

        const title = document.createElement("p");
        title.setAttribute("tabindex", "0");
        title.classList.add("tabindex0", "title-caption");
        title.textContent = this._mediaItem.title;
    
        const like = document.createElement("div");
        like.setAttribute("tabindex", "-1");
        like.classList.add("mediaCard__like", "like-caption-visible");

        const likeNbBox = document.createElement("div");
        likeNbBox.setAttribute("tabindex", "0");
        likeNbBox.classList.add("tabindex0");

        const likeNb = document.createElement("p");
        likeNb.setAttribute("aria-hidden", true);
        likeNb.textContent = this._mediaItem.likes;
        // ajout de span pour accessibilité de likeNB
        const likeNbSpan = document.createElement('span');
        likeNbSpan.classList.add("screenreader-text");
        likeNbSpan.textContent = this._mediaItem.likes + " likes";  

        const likeHeart = document.createElement("div");
        likeHeart.setAttribute("tabindex", "0");
        likeHeart.classList.add("tabindex0", "likeHeart");
        likeHeart.innerHTML = '<i aria-label="likes" class="fas fa-heart"></i>';

        [likeNb, likeNbSpan].map(element => likeNbBox.appendChild(element));
        [likeNbBox, likeHeart].map(element => like.appendChild(element));
        [title, like].map(element => caption.appendChild(element));
        [frame, caption].map(element => mediaItemCard.appendChild(element));


        ///////////// EVenement sur l'icone coeur cliquable ///////////////////////

        likeHeart.addEventListener("click", function(e) {
            template._mediaItem.likes++ ;
            likeNb.textContent = template._mediaItem.likes;
            sumLikes(photographerMedia);
        });

        likeHeart.addEventListener("keyup", (e) => {
            if (e.key === "Enter") {
                template._mediaItem.likes++ ;
                likeNb.textContent = template._mediaItem.likes;
                sumLikes(photographerMedia); 
            };
        }); 

        return mediaItemCard;
    };
};