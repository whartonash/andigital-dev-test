define(['backbone', 'config', 'models/venue', 'helpers/query_helper'], function (Backbone, config, Venue, QueryHelper) {

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
            return config.foursquare.api + "/venues/explore?" + QueryHelper.objToQuerySting(this.options);
        },

        parse: function (resp) {
            if (resp.meta.code == 200) {
                // Load geocode and suggested bounds info into collection
                this.suggestedBounds = resp.response.suggestedBounds;
                this.geocode = resp.response.geocode; 

                // Create models for venues
                return resp.response.groups[0].items;
            }
            return false;
        }

    });

    return Venues;

});