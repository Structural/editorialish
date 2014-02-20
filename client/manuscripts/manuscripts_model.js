var Backbone = require('backbone'),
    Manuscript = require('../manuscript/manuscript_model');

var Manuscripts = Backbone.Collection.extend({
  model: Manuscript,
  url: '/api/manuscripts'
});

module.exports = Manuscripts;
