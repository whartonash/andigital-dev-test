define(['views/main', 'collections/venues'], function (MainView, Venues) {
    'use strict';

    var app = {};

    app.start = function () {
        var venuesCollection = new Venues();

        new MainView({
            collection: venuesCollection
        });
    };

    return app;
});