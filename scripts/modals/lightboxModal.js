class LightboxModal {

    create() {
        const modalContent = document.querySelector(".modal__content");
        modalContent.classList.add("modal--lightbox");
      //  modalContent.setAttribute("aria-label", "image closeup view");

        const carousel = document.createElement("div");
        carousel.classList.add("carousel");
        carousel.setAttribute("tabindex", "-1");

        modalContent.prepend(carousel);
    };
};

function prepareBeforeClosing (){

    const main = document.getElementById("main");
    main.classList.remove("hidden");

    const modal = document.querySelector(".modal");
    modal.removeAttribute("aria-label");

    const modalContent = document.querySelector(".modal__content");
    modalContent.classList.remove("modal--lightbox");

    const mediaWrapper = document.querySelector(".mediaWrapper");
    mediaWrapper.classList.remove("mediaWrapper--inLightbox");
    mediaWrapper.classList.add("mediaWrapper--inMain");
    mediaWrapper.removeAttribute("tabindex");
    //mediaWrapper.style.transform = "translate3d(0%, 0em, 0em)";

    const mediaCardAll = document.querySelectorAll(".carousel .mediaWrapper .thumb-imgfull");
    mediaCardAll.forEach((mediaCard) => {
        mediaCard.classList.remove("thumb-imgfull--inLightbox", "hidden");
        mediaCard.classList.add("thumb-imgfull--inMain");
        mediaCard.setAttribute("role", "image link");
    });

    const mediaLike = document.querySelectorAll(".carousel .mediaCard__like");
    for (let like of mediaLike){
        like.classList.toggle("hidden");
        like.classList.toggle("like-caption-visible");

    };

    const frameAll = document.querySelectorAll(".carousel .mediaWrapper .thumb-imgfull .thumb-img");
    frameAll.forEach((frame) => {
        frame.classList.remove("frame--inLightbox");
        frame.setAttribute("role", "link");
        let ariaLabel = String(frame.getAttribute("aria-label"));
        ariaLabel = ariaLabel + ", closeup view";
        frame.setAttribute("aria-label", ariaLabel);
    });

    const videoAll = document.querySelectorAll(".mediaWrapper .thumb-imgfull .thumb-img video");
    console.log("videoAll", videoAll);
    videoAll.forEach((video) => {
        video.removeAttribute("controls");
        video.pause();
        video.currentTime = "0";
    });

    document.getElementById("main").appendChild(mediaWrapper);
};


function closeLightboxModal() {
    prepareBeforeClosing();
    closeModal();
};


// Fermeture de la modale via le touche Echap
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