var Backbone = require('backbone'),
    Manuscript = require('../manuscript/manuscript_model');

var Manuscripts = Backbone.Collection.extend({
  model: Manuscript,
  url: '/api/manuscripts',
  initialize: function(models, options) {
    this.state = {
      fetched: false
    };

    this.listenToOnce(this, 'sync', this.setFetchedTrue);
  },

  setFetchedTrue: function() {
    this.state.fetched = true;
  }
});

module.exports = Manuscripts;
