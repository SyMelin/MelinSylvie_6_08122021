class Lightbox {

    create() {
        const modalContent = document.querySelector(".modal .modalContent");
        modalContent.classList.add("lightbox");
        modalContent.setAttribute("arial-label", "image closeup view");

        const carousel = document.createElement("div");
        carousel.classList.add("carousel");

        const lightboxFrame =  document.createElement("div");
        lightboxFrame.setAttribute("id", "lightbox-frame");
        lightboxFrame.setAttribute("tabindex", "2");
        console.log(lightboxFrame);
    
        carousel.appendChild(lightboxFrame);
        modalContent.appendChild(carousel);
        console.log(modalContent);

    };
};

function prepareBeforeClosing (){

    const modalContent = document.querySelector(".modal .modalContent");
    modalContent.classList.remove("lightbox");

    const mediaWrapper = document.querySelector(".mediaWrapper");
    mediaWrapper.classList.remove("mediaWrapper-inLightbox");
    mediaWrapper.classList.add("mediaWrapper-inMain");
    mediaWrapper.style.transform = "translate3d(0%, 0em, 0em)";
    mediaWrapper.style.width = "85%";

    const mediaCardAll = document.querySelectorAll("#lightbox-frame .mediaWrapper .thumb-imgfull");
    mediaCardAll.forEach((mediaCard) => {
        mediaCard.classList.remove(".thumb-imgfull-inLightbox");
        mediaCard.style.width = "21.875em";
    });

    const mediaLike = document.querySelectorAll("#lightbox-frame .mediaCard__like");
    for (let like of mediaLike){
        like.classList.toggle("hidden");
        like.classList.toggle("like-caption-visible");

    };

    const frameAll = document.querySelectorAll("#lightbox-frame .mediaWrapper .thumb-imgfull .thumb-img");
    frameAll.forEach((frame) => {
        frame.classList.remove("frame-inLightbox");
        let ariaLabel = String(frame.getAttribute("arial-label"));
            ariaLabel = ariaLabel + ", closeup view";
            frame.setAttribute("arial-label", ariaLabel);
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


function closeLightbox() {
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
                closeLightbox();
            };
    };
});