var EditorView = require('./editor_view');

module.exports = function(region) {
  return function(EditorModule, Editorialish, Backbone, Marionette, $, _) {
    EditorModule.startWithParent = false;

    EditorModule.on('before:start', function(options) {
      EditorModule.manuscript = options.manuscript;
    });

    EditorModule.addInitializer(function() {
      EditorModule.view = new EditorView({
        model: EditorModule.manuscript
      });
      region.show(EditorModule.view);
    });

    EditorModule.addFinalizer(function() {
      EditorModule.view.close();
      EditorModule.manuscript = undefined;
    });
  };
};
