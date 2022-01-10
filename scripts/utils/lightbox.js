function displayModalL() {

    const modal = document.getElementById("lightbox_modal");
	modal.style.display = "block";
    modal.setAttribute("aria-hidden", "false");
    document.querySelector("#lightbox_modal .modalContent").focus();
    const lightframe = document.getElementById("lightbox-frame");//met le focus sur votre modale une fois cette dernière ouverte
 
    const header = document.getElementById("header");
    const main = document.getElementById("main");
    header.setAttribute("aria-hidden", "true");
    main.setAttribute("aria-hidden", "true");

};

function closeModalL() {
    console.log("HELLO");
    const modal = document.getElementById("lightbox_modal");
    console.log("modal", modal);
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");

    const mediaWrapper = document.querySelector("#lightbox-frame .mediaWrapper");
    mediaWrapper.style.transform = "translate3d(0%, 0px, 0px)";
    mediaWrapper.style.width = "85%";

    const mediaCard = document.querySelectorAll("#lightbox-frame .mediaWrapper .thumb-imgfull");
    mediaCard.forEach((card) => {
        card.style.width = "350px";
    });

    const frameAll = document.querySelectorAll(".mediaWrapper .thumb-imgfull .thumb-img");
    console.log("frameAll", frameAll);
    frameAll.forEach((item) => {
        item.classList.remove("inLightbox");
        item.style.width = "350px";
    });

    const navBtnAll = document.querySelectorAll(".lightbox .navBtn");
    console.log("navBtnAll", navBtnAll);
    navBtnAll.forEach((btn) => {
        btn.parentElement.removeChild("btn");
    });

    document.getElementById("main").appendChild(mediaWrapper);


    //Remettre le focus sur le reste du document???????

    const header = document.getElementById("header");
    const main = document.getElementById("main");
    header.setAttribute("aria-hidden", "true");
    main.setAttribute("aria-hidden", "true");

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