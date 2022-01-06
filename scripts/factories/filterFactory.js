class FilterFactory {
    constructor (value, photographerMedia) {
        this._value = value;
        this._photographerMedia = photographerMedia;
    };
    createAFilter (){
        const filter = new Filter(this._photographerMedia);
        console.log(this._value);
        if (this._value == "date") {
            filter.filterByDate();
        } else if (this._value == "title") {
            filter.filterByTitle();   
        } else {
            filter.filterByPopularity();
        };
    };
};



// Classe utile pour la factory
class Filter {

    constructor(photographerMedia) {
        this._photographerMedia = photographerMedia;
    };

    filterByPopularity () {
        this._photographerMedia.sort(function (a, b) {
            return b.likes - a.likes;
        });
    };

    filterByDate () {

        this._photographerMedia.sort(function (a, b) {
            return Date.parse(b.date) - Date.parse(a.date);
        });
    };

    filterByTitle () {
            this._photographerMedia.sort(function (a, b) {
               if (a.video) {
                    a.title = a.video;//
                };
                return a.title.localeCompare(b.title) ;
            });
        };

};