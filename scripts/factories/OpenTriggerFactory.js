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