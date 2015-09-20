define(['backbone', 'text!templates/main.html', 'text!templates/error.html', 'text!templates/marker_info.html', 'gmap'], function (Backbone, MainTemplate, ErrorTemplate, MarkerInfoTemplate, Google) {
    'use strict';
    return Backbone.View.extend({
        tagName: 'div',
        el: '#content',
        template: _.template(MainTemplate),
        events: {
            'click #search-btn': 'search'
        },
        initialize: function () {
            this.collection.bind("replace reset add remove", _.debounce(this.render, 100), this);
            this.render();
        },
        render: function () {
            var _this = this;
            
            this.$el.html(this.template({
                geocode: this.collection.geocode,
                venues: this.collection.models
            }));

            // Focus on the input field after render
            this.$el.find("#place").focus();

            // Prevent form submitting and trigger this search handler
            this.$el.find("form").submit(function (e) { 
                e.preventDefault();
                _this.$el.find("#search-btn").click();
                return false; 
            });

            if (this.collection.models.length > 0) {
                _this.drawMap();
            }

            return this;
        },
        drawMap: function(){
            var geocode = this.collection.geocode,
                suggestedBounds = this.collection.suggestedBounds,
                center = new google.maps.LatLng(geocode.center.lat, geocode.center.lng),
                southWest = new google.maps.LatLng(suggestedBounds.sw.lat, suggestedBounds.sw.lng),
                northEast = new google.maps.LatLng(suggestedBounds.ne.lat, suggestedBounds.ne.lng),
                bounds = new google.maps.LatLngBounds(southWest, northEast);
            
            // Draw map centred and bound by venue response info
            this.map = new google.maps.Map(document.getElementById("map-canvas"), {center: center, scrollwheel: false});
            this.map.fitBounds(bounds);

            // Place markers for venues
            this.collection.each(this.placeMarker, this);
        },
        placeMarker: function(model){
            var _this = this,
                map = this.map,
                venue = model.get('venue'),
                markerInfoTemplate = _.template(MarkerInfoTemplate),
                infoContentString = markerInfoTemplate(venue);

            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(venue.location.lat, venue.location.lng),
                map: map,
                title: venue.name,
                animation: google.maps.Animation.DROP,
                draggable: false,
                icon: venue.categories[0].icon.prefix + "bg_44" + venue.categories[0].icon.suffix
            });

            marker.addListener('click', function() {
                var infowindow = new google.maps.InfoWindow({
                    content: infoContentString,
                    maxWidth: 250,
                });
                infowindow.open(map, marker);
            });
        },
        search: _.debounce(function (e) {
            e.preventDefault();

            var placeName = this.$el.find('#place').val(),
                venues = this.collection;

            // Use venues collection to search around place
            venues.fetch({
                data: {near: placeName},
                error: function(collection, response, options) {
                    // Render an error message
                    var errorTemplate = _.template(ErrorTemplate);
                    $('.results').html(errorTemplate({
                        error_message: 'Whoops! Looks like something went wrong. Please contact the site administrator.'
                    }));
                }
            });
        }, 1000, true)
    });
});