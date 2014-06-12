/** @jsx React.DOM */

var React = require('react'),
    Dispatcher = require('../dispatcher/dispatcher');

var Button = React.createClass({
  render: function() {
    return (
      <button onClick={this._activate} className={this.props.className}>
        {this.props.children}
      </button>
    );
  },

  _activate: function(event) {
    if (this.props.onClick) {
      this.props.onClick(event);
    }

    if (this.props.action) {
      Dispatcher.send(this.props.action, this.props.args);
    }
  }
});

module.exports = Button;
