var Marionette = require('backbone.marionette'),
    Keys = require('../utilities/keys');

module.exports = Marionette.ItemView.extend({
  template: '#editor-template',
  className: 'editor',
  ui: {
    title: '.editor-title',
    text: '.editor-text'
  },
  events: {
    'keydown': 'saveOnCtrlS',
  },

  saveOnCtrlS: function(e) {
    if (e.which === Keys.S && e.ctrlKey) {
      e.preventDefault();
      this.trigger('save');
    }
  },

  title: function() {
    return this.ui.title.html().trim();
  },
  text: function() {
    return this.ui.text.html().trim();
  }
});
