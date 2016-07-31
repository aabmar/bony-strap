/*jshint browserify: true */
"use strict";


var bony = require("bony");
var Component = bony.Component;


var ListGroupItem = bony.ItemView.extend({
    className: "list-group-item"
})


var ListGroupItem = module.exports = Component.extend({
    tagName: "li",
    className: "list-group-item",
    initialize: function(options){
        Component.prototype.initialize.call(this, options);
        if(!this.model) throw new Error("ItemView must have parameter model.");
        if(!this.options.field) throw new Error("ItemView must have parameter field.");
        this.listenTo(this.model, "change", this.dirty);
    },


    render: function(){
        // TODO: encode
        var html = this.model.get(this.options.field);
        this.$el.html(html);
        return this;
    }

});


module.exports = Component.extend({
    tagName: "ul",
    className: "list-group",
    initialize: function(options){
        Component.prototype.initialize.call(this, options);
        if(!this.collection) throw new Error("ListView must have option collection.");
        
        this.listenTo(this.collection, "add", this._add);
        this.listenTo(this.collection, "remove", this._remove);
        this.listenTo(this.collection, "reset", this._reset);

        // Add initial models
        this.collection.each(this._add, this);
    },

    _add: function(model){
        var item = new ListGroupItem({
            model: model,
            field: this.options.field || "name"
        });
        this.addComponent(item);
    },

    _remove: function(i){
        this.removeComponent(i);
    },

    _reset: function(){
        this.clearComponents();
    }

});


module.exports.ListGroupItem = ListGroupItem;
