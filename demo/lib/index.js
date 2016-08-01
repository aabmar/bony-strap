/*jshint browserify: true */
"use strict";

// Import dependencies
var $ = require("jquery");
var Backbone = require("backbone");
var App = require("./App.js");
var ListGroup = require("./ListGroup")
var Collection = Backbone.Collection;


// Wait for page ready
$(function(){
    var body = $("body").html("");

    var collection = new Collection(INITIAL_DATA);
    var menuCollection = new Collection(MENU);

    var app = new App({
        el: body,
        menuCollection: menuCollection,
        name: "NILS"
    });

    // HACK: just to ease debugging
    window.app = app;

    app.replacePage(new ListGroup({
        collection: collection,
    }));


});


var MENU = [
    {id: "component", name: "Components", sub: [{id: "supplier", name: "Suppliers"}]},
    {id: "product", name: "Products"}
];

var INITIAL_DATA = [{
    id: 1,
    name: "Marius",
    age: 39
}, {
    id: 2,
    name: "Matias",
    age: 24
}, {
    id: 3,
    name: "Thomas",
    age: 25
}, {
    id: 4,
    name: "Jesper",
    age: 31
}, {
    id: 5,
    name: "Halfdan",
    age: 26
}];