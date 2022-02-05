class OpenTriggerContactButton extends OpenTrigger {

    constructor(type) {
        super(type)
    }

    set() {
        const contactButton = document.querySelector(".contact-button");

        contactButton.addEventListener("click", (e) => {
            this.openContactFormModal();
        });

        contactButton.addEventListener("keyup", (e) => {
            e.preventDefault();
            if (e.key === "Enter") {
                this.openContactFormModal();
            };
        });
    };

    openContactFormModal() {
        let newContactForm = new Modal("contact_modal", 'contactForm');
        newContactForm.createModal();
        this.displayModal(); //Méthode de la class OpenTrigger
    };
};