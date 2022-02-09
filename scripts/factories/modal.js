/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/** La classe Modal génère des modales selon leur type.
    Elle gére les éléments communs aux différents types de modale.
    Elle gère la création de ses différents composants:
        * le ou les élément qui déclenchent l'ouverture de la modale
        * le contenu de la modale à créer
        * le ou les élements qui déclenchent sa fermeture
*/

class Modal {

    /**
     * @param {string} id id de la modale à créer
     * @param {string} type type de modale à créer
     */

    constructor (id, type) {
        this._id = id;
        this._type = type;
    }

    createModal() {
        
        const modal = document.querySelector('.modal')
        modal.setAttribute('id', this._id);

        const noAccessAll = Array.from(document.getElementsByClassName('noAccess'));
       
        switch (this._type) {

            case 'init' :
                this.setOpenTrigger('contactForm');
                this.setOpenTrigger('lightbox'); 
            break;

            case 'contactForm' :

                //On enlève la possibilité de focus su les éléments concernés
                allTabindex0 = Array.from(document.getElementsByClassName('tabindex0'));
                allTabindex0.forEach((element) => {
                    element.removeAttribute('tabindex');
                });

                //On initialise la  modal contacForm
                modal.setAttribute('aria-labelledby', 'contact-title');
                modal.setAttribute('tabindex', 1);
                
                this.createModalContent(this._type);
                this.createCloseBtn(this._type);

                //On enlève l'accessibilité aux éléments concernés
                noAccessAll.forEach((element) => {
                element.removeAttribute('autofocus');
                element.setAttribute('tabindex', -1);
                });
               
            break;

            case 'lightbox' :

                //La possibilité de focus sur les éléments concernés est enlevé au niveau de la création du contenu de la modale cf: la classe ModalContentFactory

                //On initialise la  modal contacForm
                modal.setAttribute('aria-label', 'image closeup view');
                modal.setAttribute('tabindex', 1);

                this.createModalContent(this._type);
                this.createCloseBtn(this._type);

                //On enlève l'accessibilité aux éléments concernés
                noAccessAll.forEach((element) => {
                element.removeAttribute('autofocus');
                element.setAttribute('tabindex', -1);
                });
                
            break;
        }
    }

    setOpenTrigger(type) {
        new OpenTriggerFactory(type);
    }

    createCloseBtn(type){
        new CloseBtnFactory(type);
    }

    createModalContent(type){
        new ModalContentFactory(type);
    } 
}