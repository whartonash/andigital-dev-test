define(['views/main'], function (MainView) {
    'use strict';

    var app = {};

    app.start = function () {
        new MainView();
    };

    return app;
});