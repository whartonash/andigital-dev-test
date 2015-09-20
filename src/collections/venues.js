define(['backbone', 'config', 'models/venue'], function (Backbone, config, Venue) {

    'use strict';  

    /**
     * Explore Recommended and Popular Venues
     * Returns a list of recommended venues near the current location. 
     * HTTP Method GET
     * See https://api.foursquare.com/v2/venues/explore for parameter and response definitions
     */

    var Venues = Backbone.Collection.extend({

        model: Venue,

        defaults: {
            client_id: config.foursquare.client_id,
            client_secret: config.foursquare.client_secret,
            radius: 500,
            lat: 51.5072, // Default location to London
            lng: 0.1275,
            v: '20150920', // YYYYMMDD format
            locale: 'en'
        },

        initialize: function (models, options) {
            this.options = _.extend(this.defaults, options);
        },

        url: function() {
            return config.foursquare.api + "/venues/explore?" 
                + "client_id=" + this.defaults.client_id + "&"
                + "client_secret=" + this.defaults.client_secret + "&"
                + "radius=" + this.defaults.radius + "&"
                + "lat=" + this.defaults.lat + "&"
                + "lng=" + this.defaults.lng + "&"
                + "v=" + this.defaults.v + "&"
                + "locale=" + this.defaults.locale;
        },

        parse: function (resp) {
            if (resp.meta.code == 200) {
                // Load geocode info into collection
                this.geocode = resp.response.geocode; 

                // Create models for venues
                return resp.response.groups[0].items;
            }
            return false;
        }

    });

    return Venues;

});