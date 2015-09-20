define(['backbone', 'text!templates/main.html', 'text!templates/error.html'], function (Backbone, MainTemplate, ErrorTemplate) {
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

            return this;
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