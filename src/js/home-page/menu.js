/** @jsx React.DOM */

var React = require('react');

var Button = require('../shared/button'),
    Icon = require('../shared/icon');

var Menu = React.createClass({
  getInitialState: function() {
    return {
      open: false
    };
  },

  render: function() {
    var menuItems = undefined,
        mask = undefined;
    if (this.state.open) {
      menuItems = (
        <div className="menu-items">
          {this.props.children}
        </div>
      );

      mask = <div className="close-anywhere-mask" onClick={this._close} />
    }

    return (
      <div className="menu">
        {mask}
        <Button className="menu-toggle" onClick={this._toggle}>
          <Icon name="cog" />
        </Button>
        {menuItems}
      </div>
    );
  },

  _toggle: function() {
    this.setState({
      open: !this.state.open
    });
  },
  _close: function() {
    this.setState({
      open: false
    });
  }
});

module.exports = Menu;
