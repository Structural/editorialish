var _ = require('underscore'),
    Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView.extend({
  template: '#toast-template',
  ui: {
    toast: '.toast'
  },

  toastDuration: 4000,
  popToast: function(type, message) {
    this.ui.toast.text(message);
    this.ui.toast.addClass('toast-' + type);
    this.ui.toast.addClass('pop');
    _.delay(function(toast) {
      toast.removeClass('pop');
      toast.removeClass('toast-' + type);
      toast.text('');
    }, this.toastDuration, this.ui.toast);
  }
});
