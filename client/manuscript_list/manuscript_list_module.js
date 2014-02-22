var ManuscriptsView = require('../manuscripts/manuscripts_view');

module.exports = function(region, collection) {
  return function(ManuscriptListModule, Editorialish, Backbone, Marionette, $, _) {
    var view = new ManuscriptsView({
      collection: collection
    });

    ManuscriptListModule.addInitializer(function() {
      region.show(view);
    });
  };
};
