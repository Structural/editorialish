var Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView.extend({
  template: '#list-toolbar-template',
  className: 'list-toolbar',
  ui: {
    newManuscript: '.list-toolbar-new-manuscript'
  },
  events: {
    'click @ui.newManuscript': 'newManuscript'
  },

  newManuscript: function(e) {
    if (e) { e.preventDefault(); }

    this.trigger('manuscript:new');
  }
});
