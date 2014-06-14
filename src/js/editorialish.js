/** @jsx React.DOM */

var React = require('react'),
    App = require('./app'),
    Dispatcher = require('./dispatcher/dispatcher');

window.React = React;

var Editorialish = function() {
  this.start = function() {
    Dispatcher.send('app:start');
    React.renderComponent(<App />, document.body);
  }
}

var editorialish = new Editorialish();

document.addEventListener('DOMContentLoaded',
                          editorialish.start.bind(editorialish));
