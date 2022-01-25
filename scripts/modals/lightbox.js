class Lightbox {

    create() {
        const modalContent = document.querySelector(".modalContent");
        modalContent.classList.add("lightbox");
      //  modalContent.setAttribute("aria-label", "image closeup view");

        const carousel = document.createElement("div");
        carousel.classList.add("carousel");
        carousel.setAttribute("tabindex", "-1");

        const lightboxFrame =  document.createElement("div");
        lightboxFrame.setAttribute("id", "lightbox-frame");
        lightboxFrame.setAttribute("tabindex", "-1");
       // console.log(lightboxFrame);
    
        carousel.appendChild(lightboxFrame);
        modalContent.appendChild(carousel);
       // console.log(modalContent);

    };
};

function prepareBeforeClosing (){

    const modalContent = document.querySelector(".modalContent");
    modalContent.classList.remove("lightbox");

    const mediaWrapper = document.querySelector(".mediaWrapper");
    mediaWrapper.classList.remove("mediaWrapper-inLightbox");
    mediaWrapper.classList.add("mediaWrapper-inMain");
    mediaWrapper.removeAttribute("tabindex");
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