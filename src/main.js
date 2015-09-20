require.config({
    baseUrl: '/src/',
    map: {
        '*': {
            'text': '../../bower_components/text/text'
        }
    },
    paths: {
        jquery: '../bower_components/jquery/dist/jquery.min',
        backbone: '../bower_components/backbone/backbone-min',
        underscore: '../bower_components/underscore/underscore-min',
        app: 'app'
    },
    shim: {
        jquery: {
            exports: '$'
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        underscore: {
            exports: '_'
        },
    }
});

define(['app', 'backbone'], function (app, Backbone) {
    'use strict';
    app.start();
});