function displayModalL(frameCard) {

    const modal = document.getElementById("lightbox_modal");
	modal.style.display = "block";
    modal.setAttribute("aria-hidden", "false");
    const lightframe = document.getElementById("lightbox-frame");
    lightframe.style.width = "1050px";
    lightframe.style.height = "900px";
    lightframe.style.borderRadius = "5px";

    console.log('CA FONCTIONNE', frameCard);

    lightframe.appendChild(frameCard);

};

function closeModalL() {
    const modal = document.getElementById("lightbox_modal");
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");

    
}

