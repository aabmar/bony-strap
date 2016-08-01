/*jshint browserify: true */
"use strict";

// Import dependencies
var $ = require("jquery");
var bony = require("bony");
var Component = bony.Component;
var Menu = require("./Menu");

module.exports = Component.extend({

    initialize: function(options) {
        Component.prototype.initialize.call(this, options);

        if(!this.options.menuCollection) throw Error("App need parameter menuCollection");
        this.parseTemplates();

        // TOP HEADER
        var header = new Component({
            tagName: "header",
            template: require("./header.hbs")
        });
        this.addComponent(header);

        // DOUBLE WRAPPER
        var c = new Component({
            tagName: "div",
            className: "container-fluid"
        });
        this.container = new Component({
            tagName: "div",
            className: "row"
        });
        c.addComponent(this.container)
        this.addComponent(c);

        // MENU
        var menu = new Menu({
            collection: this.options.menuCollection
        });

        this.container.addComponent(menu);

        // PAGE -- here is normal content placed
        this.page = new Component({
            tagName: "div",
            className: "col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main"
        });
        this.container.addComponent(this.page);

        this.dirty();

    },

    addToPage: function(component){
        this.page.addComponent(component);
    },

    replacePage: function(component){
        this.page.replaceComponent(component);
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

