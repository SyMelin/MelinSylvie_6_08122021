class MediaItemCard {

    /**
     * @param {Object} mediaItem un élément de media
     */

    constructor(mediaItem) {
        this._mediaItem = mediaItem;
    };

    createMediaItemCard () {

        const mediaItemCard = document.createElement("div");
        mediaItemCard.classList.add("thumb-imgfull", "thumb-imgfull--inMain");

        const template = new MediaItemFrame(this._mediaItem, this._width, this._height, this._radius);
        const frame = template.createMediaItemFrame();
        frame.setAttribute("tabindex", "0");
        frame.classList.add("tabindex0");
        
        const caption = document.createElement("div");
        caption.classList.add("caption");
       // caption.setAttribute("tabindex", "-1");

        const title = document.createElement("p");
        title.setAttribute("tabindex", "0");
        title.classList.add("tabindex0", "title-caption");
        title.textContent = this._mediaItem.title;
    
        const like = document.createElement("div");
        like.classList.add("mediaCard__like", "like-caption-visible");
        like.setAttribute("tabindex", "-1");

        const likeNbBox = document.createElement("div");
        likeNbBox.setAttribute("tabindex", "0");
        const likeNb = document.createElement("p");
        likeNb.setAttribute("aria-hidden", true);
        likeNb.textContent = this._mediaItem.likes;
        const likeNbSpan = document.createElement('span');
        //likeNbSpan.setAttribute("tabindex", "0");
        likeNbSpan.classList.add("tabindex0", "screenreader-text");
        likeNbSpan.textContent = this._mediaItem.likes + " likes";  

        const likeHeart = document.createElement("div");
        likeHeart.setAttribute("tabindex", "0");
        likeHeart.classList.add("tabindex0", "likeHeart");
        likeHeart.innerHTML = '<i aria-label="likes" class="fas fa-heart"></i>';
        likeHeart.style.border = "1px solid red";

        likeNbBox.appendChild(likeNb);
        likeNbBox.appendChild(likeNbSpan);
        like.appendChild(likeNbBox);
        like.appendChild(likeHeart);

        caption.appendChild(title);
        caption.appendChild(like);

        mediaItemCard.appendChild(frame);
        mediaItemCard.appendChild(caption);
       

        likeHeart.addEventListener("click", function(e) {
            //console.log(template._mediaItem.likes);
            template._mediaItem.likes++ ;
            likeNb.textContent = template._mediaItem.likes;
            sumLikes();
        });

        likeHeart.addEventListener("keyup", (e) => {
            if (e.key === "Enter") {
                template._mediaItem.likes++ ;
                likeNb.textContent = template._mediaItem.likes;
                sumLikes(); 
            };
        }); 

        return mediaItemCard;
    };
};