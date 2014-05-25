/** @jsx React.DOM */

var React = require('react'),
    Dispatcher = require('./dispatcher');

var Button = React.createClass({
  render: function() {
    var activate = function() {
      Dispatcher.send(this.props.action);
    };

    return (
      <button onClick={activate.bind(this)}>{this.props.text}</button>
    );
  }
});

module.exports = Button;
