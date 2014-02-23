var Backbone = require('backbone');

var Manuscript = Backbone.Model.extend({
  idAttribute: '_id',
  initialize: function(attributes, options) {
    this.set('title', this.get('title') || '');
    this.set('text', this.get('text') || '');
  }
});

module.exports = Manuscript;
