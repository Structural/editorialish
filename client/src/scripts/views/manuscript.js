var Marionette = require('backbone.marionette');

var ManuscriptView = Marionette.ItemView.extend({
  template: '#manuscrip-template',
  tagName: 'ul'
});

module.exports = ManuscriptView;
