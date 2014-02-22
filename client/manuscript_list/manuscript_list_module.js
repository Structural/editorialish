var ManuscriptListView = require('./manuscript_list_view');

module.exports = function(region, collection) {
  return function(ManuscriptListModule, Editorialish, Backbone, Marionette, $, _) {
    var view = new ManuscriptListView({
      collection: collection
    });

    ManuscriptListModule.addInitializer(function() {
      region.show(view);
    });

    ManuscriptListModule.listenTo(view, 'editman', function(manuscript) {
      this.trigger('editman', manuscript);
    });

    ManuscriptListModule.addFinalizer(function() {
      view.close();
    });
  };
};
