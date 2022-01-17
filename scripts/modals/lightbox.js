class Lightbox {

    create() {
        const modalContent = document.querySelector(".modal .modalContent");
        modalContent.classList.add("lightbox");

        const carousel = document.createElement("div");
        carousel.classList.add("carousel");

        const lightboxFrame =  document.createElement("div");
        lightboxFrame.setAttribute("id", "lightbox-frame");
    
        carousel.appendChild(lightboxFrame);
        modalContent.appendChild(carousel);
        console.log(modalContent);
    };
};








function displayModalL() {

    const modal = document.getElementById("lightbox_modal");
	modal.style.display = "block";
    modal.setAttribute("aria-hidden", "false");
    document.querySelector("#lightbox_modal .modalContent").focus();//met le focus sur votre modale une fois cette dernière ouverte
    const lightframe = document.getElementById("lightbox-frame");
 
    const header = document.getElementById("header");
    const main = document.getElementById("main");
    header.setAttribute("aria-hidden", "true");
    main.setAttribute("aria-hidden", "true");

};


function prepareBeforeClosing (){

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
    /// console.log(this._container.mediaLike);
    for (let like of mediaLike){
        like.classList.toggle("hidden");
        like.classList.toggle("like-caption-visible");

    };

    const frameAll = document.querySelectorAll("#lightbox-frame .mediaWrapper .thumb-imgfull .thumb-img");
    frameAll.forEach((frame) => {
        frame.classList.remove("frame-inLightbox");
      //  item.style.width = "100%";
    });

    const videoAll = document.querySelectorAll(".mediaWrapper .thumb-imgfull .thumb-img video");
    console.log("videoAll", videoAll);
    videoAll.forEach((video) => {
        video.removeAttribute("controls");
        video.pause();
        video.currentTime = "0";
    });

  //  const navBtnAll = document.querySelectorAll(".lightbox .navBtn");
  //  navBtnAll.forEach((btn) => {
  //      btn.parentElement.removeChild(btn);
  //  });

    document.getElementById("main").appendChild(mediaWrapper);
};

function closeModalL() {

    prepareBeforeClosing();

    console.log("HELLO");
    
    const modal = document.querySelector(".modal");
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");

    //Remettre le focus sur le reste du document???????

    const modalContent = document.querySelector(".modal .modalContent");
    const children = [].slice.call(modalContent.children);
    console.log(children);
    const closeBtn =  document.querySelector(".modal .modalContent .closeBtn");
    children.forEach((child) => {
        if (child != closeBtn) {
            //console.log("notBTN");
            modalContent.removeChild(child);
            console.log(modalContent);
        };
    });


    const header = document.getElementById("header");
    const main = document.getElementById("main");
    header.setAttribute("aria-hidden", "false");
    main.setAttribute("aria-hidden", "false");

    modal.setAttribute("id", "");
    console.log("modal", modal);

};


// Fermeture de la modale via le touche Echap
window.addEventListener("keyup", function(e) {
    const modal = document.getElementById("lightbox_modal");
    const modalState = modal.getAttribute("aria-hidden");
    if ((e.key === "Escape") && (modalState === "false")) {
        e.preventDefault();
        closeModalL();
    };
});