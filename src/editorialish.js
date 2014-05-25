/** @jsx React.DOM */

var React = require('react'),
    ManuscriptStore = require('./manuscript_store'),
    App = require('./app.js');

var Editorialish = function() {
  this.manuscripts = new ManuscriptStore();

  this.start = function() {
    React.renderComponent(<App store={this.manuscripts} />, document.body);
  }
}

var editorialish = new Editorialish();

document.addEventListener('DOMContentLoaded',
                          editorialish.start.bind(editorialish));
