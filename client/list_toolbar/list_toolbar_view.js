var Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView.extend({
  template: '#list-toolbar-template',
  className: 'list-toolbar',
  ui: {
    newMan: '.list-toolbar-new-manuscript'
  },
  events: {
    'click @ui.newMan': 'newManuscript'
  },

  newManuscript: function(e) {
    if (e) { e.preventDefault(); }

    this.trigger('newman');
  }
});
