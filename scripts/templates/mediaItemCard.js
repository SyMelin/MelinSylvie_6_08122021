/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
class MediaItemCard {

    /**
     * @param {Object} mediaItem un élément de media
     */

    constructor(mediaItem) {
        this._mediaItem = mediaItem;
    }

    createMediaItemCard () {

        const mediaItemCard = document.createElement('article');
        mediaItemCard.classList.add('thumb-imgfull', 'inMain');

        const template = new MediaItemFrame('lightbox', this._mediaItem, this._width, this._height, this._radius); //le param 'lightbox' fait référence au type nécessaire pour le class OpenTriggerLightbox
        const frame = template.createMediaItemFrame();
        frame.setAttribute('tabindex', 0);
        frame.classList.add('tabindex0');
        
        const caption = document.createElement('div');
        caption.classList.add('caption');

        const title = document.createElement('p');
        title.setAttribute('tabindex', 0);
        title.classList.add('tabindex0', 'title-caption');
        title.textContent = template._mediaItem.title;
    
        const like = document.createElement('div');
        like.setAttribute('tabindex', -1);
        like.classList.add('mediaCard__like', 'like-caption-visible');

        const likeNbBox = document.createElement('div');
        likeNbBox.setAttribute('tabindex', 0);
        likeNbBox.classList.add('tabindex0');

        const likeNb = document.createElement('p');
        likeNb.setAttribute('aria-hidden', true);
        likeNb.textContent = template._mediaItem.likes;
        // ajout de span pour accessibilité de likeNb
        const likeNbSpan = document.createElement('span');
        likeNbSpan.classList.add('screenreader-text');
        likeNbSpan.textContent = template._mediaItem.likes + " likes";  


        const likeHeartContainer = document.createElement('div');
        likeHeartContainer.setAttribute('tabindex', 0);
        likeHeartContainer.setAttribute('ckecked', false);
        likeHeartContainer.classList.add('tabindex0', 'likeHeartContainer');
        

        const likeHeart = document.createElement('div');
        likeHeart.classList.add('likeHeart');
        likeHeart.innerHTML = '<i aria-label="likes" class="fas fa-heart"></i>';
        // ajout de span pour accessibilité de likeHeart
        const likeHeartSpan = document.createElement('span');
        likeHeartSpan.textContent = "Cliquer sur ce bouton pour aimer ce média .";
        likeHeartSpan.classList.add('screenreader-text');

        [likeHeart, likeHeartSpan].map(element => likeHeartContainer.appendChild(element));
        [likeNb, likeNbSpan].map(element => likeNbBox.appendChild(element));
        [likeNbBox, likeHeartContainer].map(element => like.appendChild(element));
        [title, like].map(element => caption.appendChild(element));
        [frame, caption].map(element => mediaItemCard.appendChild(element));


        ///////////// Evenements sur le conteneur de l'icone coeur cliquable ///////////////////////

        function calculateMediaNumberOfLikes () {
            let state = likeHeartContainer.getAttribute('ckecked');
            if (state == "false") {
                likeHeartContainer.setAttribute('ckecked', true);
                template._mediaItem.likes++ ;
                likeNb.textContent = template._mediaItem.likes;
                likeNbSpan.textContent = template._mediaItem.likes + " likes";
                likeHeart.classList.add('liked');
                likeHeartSpan.textContent = "Cliquer sur ce bouton pour ne plus aimer ce média .";
            } else {
                likeHeartContainer.setAttribute('ckecked', false);
                template._mediaItem.likes-- ;
                likeNb.textContent = template._mediaItem.likes;
                likeNbSpan.textContent = template._mediaItem.likes + " likes";
                likeHeart.classList.remove('liked');
                likeHeartSpan.textContent = "Cliquer sur ce bouton pour aimer ce média .";
            }
        }

        likeHeartContainer.addEventListener('click', function(e) {
            calculateMediaNumberOfLikes();
            sumLikes(photographerMedia);
            likeNbBox.focus();
        });

        likeHeartContainer.addEventListener('keyup', function(e) {
            if (e.key === "Enter") {
                calculateMediaNumberOfLikes();
                sumLikes(photographerMedia);
                likeNbBox.focus();
            }
        }); 

        return mediaItemCard;
    }
}