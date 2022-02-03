class CloseBtnFactory {

    constructor(type) {

        switch (type) {
            case 'contactForm' :
                let closeBtnContactForm = new CloseBtnContactForm(type);
                closeBtnContactForm.create();
            break;
            case 'lightbox' :
                let closeBtnLightbox = new CloseBtnLightbox(type);
                closeBtnLightbox.create(); 
            break;
        };
    }; 
};



class CloseBtn {

    constructor(type) {
        this._type = type;
    }

    closeModal() {

        //On rend la modale inaccessible
        const modal = document.querySelector(".modal");
        modal.style.display = "none";
        modal.setAttribute("aria-hidden", true);
    
        //On vide le contenu de la modale de tout ses éléments sauf le bouton close
        const modalContent = document.querySelector(".modal__content");
        const children = Array.from(modalContent.children);
        let closeBtn =  document.querySelector(".modal__content .closeBtn");
        children.forEach((child) => {
            if (child != closeBtn) {
                modalContent.removeChild(child);
            };
        });
        console.log("modalContent", modalContent);
    
        //On rend accessible le reste de la page
        const header = document.getElementById("header");
        const main = document.getElementById("main");
        header.setAttribute("aria-hidden", false);
        main.setAttribute("aria-hidden", false);
    
        //On rétablit les tabindex = 0 sur les éléments concernés
        const allTabindex0 = Array.from(document.getElementsByClassName("tabindex0"));
        allTabindex0.forEach((element) => {
            element.setAttribute("tabindex", 0);
        });
    
        //On établit de retour la modale par défaut
        modal.removeAttribute("id");
        //closeBtn.removeAttribute("onclick");
    };
}



class CloseBtnContactForm extends CloseBtn {

    constructor (type) {
        super(type)
    }

    create() {

        let closeBtn =  document.querySelector(".modal__content .closeBtn");
        // closeBtn.setAttribute("onclick", "closeContactFormModal()");
        closeBtn.setAttribute("aria-label", "Close Contact form");
        closeBtn.setAttribute("tabindex", "0");

        // Fermeture de la modale au clic sur closeBtn
        closeBtn.addEventListener("click", (e) => {
            e.preventDefault();
            this.closeContactFormModal(e);
        });


        // Fermeture de la modale via la touche Enter sur closeBtn
        closeBtn.addEventListener("keyup", (e) => {
            e.preventDefault();
            if (e.key === "Enter") {
                this.closeContactFormModal(e);
            };
        });

        // Fermeture de la modale via la touche Echap
        window.addEventListener("keyup", (e) => {
            e.preventDefault();
            if (e.key === "Escape") {
                this.closeContactFormModal(e);
            };
        });
    };

    prepareBeforeClosingContactForm() {
        const modal = document.querySelector(".modal");
        modal.removeAttribute("aria-labelledby");
        const modalContent = document.querySelector(".modal .modal__content");
       // modalContent.removeAttribute("tabindex");
        modalContent.classList.remove("modal--contact-form");
    
        // Le bouton contact du header récupère le focus à la fermeture du formulaire de contact
        const contactBtn = document.querySelector(".photograph-header .contact-button");
        contactBtn.focus();
    };

    initContactFormModal() {
        this.prepareBeforeClosingContactForm();
        this.closeModal(); //méthode de la class CloseBtn
       // console.log("active element", document.activeElement);
    };

    closeContactFormModal(event){
        const modal = document.getElementById("contact_modal");
        if (modal) {
            const modalState = modal.getAttribute("aria-hidden");
            if (modalState === "false") {
                event.preventDefault();
                this.initContactFormModal();
            };
        };
    };
};



class CloseBtnLightbox extends CloseBtn {

    constructor (type) {
        super(type)
    }

    create() {

        let closeBtn =  document.querySelector(".modal__content .closeBtn");
        closeBtn.setAttribute("aria-label", "Close dialog");
        closeBtn.setAttribute("tabindex", "0");

        // Fermeture de la modale au clic
        closeBtn.addEventListener("click", (e) => {
            e.preventDefault();
            this.closeLightboxModal(e);
        });

        // Fermeture de la modale via la touche Enter sur closeBtn
        closeBtn.addEventListener("keyup", (e) => {
            e.preventDefault();
            if (e.key === "Enter") {
                this.closeLightboxModal(e);
            };
        });

        // Fermeture de la modale via la touche Echap
        window.addEventListener("keyup", (e) => {
            e.preventDefault();
            if (e.key === "Escape") {
                this.closeLightboxModal(e);
            };
        });
    };

    prepareBeforeClosingLightbox (){

        const main = document.getElementById("main");
        main.classList.remove("hidden");

        //On réinitialise la modale
        const modal = document.querySelector(".modal");
        modal.removeAttribute("aria-label");

        const modalContent = document.querySelector(".modal__content");
        modalContent.classList.remove("modal--lightbox");

        //On réinitialise le conteneur de médias ainsi que leurs éléments
        const mediaWrapper = document.querySelector(".mediaWrapper");
        ["mediaWrapper--inMain", "mediaWrapper--inLightbox" ].map(element => mediaWrapper.classList.toggle(element));
        mediaWrapper.removeAttribute("tabindex");

        const mediaLike = document.querySelectorAll(".carousel .mediaCard__like");
        for (let like of mediaLike){
            ["like-caption-visible", "hidden" ].map(element => like.classList.toggle(element));
        };

        const frameAll = document.querySelectorAll(".carousel .mediaWrapper .thumb-imgfull .thumb-img");
        frameAll.forEach((frame) => {
            ["thumb-img--inMain", "thumb-img--inLightbox" ].map(element => frame.classList.toggle(element));
            frame.setAttribute("role", "link");
            let ariaLabel = String(frame.getAttribute("aria-label"));
            ariaLabel = ariaLabel + ", closeup view";
            frame.setAttribute("aria-label", ariaLabel);
        });

        const videoAll = document.querySelectorAll(".mediaWrapper .thumb-imgfull .thumb-img video");
        videoAll.forEach((video) => {
            video.removeAttribute("controls");
            video.pause();
            video.currentTime = "0";
        });

        //On replace le conteneur de médias dans le main
        document.getElementById("main").appendChild(mediaWrapper);

        //On remet le focus sur le dernier media visualisé dans la lightbox 
        const mediaCardAll = document.querySelectorAll(".mediaWrapper .thumb-imgfull");
        mediaCardAll.forEach((mediaCard) => {
            ["thumb-imgfull--inMain", "thumb-imgfull--inLightbox" ].map(element => mediaCard.classList.toggle(element));
            if (mediaCard.classList.contains("hidden")){
                console.log("HIDDEN");
                mediaCard.classList.remove("hidden");
            } else {
                mediaCard.firstChild.focus();
                console.log(document.activeElement);
            };
        });
    };

    initLightboxModal() {
        this.prepareBeforeClosingLightbox();
        this.closeModal();
        //console.log("active element", document.activeElement);
    };

    closeLightboxModal(event){
        const modal = document.getElementById("lightbox_modal");
        if (modal) {
            const modalState = modal.getAttribute("aria-hidden");
            if (modalState === "false") {
                event.preventDefault();
                this.initLightboxModal();
            };
        };
    };
};