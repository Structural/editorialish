var $ = require('jquery'),
    Marionette = require('backbone.marionette'),
    Manuscripts = require('./collections/manuscripts'),
    ManuscriptsView = require('./views/manuscripts');

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
