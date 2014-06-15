/** @jsx React.DOM */

var React = require('react');

var MenuStore = require('../store/menu-store'),
    Dispatcher = require('../dispatcher/dispatcher');

var MenuLayer = React.createClass({
  getInitialState: function() {
    return {
      items: MenuStore.items,
      anchor: MenuStore.anchor
    };
  },
  componentDidMount: function() {
    MenuStore.listen(this._onMenuChange);
  },
  componentWillUnmount: function() {
    MenuStore.ignore(this._onMenuChange);
  },

  render: function() {
    var layerClasses = ['menu-layer'];
    if (this.state.items) {
      layerClasses.push('is-showing-menu');
    }

    var menuItems = undefined;
    if (this.state.items) {
      var anchorRect = this.state.anchor.getBoundingClientRect();
      var style = {
        left: anchorRect.left,
        top: anchorRect.top
      }
      menuItems = (
        <div className="menu-container" style={style}>
          {this.state.items}
        </div>
      );
    }

    return (
      <div className={layerClasses.join(' ')} onClick={this._close}>
        {menuItems}
      </div>
    );
  },

  _onMenuChange: function() {
    this.setState({
      items: MenuStore.items,
      anchor: MenuStore.anchor
    })
  },
  _close: function() {
    Dispatcher.send('menu:close');
  }
});

module.exports = MenuLayer;
