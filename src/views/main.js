define(['backbone', 'text!templates/main.html'], function (Backbone, MainTemplate) {
    'use strict';
    return Backbone.View.extend({
        tagName: 'div',
        el: '#content',
        template: _.template(MainTemplate),
        events: {
            'click #search': 'search'
        },
        initialize: function () {
            this.render();
        },
        render: function () {
            return this.$el.html(this.template());
        },
        search: function (e) {
            e.preventDefault();
            var placeName = this.$el.find('#place').val(),
                venues = this.collection;

            // Use venues collection to search around place
            venues.fetch({
                data: {near: placeName},
                error: function(collection, response, options) {
                    console.log(response);
                }
            });
        }
    });
});