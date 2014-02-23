var Marionette = require('backbone.marionette'),
    Keys = require('../utilities/keys');

module.exports = Marionette.ItemView.extend({
  template: '#editor-template',
  className: 'editor ui-scrollable',
  ui: {
    title: '.editor-title',
    text: '.editor-text',
    savedToast: '.editor-saved-toast',
    errorToast: '.editor-error-toast'
  },
  events: {
    'keydown': 'saveOnCtrlS',
  },
  initialize: function(options) {
    this.listenToOnce(this, 'dom:refresh', this.focusEmptyTitle);
  },

  focusEmptyTitle: function() {
    if (this.title() === '') {
      this.ui.title.focus();
    }
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
