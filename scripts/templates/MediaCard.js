class MediaItemCard {

    /**
     * @param {Object} mediaItem un élément de media
     */

    constructor(mediaItem) {
        this._mediaItem = mediaItem;
    };

    createMediaItemCard () {

        const box = document.createElement("div");
        box.classList.add("thumb-imgfull");

        const template = new MediaItemFrame(this._mediaItem, this._width, this._height, this._radius);
        const frame = template.createMediaItemFrame();
        frame.setAttribute("tabindex", "0");
        frame.classList.add("tabindex0");
        
        const caption = document.createElement("div");
        caption.classList.add("caption");

        const title = document.createElement("p");
        title.classList.add("title-caption");
        title.textContent = this._mediaItem.title;
        title.setAttribute("tabindex", "0");
        title.classList.add("tabindex0");

        const like = document.createElement("div");
        like.classList.add("like-caption")
        like.classList.add("mediaCard__like")

        const likeNb = document.createElement("p");
        likeNb.textContent = this._mediaItem.likes;
        likeNb.setAttribute("tabindex", "0");
        likeNb.classList.add("tabindex0");

        const likeHeart = document.createElement("div");
        likeHeart.classList.add("likeHeart");
        likeHeart.innerHTML = '<i aria-label="likes" class="fas fa-heart"></i>';
        likeHeart.style.border = "1px solid red";
        likeHeart.setAttribute("tabindex", "0");
        likeHeart.classList.add("tabindex0");

        like.appendChild(likeNb);
        like.appendChild(likeHeart);

        caption.appendChild(title);
        caption.appendChild(like);

        box.appendChild(frame);
        box.appendChild(caption);
       

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

        return box;
    };

};