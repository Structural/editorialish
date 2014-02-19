var Backbone = require('backbone'),
    $ = require('jquery');
Backbone.$ = $;

var Mod = require('./mod');
console.log(new Mod().get('title'));
