/** @jsx React.DOM */

var React = require('react'),
    App = require('./app');

window.React = React;

var Editorialish = function() {
  this.start = function() {
    React.renderComponent(<App />, document.body);
  }
}

var editorialish = new Editorialish();

document.addEventListener('DOMContentLoaded',
                          editorialish.start.bind(editorialish));