function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
    modal.setAttribute("aria-hidden", "false");
    document.querySelector("#contact_modal .modalContent").focus();//met le focus sur votre modale une fois cette dernière ouverte

    const header = document.getElementById("header");
    const main = document.getElementById("main");
    header.setAttribute("aria-hidden", "true");
    main.setAttribute("aria-hidden", "true");
};

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");

    const header = document.getElementById("header");
    const main = document.getElementById("main");
    header.setAttribute("aria-hidden", "false");
    main.setAttribute("aria-hidden", "false");
};


// on récupère l'élément bouton de contact
//const contactBtn = document.querySelector(".contact_button");
// on écoute l'évènement "click" sur le bouton:  celui-ci déclenche la fermeture de la modale
//contactBtn.addEventListener("click", displayModal);

// Fermeture de la modale quand in appuie sur échap

// Fermeture de la modale via le touche Echap
window.addEventListener("keyup", function(e) {
    const modal = document.getElementById("contact_modal");
    const modalState = modal.getAttribute("aria-hidden");
    if ((e.key === "Escape") && (modalState === "false")) {
        e.preventDefault();
        closeModal();
    };
});