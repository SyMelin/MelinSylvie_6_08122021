class CloseBtnLightbox extends CloseBtn {

    constructor (type) {
        super(type)
    }

    create() {

        let closeBtn =  document.querySelector(".modal__content .closeBtn");
        closeBtn.setAttribute("aria-label", "Close dialog");
        closeBtn.setAttribute("tabindex", "0");

        // Fermeture de la modale au clic
        closeBtn.addEventListener("click", (e) => {
            e.preventDefault();
            this.closeLightboxModal(e);
        });

        // Fermeture de la modale via la touche Enter sur closeBtn
        closeBtn.addEventListener("keyup", (e) => {
            e.preventDefault();
            if (e.key === "Enter") {
                this.closeLightboxModal(e);
            };
        });

        // Fermeture de la modale via la touche Echap
        window.addEventListener("keyup", (e) => {
            e.preventDefault();
            if (e.key === "Escape") {
                this.closeLightboxModal(e);
            };
        });
    };

    prepareBeforeClosingLightbox (){

        const main = document.getElementById("main");
        main.classList.remove("hidden");

        //On réinitialise la modale
        const modal = document.querySelector(".modal");
        modal.removeAttribute("aria-label");

        const modalContent = document.querySelector(".modal__content");
        modalContent.classList.remove("modal--lightbox");

        //On réinitialise le conteneur de médias ainsi que leurs éléments
        const mediaWrapper = document.querySelector(".mediaWrapper");
        ["inMain", "inLightbox" ].map(element => mediaWrapper.classList.toggle(element));
        mediaWrapper.removeAttribute("tabindex");

        const mediaLike = document.querySelectorAll(".carousel .mediaCard__like");
        for (let like of mediaLike){
            ["like-caption-visible", "hidden" ].map(element => like.classList.toggle(element));
        };

        const frameAll = document.querySelectorAll(".carousel .mediaWrapper .thumb-imgfull .thumb-img");
        frameAll.forEach((frame) => {
            ["inMain", "inLightbox" ].map(element => frame.classList.toggle(element));
            frame.setAttribute("role", "link");
            let ariaLabel = String(frame.getAttribute("aria-label"));
            ariaLabel = ariaLabel + ", closeup view";
            frame.setAttribute("aria-label", ariaLabel);
        });

        const videoAll = document.querySelectorAll(".mediaWrapper .thumb-imgfull .thumb-img video");
        videoAll.forEach((video) => {
            video.removeAttribute("controls");
            video.pause();
            video.currentTime = "0";
        });

        //On replace le conteneur de médias dans le main
        document.getElementById("main").appendChild(mediaWrapper);

        //On remet le focus sur le dernier media visualisé dans la lightbox 
        const mediaCardAll = document.querySelectorAll(".mediaWrapper .thumb-imgfull");
        mediaCardAll.forEach((mediaCard) => {
            ["inMain", "inLightbox" ].map(element => mediaCard.classList.toggle(element));
            if (mediaCard.classList.contains("hidden")){
                mediaCard.classList.remove("hidden");
            } else {
                mediaCard.firstChild.focus();
            };
        });
    };

    initLightboxModal() {
        this.prepareBeforeClosingLightbox();
        this.closeModal(); //méthode de la class CloseBtn
    };

    closeLightboxModal(event){
        const modal = document.getElementById("lightbox_modal");
        if (modal) {
            const modalState = modal.getAttribute("aria-hidden");
            if (modalState == "false") {
                event.preventDefault();
                this.initLightboxModal();
            };
        };
    };
};