function displayModalL(clone) {

    const modal = document.getElementById("lightbox_modal");
	modal.style.display = "block";
    modal.setAttribute("aria-hidden", "false");
    const lightframe = document.getElementById("lightbox-frame");
    lightframe.style.width = "1050px";
    lightframe.style.height = "900px";
    lightframe.style.borderRadius = "5px";
    lightframe.appendChild(clone);

};

function closeModalL() {
    console.log("HELLO");
    const modal = document.getElementById("lightbox_modal");
    console.log("modal", modal);
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");

};

const flecheGAUCHE = document.getElementById("gauche");
flecheGAUCHE.addEventListener("click", function(e) {
    const lightboxFrame = document.getElementById("lightbox-frame");
    const clone = lightboxFrame.firstChild;
    const mediaArray = Array.from(mediaCardAll);
    console.log("mediaArray", mediaArray);
    let previousIndex = clone.getAttribute("cardIndex");
    previousIndex-- ;
    let previousMedia = mediaArray[previousIndex];
    const previousClone = previousMedia.cloneNode(true);
    previousClone.setAttribute("cardIndex", previousIndex);
    previousClone.classList.add("clone");
    lightboxFrame.removeChild(clone);
    displayModalL(previousClone);
});

const flecheDROITE = document.getElementById("droite");
flecheDROITE.addEventListener("click", function(e) {
    const lightboxFrame = document.getElementById("lightbox-frame");
    const clone = lightboxFrame.firstChild;
    const mediaArray = Array.from(mediaCardAll);
    console.log("mediaArray", mediaArray);
    let afterIndex = clone.getAttribute("cardIndex");
    afterIndex++ ;
    console.log("afterIndex", afterIndex);
    let afterMedia = mediaArray[afterIndex];
    console.log("afterMedia", afterMedia);
    const afterClone = afterMedia.cloneNode(true);
    afterClone.setAttribute("cardIndex", afterIndex);
    afterClone.classList.add("clone");
    lightboxFrame.removeChild(clone);
    displayModalL(afterClone);
});
