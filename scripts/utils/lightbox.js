function displayModalL(clone) {

    const modal = document.getElementById("lightbox_modal");
	modal.style.display = "block";
    modal.setAttribute("aria-hidden", "false");
    document.querySelector("#lightbox_modal .modalContent").focus();
    const lightframe = document.getElementById("lightbox-frame");//met le focus sur votre modale une fois cette dernière ouverte
    lightframe.style.width = "90%"
   // lightframe.style.height = "900px";
   // lightframe.style.borderRadius = "5px";
    lightframe.appendChild(clone);

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
    const clone = document.querySelector(".clone");
    clone.parentElement.removeChild(clone);

    const header = document.getElementById("header");
    const main = document.getElementById("main");
    header.setAttribute("aria-hidden", "true");
    main.setAttribute("aria-hidden", "true");

};

const flecheGAUCHE = document.getElementById("gauche");
flecheGAUCHE.addEventListener("click", function(e) {
    const lightboxFrame = document.getElementById("lightbox-frame");
    const clone = lightboxFrame.firstChild;
    const mediaArray = Array.from(mediaCardAll);
    //console.log("mediaArray", mediaArray);
    const indexMin = 0;
    const indexMax = mediaArray.length;
    let previousIndex = clone.getAttribute("cardIndex");
    previousIndex-- ;
    if (previousIndex >=indexMin && previousIndex < indexMax) {
        //console.log("previousIndex", previousIndex);
        let previousMedia = mediaArray[previousIndex];
       //console.log("previousMedia", previousMedia);
        const previousClone = previousMedia.cloneNode(true);
        previousClone.setAttribute("cardIndex", previousIndex);
        previousClone.classList.add("clone");
        lightboxFrame.removeChild(clone);
        displayModalL(previousClone);
    };
});

const flecheDROITE = document.getElementById("droite");
flecheDROITE.addEventListener("click", function(e) {
    const lightboxFrame = document.getElementById("lightbox-frame");
    const clone = lightboxFrame.firstChild;
    const mediaArray = Array.from(mediaCardAll);
    //console.log("mediaArray", mediaArray);
    const indexMin = 0;
    const indexMax = mediaArray.length;
    let afterIndex = clone.getAttribute("cardIndex");
    afterIndex++ ;
    if (afterIndex >=indexMin && afterIndex < indexMax) {
        //console.log("afterIndex", afterIndex);
        let afterMedia = mediaArray[afterIndex];
       //console.log("afterMedia", afterMedia);
        const afterClone = afterMedia.cloneNode(true);
        afterClone.setAttribute("cardIndex", afterIndex);
        afterClone.classList.add("clone");
        lightboxFrame.removeChild(clone);
        displayModalL(afterClone);
    };
});


// Fermeture de la modale via le touche Echap
window.addEventListener("keyup", function(e) {
    const modal = document.getElementById("lightbox_modal");
    const modalState = modal.getAttribute("aria-hidden");
    if ((e.key === "Escape") && (modalState === "false")) {
        e.preventDefault();
        closeModalL();
    };
});