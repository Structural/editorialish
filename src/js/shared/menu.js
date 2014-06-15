/** @jsx React.DOM */

var React = require('react');

var Button = require('../shared/button'),
    Icon = require('../shared/icon'),
    Dispatcher = require('../dispatcher/dispatcher');

var Menu = React.createClass({
  render: function() {
    return (
      <Button className="menu-toggle" onClick={this._open}>
        <Icon name={this.props.iconName} />
      </Button>
    );
  },

  _open: function() {
    Dispatcher.send('menu:open', [this.props.children, this.getDOMNode()])
  }
});

module.exports = Menu;
