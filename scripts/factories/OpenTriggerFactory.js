class OpenTriggerFactory {

    constructor(type) {
        switch(type) {
            case 'contactForm' :
                const contactButton = new OpenTriggerContactButton(type);
                contactButton.set();
            break;
            case 'lightbox' :
                const frameAll = new OpenTriggerLightbox(type);
                frameAll.set();
            break;
        };
    }    
};



class OpenTrigger {
    
    constructor(type) {
        this._type = type;
    }

    displayModal() {
        const modal = document.querySelector(".modal");
        modal.style.display = "block";
        modal.setAttribute("aria-hidden", false);
        document.querySelector(".modal").focus();//met le focus sur la modale une fois cette dernière ouverte
      
        const header = document.getElementById("header");
        const main = document.getElementById("main");
        header.setAttribute("aria-hidden", true);
        main.setAttribute("aria-hidden", true);
    };
};



class OpenTriggerContactButton extends OpenTrigger {

    constructor(type) {
        super(type)
    }

    set() {
        const contactButton = document.querySelector(".contact-button");

        contactButton.addEventListener("click", (e) => {
            this.openContactFormModal();
        });
        //  contactButton.setAttribute("onclick", "openContactFormModal()");

        contactButton.addEventListener("keyup", (e) => {
            e.preventDefault();
            if (e.key === "Enter") {
                this.openContactFormModal();
            };
        });
    };

    openContactFormModal() {
        console.log("hello");
        let newContactForm = new Modal("contact_modal", 'contactForm');
        newContactForm.createModal();
        console.log("helloooooo");
        this.displayModal();
    };
};



class OpenTriggerLightbox extends OpenTrigger {

    constructor(type) {
        super(type)
    }

    set(){

        const frameAll = document.querySelectorAll(".mediaWrapper .thumb-imgfull .thumb-img");
        frameAll.forEach((frame) => {

            //Ouverture de la modale Lightbox au clic sur une image
            frame.addEventListener("click", (e) => {
                this.preloadModalLightbox(frame);
            });

            //Ouverture de la modale Lightbox via la touche ENTREE
            frame.addEventListener("keyup", (e) => {
                const modal = document.querySelector(".modal");
                const modalState = modal.getAttribute("aria-hidden");
                console.log(modalState);
                if ((e.key === "Enter") && (modalState === "true")) {
                    e.preventDefault();
                    this.preloadModalLightbox(frame);
                };
            });   
        });
    };


    preloadModalLightbox(frame){
        
        //Si l'image cliquée ne se situe pas déjà dans la lightbox, affichage du carrousel dans la modale
        if ((frame.classList.contains("thumb-img--inLightbox")) == false) {
            const lightboxModal = new Modal("lightbox_modal", 'lightbox');
            console.log("L", lightboxModal);
            lightboxModal.createModal();
            
            const frameAll = document.querySelectorAll(".mediaWrapper .thumb-imgfull .thumb-img");
            frameAll.forEach((frame) => {
                ["thumb-img--inMain", "thumb-img--inLightbox" ].map(element => frame.classList.toggle(element));
                let ariaLabel = String(frame.getAttribute("aria-label"));
                ariaLabel = ariaLabel.replace(", closeup view", "");
                frame.setAttribute("role", "image");
                frame.setAttribute("aria-label", ariaLabel);
                if (frame.firstChild){
                    frame.setAttribute("role", "video");
                    const video = frame.firstChild;
                    video.setAttribute("controls", true);
                    video.pause();
                    video.currentTime = "0";
                };
            });
    
            //On récupère la mediaCard dont l'image a été cliquée
            const mediaCard = frame.parentElement;
        
            //On récupère toutes les mediaCard
            const mediaCardAll = document.querySelectorAll(".mediaWrapper .thumb-imgfull");
            const mediaArray = Array.from(mediaCardAll);
            
            //On récupère l'index de la mediaCard dans le tableau regroupant toutes les mediaCard
            let cardIndex = mediaArray.indexOf(mediaCard);
            
            const mediaWrapper = document.querySelector(".mediaWrapper");
            ["mediaWrapper--inMain", "mediaWrapper--inLightbox" ].map(element => mediaWrapper.classList.toggle(element));
        
           
            document.querySelector(".carousel").appendChild(mediaWrapper);
            const lightboxCarousel = new Carousel(document.querySelector(".carousel .mediaWrapper"), cardIndex);
            // console.log("cardIndex", cardIndex);
        
            this.displayModal();
        };
    };
};