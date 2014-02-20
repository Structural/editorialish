var $ = require('jquery'),
    Marionette = require('backbone.marionette'),
    Manuscripts = require('./manuscripts/manuscripts_model'),
    ManuscriptsView = require('./manuscripts/manuscripts_view');

var Editorialish = new Marionette.Application();

Editorialish.addRegions({
  root: '#editorialish'
});

Editorialish.addInitializer(function() {
  Editorialish.manuscripts = new Manuscripts();
  Editorialish.manuscripts.fetch();

  Editorialish.root.show(new ManuscriptsView({
    collection: Editorialish.manuscripts
  }));
});

$(function() {
  Editorialish.start();
});
