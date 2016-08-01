/*jshint browserify: true */
"use strict";

// Import dependencies
var bony = require("bony");
var Component = bony.Component;

module.exports = Component.extend({
    tagName: "div",
    className: "col-sm-3 col-md-2 sidebar",
    template: require("./menu.hbs"),

    initialize: function(options){
        Component.prototype.initialize.call(this, options);
        if(!this.collection) throw new Error("ListView must have option collection.");

        // this.
        this.listenTo(this.collection, "add", this.dirty);
        this.listenTo(this.collection, "remove", this.dirty);
        this.listenTo(this.collection, "change", this.dirty);
        this.listenTo(this.collection, "reset", this.dirty);
    }

});
