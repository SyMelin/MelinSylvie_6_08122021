class OpenTriggerLightbox extends OpenTrigger {

    constructor(type) {
        super(type)
    }

    set(){
        const frameAll = document.querySelectorAll(".mediaWrapper .thumb-imgfull .thumb-img");
        frameAll.forEach((frame) => {
            this.setEventListener(frame);
        });
    };

    setEventListener(frame){
        //Ouverture de la modale Lightbox au clic sur une image
        frame.addEventListener("click", (e) => {
            console.log("cliqué");
            this.preloadModalLightbox(frame);
        });
        //Ouverture de la modale Lightbox via la touche ENTREE
        frame.addEventListener("keyup", (e) => {
            const modal = document.querySelector(".modal");
            const modalState = modal.getAttribute("aria-hidden");
            if ((e.key === "Enter") && (modalState == "true")) {
                e.preventDefault();
                this.preloadModalLightbox(frame);
            };
        });   
    };

    preloadModalLightbox(frame){
        
        //Si l'image cliquée ne se situe pas déjà dans la lightbox, affichage du carrousel dans la modale
        if ((frame.classList.contains("inLightbox")) === false) {
            const lightboxModal = new Modal("lightbox_modal", 'lightbox');
            lightboxModal.createModal();
            
            const frameAll = document.querySelectorAll(".mediaWrapper .thumb-imgfull .thumb-img");
            frameAll.forEach((frame) => {
                ["inMain", "inLightbox" ].map(element => frame.classList.toggle(element));
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
            ["inMain", "inLightbox" ].map(element => mediaWrapper.classList.toggle(element));
        
           
            document.querySelector(".carousel").appendChild(mediaWrapper);
            const lightboxCarousel = new Carousel(document.querySelector(".carousel .mediaWrapper"), cardIndex);
            
            
            this.displayModal(); //Méthode de la class OpenTrigger
        };
    };
};