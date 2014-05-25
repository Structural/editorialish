var EditorView = require('./editor_view');

module.exports = function(region, toaster) {
  return function(EditorModule, Editorialish, Backbone, Marionette, $, _) {
    EditorModule.startWithParent = false;

    EditorModule.on('before:start', function(options) {
      EditorModule.manuscript = options.manuscript;
    });

    EditorModule.addInitializer(function() {
      EditorModule.view = new EditorView({
        model: EditorModule.manuscript
      });
      EditorModule.listenTo(EditorModule.view, 'save', EditorModule.save);

      region.show(EditorModule.view);
    });

    EditorModule.save = function() {
      EditorModule.manuscript.set('title', EditorModule.view.title());
      EditorModule.manuscript.set('text', EditorModule.view.text());
      EditorModule.manuscript.save({}, {
        success: EditorModule.onSaveSuccess,
        error: EditorModule.onSaveError
      });
    };

    EditorModule.onSaveSuccess = function() {
      toaster.success('saved');
    };

    EditorModule.onSaveError = function() {
      toaster.error();
    } ;

    EditorModule.addFinalizer(function() {
      EditorModule.save();

      EditorModule.stopListening(EditorModule.view);
      EditorModule.view.close();
      EditorModule.manuscript = undefined;
    });
  };
};
