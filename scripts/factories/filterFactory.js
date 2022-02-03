class FilterFactory {
    constructor (value, photographerMedia) {
        this._filter = new Filter(photographerMedia);
        switch(value) {
            case "date" :
                this._filter.filterByDate();
            break;
            case "title" :
                this._filter.filterByTitle();
            break;
            case "popularity" :
                this._filter.filterByPopularity();
            break;
        }
    };
};


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