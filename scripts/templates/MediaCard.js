class MediaItemCard {

    constructor(mediaItem) {
        this._mediaItem = mediaItem;
    };

    createMediaItemCard () {

        const box = document.createElement("div");
        
        const frame = document.createElement("div");
        frame.classList.add(".thumb-img");
       
        frame.setAttribute('alt', ""); //
        frame.style.width = "350px";
        frame.style.height = "300px";
      //  img.style.objectFit = "cover";
        frame.style.borderRadius = "5px";
        frame.style.backgroundImage = "url("+`assets/photographers/${this._mediaItem.photographerId}/${this._mediaItem.image}`+")";
        frame.style.backgroundSize = "cover";
        frame.style.backgroundPosition = "center";

        //frame.appendChild(img);
        
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

        likeHeart.innerHTML = '<i class="fas fa-heart"></i>';
        likeHeart.style.border = "1px solid red";

        like.appendChild(likeNb);
        like.appendChild(likeHeart);

        caption.appendChild(title);
        caption.appendChild(like);

        box.appendChild(frame);
        box.appendChild(caption);
       

        console.log("createMCard");
        return box;
    };
};