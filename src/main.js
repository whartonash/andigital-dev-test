require.config({
    baseUrl: '/',
    paths: {
        jquery: '/bower_components/jquery/dist/jquery.min.js',
        backbone: '/bower_components/backbone/backbone-min.js',
        underscore: '/bower_components/underscore/underscore-min.js',
        app: '/src/app'
    },
    shim: {
        jquery: {
            exports: '$'
        },
        backbone: {
            deps: ['underscore']
        }
    }
});

define(['app'], function (app) {
    'use strict';
    app.start();
});