var $ = require('jquery'),
    Marionette = require('backbone.marionette'),
    LayoutView = require('./layout/layout_view'),
    HeaderModule = require('./header/header_module');

var Editorialish = new Marionette.Application();

Editorialish.addRegions({
  root: '#editorialish'
});

Editorialish.addInitializer(function() {
  Editorialish.layout = new LayoutView();
  Editorialish.root.show(Editorialish.layout);

  Editorialish.module('Header', HeaderModule(Editorialish.layout.header));
});

$(function() {
  Editorialish.start();
});
