var Marionette = require('backbone.marionette'),
    Keys = require('../utilities/keys');

module.exports = Marionette.ItemView.extend({
  template: '#editor-template',
  className: 'editor',
  ui: {
    title: '.editor-title',
    text: '.editor-text',
    savedToast: '.editor-saved-toast',
    errorToast: '.editor-error-toast'
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

  toastDuration: 4000,
  showSavedToast: function() {
    this._showToast(this.ui.savedToast);
  },
  showErrorToast: function() {
    this._showToast(this.ui.errorToast);
  },
  _showToast: function(toast) {
    toast.addClass('pop');
    setTimeout(function() {
      toast.removeClass('pop');
    }, this.toastDuration);
  },

  title: function() {
    return this.ui.title.html().trim();
  },
  text: function() {
    return this.ui.text.html().trim();
  }
});
