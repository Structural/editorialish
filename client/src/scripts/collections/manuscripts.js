var Backbone = require('backbone'),
    Manuscript = require('../models/manuscript');

var Manuscripts = Backbone.Collection.extend({
  model: Manuscript,
  url: '/api/manuscripts'
});

module.exports = Manuscripts;
