var Marionette = require('backbone.marionette'),
    HeaderView = require('./header_view');

module.exports = function(region) {
  return function(HeaderModule, Editorialish, Backbone, Marionette, $, _) {
    var view = new HeaderView();

    HeaderModule.addInitializer(function() {
      region.show(view);
    });
  };
};
