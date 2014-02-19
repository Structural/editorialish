var _babysitter = require('backbone.babysitter'),
    _wreqr = require('backbone.wreqr'),
    Marionette = require('backbone.marionette'),
    Manuscripts = require('./collections/manuscripts'),
    ManuscriptsView = require('./views/manuscripts');

var Editorialish = new Marionette.Application();

Editorialish.addRegions({
  root: '#editorialish'
});

Editorialish.addInitializer(function() {
  Editorialish.manuscripts = new Manuscripts();

  Editoralish.root.show(new ManuscriptsView({
    collection: Editorialish.manuscripts
  }));
});

Editorialish.start();
