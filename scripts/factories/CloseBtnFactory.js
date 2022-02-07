class CloseBtnFactory {

    constructor(type) {

        switch (type) {
            case 'contactForm' :
                let closeBtnContactForm = new CloseBtnContactForm(type);
                closeBtnContactForm.set();
            break;
            case 'lightbox' :
                let closeBtnLightbox = new CloseBtnLightbox(type);
                closeBtnLightbox.set(); 
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
        ['modal--close', 'modal--open'].map(element => modal.classList.toggle(element));
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
        allTabindex0 = Array.from(document.getElementsByClassName('tabindex0'));
        allTabindex0.forEach((element) => {
            if (!(element.classList.contains('option'))){
                element.setAttribute('tabindex', 0);
            }  
        });

        //On rend l'accessibilité aux éléments concernés
        const noAccessAll = Array.from(document.getElementsByClassName('noAccess'));
        noAccessAll.forEach((element) => {
             element.setAttribute('tabindex', 0);
        });
       
        //On établit de retour la modale par défaut
        modal.removeAttribute('id');
    };
};