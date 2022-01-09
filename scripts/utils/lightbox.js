function displayModalL() {

    const modal = document.getElementById("lightbox_modal");
	modal.style.display = "block";
    modal.setAttribute("aria-hidden", "false");
    document.querySelector("#lightbox_modal .modalContent").focus();
    const lightframe = document.getElementById("lightbox-frame");//met le focus sur votre modale une fois cette dernière ouverte
 /*  
     lightframe.style.width = "90%"
   // lightframe.style.height = "900px";
   // lightframe.style.borderRadius = "5px";
    lightframe.appendChild(clone);
*/
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
    document.getElementById("main").appendChild(mediaWrapper);

    mediaWrapper.classList.remove("start");
    mediaWrapper.classList.remove("goBack");
    mediaWrapper.classList.remove("goNext");

/*
    const clone = document.querySelector(".clone");
    clone.parentElement.removeChild(clone);
*/

    //Remettre le focus sur le reste du document???????

    const header = document.getElementById("header");
    const main = document.getElementById("main");
    header.setAttribute("aria-hidden", "true");
    main.setAttribute("aria-hidden", "true");

};

const flecheGAUCHE = document.getElementById("gauche");
flecheGAUCHE.addEventListener("click", function(e) {
    e.preventDefault();
    
    const mediaArray = Array.from(mediaCardAll);

    const indexMin = 0;
    const indexMax = mediaArray.length;
    
    if (cardIndex >= (1 + indexMin) && cardIndex < indexMax) {
        cardIndex-- ;
        console.log("carIndex", cardIndex);
        
        startTranslationX = endTranslationX;
        let startTranslationXpx = startTranslationX + "px";
        console.log(startTranslationXpx);
        endTranslationX = Number(startTranslationX) + 641.66;
        let endTranslationXpx = endTranslationX + "px";
        console.log(endTranslationXpx);  

        document.documentElement.style
            .setProperty('--my-startRight-translateX', startTranslationXpx);
        document.documentElement.style
            .setProperty('--my-endRight-translateX', endTranslationXpx);
    };

    const mediaWrapper = document.querySelector("#lightbox-frame .mediaWrapper");
    mediaWrapper.classList.remove("start");
    mediaWrapper.classList.remove("goNext");
    // console.log("gauche",mediaWrapper);

    mediaWrapper.classList.add("goBack");
    console.log(mediaWrapper.className);
});
    
const flecheDroite = document.getElementById("droite");
flecheDroite.addEventListener("click", function(e) {
    e.preventDefault();
   
   // console.log("droite",mediaWrapper);

    const mediaArray = Array.from(mediaCardAll);

    const indexMin = 0;
    const indexMax = mediaArray.length;
   
    
    if (cardIndex >= indexMin && cardIndex < (indexMax - 1)) {
        cardIndex++ ;
        console.log("carIndex", cardIndex);
       
        startTranslationX = endTranslationX;
        let startTranslationXpx = startTranslationX + "px";
        console.log(startTranslationXpx);
        endTranslationX = Number(startTranslationX) - 641.66;
        let endTranslationXpx = endTranslationX + "px";
        console.log(endTranslationXpx);

        const A = document.documentElement.style.getPropertyValue('--my-startLeft-translateX');
        console.log("A", A);
        document.documentElement.style
            .setProperty('--my-startLeft-translateX', startTranslationXpx);
            const B = document.documentElement.style.getPropertyValue('--my-startLeft-translateX');
            console.log("B", B);
        document.documentElement.style
            .setProperty('--my-endLeft-translateX', endTranslationXpx);
    };


    const mediaWrapper = document.querySelector("#lightbox-frame .mediaWrapper");
    mediaWrapper.classList.remove("start");
    mediaWrapper.classList.remove("goBack");
    mediaWrapper.classList.add("goNext");
    console.log(mediaWrapper.className);
});


/*
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
*/

// Fermeture de la modale via le touche Echap
window.addEventListener("keyup", function(e) {
    const modal = document.getElementById("lightbox_modal");
    const modalState = modal.getAttribute("aria-hidden");
    if ((e.key === "Escape") && (modalState === "false")) {
        e.preventDefault();
        closeModalL();
    };
});