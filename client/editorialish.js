var Marionette = require('backbone.marionette'),
    Manuscripts = require('./manuscripts/manuscripts_collection'),
    LayoutView = require('./layout/layout_view'),
    HeaderModule = require('./header/header_module'),
    ManuscriptListModule = require('./manuscript_list/manuscript_list_module'),
    EditorModule = require('./editor/editor_module'),
    ToastModule = require('./toast/toast_module'),
    Router = require('./router');

var Editorialish = new Marionette.Application();

Editorialish.addRegions({
  root: '#editorialish'
});

Editorialish.addInitializer(function() {
  Editorialish.manuscripts = new Manuscripts();
  Editorialish.manuscripts.fetch();
});

Editorialish.addInitializer(function() {
  Editorialish.layout = new LayoutView();
  Editorialish.root.show(Editorialish.layout);
  Editorialish.module('Toaster', ToastModule(Editorialish.layout.toaster));

  Editorialish.module('Header', HeaderModule(Editorialish.layout.header));
  Editorialish.module('ManuscriptList', ManuscriptListModule(
    Editorialish.layout.main,
    Editorialish.manuscripts
  ));
  Editorialish.module('Editor', EditorModule(
    Editorialish.layout.main,
    Editorialish.Toaster
  ));
});

Editorialish.showList = function() {
  Editorialish.Editor.stop();
  Editorialish.ManuscriptList.start();
  Editorialish.Router.navigate(Editorialish.Router.rootRoute());
};

Editorialish.showManuscript = function(manuscript) {
  if (!(manuscript instanceof Backbone.Model)) {
    if (!Editorialish.manuscripts.state.fetched) {
      Editorialish.listenToOnce(
        Editorialish.manuscripts, 'sync', function() {
          Editorialish.showManuscript(manuscript);
        });
      return;
    }

    manuscript = Editorialish.manuscripts.get(manuscript);
  }

  Editorialish.ManuscriptList.stop();
  Editorialish.Editor.start({
    manuscript: manuscript
  });
  Editorialish.Router.navigate(Editorialish.Router.manuscriptRoute(manuscript.id));
};

Editorialish.addInitializer(function() {
  Editorialish.listenTo(Editorialish.Header, 'showlist', Editorialish.showList);

  Editorialish.listenTo(
    Editorialish.ManuscriptList, 'editman', Editorialish.showManuscript);
});

Editorialish.addInitializer(function() {
  Editorialish.Router = new Router({
    controller: Editorialish
  });
  Backbone.history.start({pushState: true});
});

$(function() {
  Editorialish.start();
});
