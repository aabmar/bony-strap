/*jshint browserify: true */
"use strict";

// Import dependencies
var $ = require("jquery");
var Backbone = require("backbone");
var bony = require("bony");

var Collection = Backbone.Collection;
var Component = bony.Component;
var ListGroup = require("./ListGroup")


module.exports = Component.extend({

    initialize: function(options) {
        Component.prototype.initialize.call(this, options);

        this.parseTemplates();

        this.collection = new Collection(INITIAL_DATA);

        var page = new Component({
            tagName: "article",
            className: "page bony_page"
        });

        var header = new Component({
            tagName: "header",
            template: require("./header.hbs")
        });

        page.addComponent(header);

        page.addComponent(new ListGroup({
            collection: this.collection,
        }));

        this.addComponent(page);

        this.dirty();

    },

    // Read templates from HTML code and compile them to JavaScript.

    parseTemplates: function() {
        this.templates = this.templates || {};

        var els = $('script[type="text/template"]');
        for (var i = 0; i < els.length; i++) {
            var template = els[i];
            var id = template.id;
            var source = template.innerHTML;
            var compiled = Handlebars.compile(source);
            this.templates[id] = compiled;
            template.remove();
        }
    }

});


var INITIAL_DATA = [{
    name: "Marius",
    age: 39
}, {
    name: "Matias",
    age: 24
}, {
    name: "Thomas",
    age: 25
}, {
    name: "Jesper",
    age: 31
}, {
    name: "Halfdan",
    age: 26
}];