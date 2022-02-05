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
        const modal = document.querySelector('.modal');
        modal.style.display = "none";
        modal.setAttribute('aria-hidden', true);
    
        //On vide le contenu de la modale de tout ses éléments sauf le bouton close
        const modalContent = document.querySelector('.modal__content');
        const children = Array.from(modalContent.children);
        let closeBtn =  document.querySelector('.modal__content .closeBtn');
        children.forEach((child) => {
            if (child != closeBtn) {
                modalContent.removeChild(child);
            };
        });
    
        //On rend accessible le reste de la page
        const header = document.getElementById('header');
        const main = document.getElementById('main');
        header.setAttribute('aria-hidden', false);
        main.setAttribute('aria-hidden', false);
    
        //On rétablit les tabindex = 0 sur les éléments concernés
        const allTabindex0 = Array.from(document.getElementsByClassName('tabindex0'));
        allTabindex0.forEach((element) => {
            element.setAttribute('tabindex', 0);
        });

        const headerLink = document.getElementById('header__link');
        headerLink.removeAttribute('tabindex');
    
        //On établit de retour la modale par défaut
        modal.removeAttribute('id');
    };
};