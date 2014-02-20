var Marionette = require('backbone.marionette');

var ManuscriptView = Marionette.ItemView.extend({
  template: '#manuscript-template',
  tagName: 'li',
  className: 'man'
});

module.exports = ManuscriptView;
