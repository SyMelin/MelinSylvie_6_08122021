class LightboxModal {

    create() {
        const modalContent = document.querySelector(".modal__content");
        modalContent.classList.add("modal--lightbox");

        const carousel = document.createElement("div");
        carousel.classList.add("carousel");
        carousel.setAttribute("tabindex", "-1");

        modalContent.prepend(carousel);
    };
};

function prepareBeforeClosing (){

    const main = document.getElementById("main");
    main.classList.remove("hidden");

    //On réinitialise la modale
    const modal = document.querySelector(".modal");
    modal.removeAttribute("aria-label");

    const modalContent = document.querySelector(".modal__content");
    modalContent.classList.remove("modal--lightbox");

    //On réinitialise le conteneur de médias ainsi que leurs éléments
    const mediaWrapper = document.querySelector(".mediaWrapper");
    ["mediaWrapper--inMain", "mediaWrapper--inLightbox" ].map(element => mediaWrapper.classList.toggle(element));
    mediaWrapper.removeAttribute("tabindex");
    //mediaWrapper.style.transform = "translate3d(0%, 0em, 0em)";

    const mediaLike = document.querySelectorAll(".carousel .mediaCard__like");
    for (let like of mediaLike){
        ["like-caption-visible", "hidden" ].map(element => like.classList.toggle(element));
    };

    const frameAll = document.querySelectorAll(".carousel .mediaWrapper .thumb-imgfull .thumb-img");
    frameAll.forEach((frame) => {
        ["thumb-img--inMain", "thumb-img--inLightbox" ].map(element => frame.classList.toggle(element));
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
        ["thumb-imgfull--inMain", "thumb-imgfull--inLightbox" ].map(element => mediaCard.classList.toggle(element));
        if (mediaCard.classList.contains("hidden")){
            console.log("HIDDEN");
            mediaCard.classList.remove("hidden");
        } else {
            mediaCard.firstChild.focus();
            console.log(document.activeElement);
        };
    });
};


function closeLightboxModal() {
    prepareBeforeClosing();
    closeModal();
    //console.log("active element", document.activeElement);
};


// Fermeture de la modale via la touche Echap
window.addEventListener("keyup", function(e) {
    e.preventDefault();
    const modal = document.getElementById("lightbox_modal");
   // console.log("modal", modal);
    if (modal) {
        const modalState = modal.getAttribute("aria-hidden");
        // console.log("modalStateLightbox", modalState);
        if ((e.key === "Escape") && (modalState === "false")) {
            e.preventDefault();
            closeLightboxModal();
        };
    };
});