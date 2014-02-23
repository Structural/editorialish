var ManuscriptListView = require('./manuscript_list_view'),
    Manuscript = require('../manuscript/manuscript_model');

module.exports = function(region, collection) {
  return function(ManuscriptListModule, Editorialish, Backbone, Marionette, $, _) {
    ManuscriptListModule.addInitializer(function() {
      ManuscriptListModule.view = new ManuscriptListView({
        collection: collection
      });

      ManuscriptListModule.listenTo(ManuscriptListModule.view, 'editman', function(manuscript) {
        ManuscriptListModule.trigger('editman', manuscript);
      });
      ManuscriptListModule.listenTo(ManuscriptListModule.view, 'newman', function() {
        var manuscript = new Manuscript({});
        collection.add(manuscript);
        manuscript.save({}, {
          success: ManuscriptListModule.onNewManuscriptSave
        });
      })

      region.show(ManuscriptListModule.view);
    });

    ManuscriptListModule.onNewManuscriptSave = function(manuscript) {
      ManuscriptListModule.trigger('editman', manuscript);
    };

    ManuscriptListModule.addFinalizer(function() {
      ManuscriptListModule.stopListening(ManuscriptListModule.view);
      ManuscriptListModule.view.close();
    });
  };
};
