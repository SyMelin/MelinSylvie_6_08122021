  async function getPhotographers() {
        // Penser à remplacer par les données récupérées dans le json
        const photographers = await apiPhotographers;
        // et bien retourner le tableau photographers seulement une fois
        //console.log(photographers);
        return photographers;
    };

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
    photographers.forEach((photographer) => {
        const photographerModel = new PhotographerThumb(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

    async function init() {
        const photographers = await getPhotographers();
        console.log(photographers);
        displayData(photographers);
    };

    init();