var ManuscriptListView = require('./manuscript_list_view');

module.exports = function(region, collection) {
  return function(ManuscriptListModule, Editorialish, Backbone, Marionette, $, _) {
    ManuscriptListModule.addInitializer(function() {
      ManuscriptListModule.view = new ManuscriptListView({
        collection: collection
      });
      ManuscriptListModule.listenTo(ManuscriptListModule.view, 'editman', function(manuscript) {
        this.trigger('editman', manuscript);
      });
      region.show(ManuscriptListModule.view);
    });

    ManuscriptListModule.addFinalizer(function() {
      ManuscriptListModule.stopListening(ManuscriptListModule.view);
      ManuscriptListModule.view.close();
    });
  };
};
