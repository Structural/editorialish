var Marionette = require('backbone.marionette'),
    Manuscripts = require('./manuscripts/manuscripts_collection'),
    LayoutView = require('./layout/layout_view'),
    HeaderModule = require('./header/header_module'),
    ManuscriptListModule = require('./manuscript_list/manuscript_list_module');

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

  Editorialish.module('Header', HeaderModule(Editorialish.layout.header));
  Editorialish.module('ManuscriptList', ManuscriptListModule(
    Editorialish.layout.main,
    Editorialish.manuscripts
  ));
});

Editorialish.addInitializer(function() {
  Editorialish.listenTo(Editorialish.Header, 'showlist', function() {
    Editorialish.ManuscriptList.start();
  });

  Editorialish.listenTo(Editorialish.ManuscriptList, 'editman', function(manuscript) {
    Editorialish.ManuscriptList.stop();
  });
});

$(function() {
  Editorialish.start();
});
