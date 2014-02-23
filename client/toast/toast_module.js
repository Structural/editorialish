var ToastView = require('./toast_view');

module.exports = function(region) {
  return function(ToastModule, Editorialish, Backbone, Marionette, $, _) {
    var view = new ToastView();

    ToastModule.addInitializer(function() {
      region.show(view);
    });

    ToastModule.success = function(message) {
      message = message || 'success';
      view.popToast('success', message);
    };
    ToastModule.error = function(message) {
      message = message || 'error';
      view.popToast('error', message);
    }
  };
};
