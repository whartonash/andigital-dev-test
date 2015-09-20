define(['backbone', 'text!templates/main.html'], function (Backbone, MainTemplate) {
    'use strict';
    return Backbone.View.extend({
        tagName: 'div',
        el: '#content',
        template: _.template(MainTemplate),
        initialize: function () {
            this.render();
        },
        render: function () {
            return this.$el.html(this.template());
        }
    });
});