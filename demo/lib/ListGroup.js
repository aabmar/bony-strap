/*jshint browserify: true */
"use strict";


var bony = require("bony");
var Component = bony.Component;


// var ListGroupItem = bony.ItemView.extend({
//     className: "list-group-item"
// })


// var ListGroupItem = module.exports = Component.extend({
//     tagName: "li",
//     className: "list-group-item",
//     initialize: function(options){
//         Component.prototype.initialize.call(this, options);
//         if(!this.model) throw new Error("ItemView must have parameter model.");
//         if(!this.options.field) throw new Error("ItemView must have parameter field.");
//         this.listenTo(this.model, "change", this.dirty);
//     },


//     render: function(){
//         // TODO: encode
//         var html = this.model.get(this.options.field);
//         this.$el.html(html);
//         return this;
//     }

// });


module.exports = Component.extend({
    tagName: "ul",
    className: "list-group",
    events: {
        "click li": "click"
    },
    initialize: function(options){
        this.selected = false;
        options.template = require("./ListGroup.hbs");
        Component.prototype.initialize.call(this, options);
        if(!this.collection) throw new Error("ListView must have option collection.");

        this.listenTo(this.collection, "add", this.dirty);
        this.listenTo(this.collection, "remove", this.dirty);
        this.listenTo(this.collection, "change", this.dirty);
        this.listenTo(this.collection, "reset", this.dirty);

    },

    click: function(e){
        
        if(e && e.target){
            var id = e.target.dataset.id
            this.selected = id;

            this.dirty();
            this.trigger("select", id, this.collection.get(id));
        }

        
    },

    render: function(){

        this.data.list = this.collection.toJSON();
        for(var i = 0; i < this.data.list.length; i++){
            if(this.selected == this.data.list[i].id) this.data.list[i].selected = true;
            else this.data.list[i].selected = false;
        }

        var html = this.template(this.data);
        this.$el.html(html);

        return this;
    }

});
