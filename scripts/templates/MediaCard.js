class MediaItemCard {

    constructor(mediaItem, width, height, radius) {
        this._mediaItem = mediaItem;
        this._width = width;
        this._height = height;
        this._radius = radius;
        
    };

    createMediaItemCard () {

        const box = document.createElement("div");
        box.classList.add("thumb-imgfull")
        box.setAttribute("cardId", this._mediaItem.id);
        //console.log(box.attributes);

        const template = new MediaItemFrame(this._mediaItem, this._width, this._height, this._radius);
        const frame = template.createMediaItemFrame();
        
        const caption = document.createElement("div");
        caption.style.display = "flex";
        caption.style.justifyContent = "space-between";

        const title = document.createElement("p");
        title.textContent = this._mediaItem.title;

        const like = document.createElement("div");
        like.style.display = "flex";

        const likeNb = document.createElement("p");
        likeNb.textContent = this._mediaItem.likes;

        const likeHeart = document.createElement("div");

        likeHeart.innerHTML = '<i aria-label="likes" class="fas fa-heart"></i>';
        likeHeart.style.border = "1px solid red";

        like.appendChild(likeNb);
        like.appendChild(likeHeart);

        caption.appendChild(title);
        caption.appendChild(like);

        box.appendChild(frame);
        box.appendChild(caption);
       

        //console.log("createMCard");
        return box;
    };
};