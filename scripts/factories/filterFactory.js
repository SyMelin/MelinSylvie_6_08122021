class FilterFactory {

    /**
     * @param {Object} media photographerMedia
     */

    constructor (value, media) {
        this._filter = new Filter(media);
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

    /**
     * @param {Object} media photographerMedia
     */

    constructor(media) {
        this._media = media;
    };

    filterByPopularity () {
        this._media.sort(function (a, b) {
            return b.likes - a.likes;
        });
    };

    filterByDate () {

        this._media.sort(function (a, b) {
            return Date.parse(b.date) - Date.parse(a.date);
        });
    };

    filterByTitle () {
            this._media.sort(function (a, b) {
               if (a.video) {
                    a.title = a.video;
                };
                return a.title.localeCompare(b.title) ;
            });
        };
};