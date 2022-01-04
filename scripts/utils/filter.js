class Filter {

    constructor(photographerMedia) {
        this._photographerMedia = photographerMedia;
    };

    filterByPopularity () {
       // let mediaSortedByTitle = [];
        this._photographerMedia.sort(function (a, b) {
            return b.likes - a.likes;
        });
    };

    filterByDate () {
    // let mediaSortedByTitle = [];
        this._photographerMedia.sort(function (a, b) {
            return Date.parse(b.date) - Date.parse(a.date);
        });
    };

    filterByTitle () {
        // let mediaSortedByTitle = [];
            this._photographerMedia.sort(function (a, b) {
                return a.title.localeCompare(b.title);
            });
           // return this._photographerMedia.reverse();
        };

};