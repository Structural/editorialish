/** @jsx React.DOM */

var React = require('react'),
    Dispatcher = require('../dispatcher/dispatcher');

var Button = React.createClass({
  render: function() {
    var activate = function() {
      Dispatcher.send(this.props.action, this.props.args);
    };

    return (
      <button onClick={activate.bind(this)} className={this.props.className}>
        {this.props.children}
      </button>
    );
  }
});

module.exports = Button;
