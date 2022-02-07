class OpenTriggerContactButton extends OpenTrigger {

    /**
     * @param {string} type type de modale à créer
     */

    constructor(type) {
        super(type)
    }

    set() {
        const contactButton = document.querySelector('.contact-button');

        contactButton.addEventListener('click', (e) => {
            this.openContactFormModal();
        });

        contactButton.addEventListener('keyup', (e) => {
            e.preventDefault();
            if (e.key === "Enter") {
                this.openContactFormModal();
            };
        });
    };

    openContactFormModal() {
        let newContactForm = new Modal('contact-modal', 'contactForm');
        newContactForm.createModal();
        this.displayModal(); //Méthode de la classe OpenTrigger
    };
};