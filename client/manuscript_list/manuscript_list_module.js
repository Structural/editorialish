var ManuscriptListView = require('./manuscript_list_view'),
    Manuscript = require('../manuscript/manuscript_model');

module.exports = function(region, collection, toaster) {
  return function(ManuscriptListModule, Editorialish, Backbone, Marionette, $, _) {
    ManuscriptListModule.addInitializer(function() {
      ManuscriptListModule.view = new ManuscriptListView({
        collection: collection
      });

      ManuscriptListModule.listenTo(ManuscriptListModule.view, 'manuscript:edit', function(manuscript) {
        ManuscriptListModule.trigger('manuscript:edit', manuscript);
      });
      ManuscriptListModule.listenTo(ManuscriptListModule.view, 'manuscript:new', function() {
        var manuscript = new Manuscript({});
        manuscript.save({}, {
          success: ManuscriptListModule.onNewManuscriptSave,
          error: ManuscriptListModule.onNewManuscriptError
        });
      })

      region.show(ManuscriptListModule.view);
    });

    ManuscriptListModule.onNewManuscriptSave = function(manuscript) {
      collection.add(manuscript);
      ManuscriptListModule.trigger('manuscript:edit', manuscript);
    };

    ManuscriptListModule.onNewManuscriptError = function(manuscript) {
      manuscript.destroy();
      toaster.error();
    };

    ManuscriptListModule.addFinalizer(function() {
      ManuscriptListModule.stopListening(ManuscriptListModule.view);
      ManuscriptListModule.view.close();
    });
  };
};
