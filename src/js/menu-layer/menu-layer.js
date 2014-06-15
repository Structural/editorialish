/** @jsx React.DOM */

var React = require('react');

var MenuStore = require('../store/menu-store'),
    Dispatcher = require('../dispatcher/dispatcher');

var MenuLayer = React.createClass({
  getInitialState: function() {
    console.log(MenuStore.menuName);
    return {
      items: MenuStore.items,
      anchor: MenuStore.anchor,
      menuName: MenuStore.menuName
    };
  },
  componentDidMount: function() {
    MenuStore.listen(this._onMenuChange);
  },
  componentWillUnmount: function() {
    MenuStore.ignore(this._onMenuChange);
  },

  render: function() {
    console.log("MenuLayer.state.menuName: " + this.state.menuName);

    var menuName = this.state.menuName ? this.state.menuName : 'Menu';

    var layerClasses = ['menu-layer'];

    if (this.state.items) {
      layerClasses.push('is-showing-menu');
    }

    var menuItems = undefined;
    if (this.state.items) {
      var anchorRect = this.state.anchor.getBoundingClientRect();
      var windowRect = {
        height:window.innerHeight,
        width:window.innerWidth
      };
      var containerClasses = "menu-container";
      var style = {top:"auto",left:"auto",right:"auto", bottom:"auto"};

      if(anchorRect.left < 250){
        style.left = (anchorRect.left + anchorRect.width*0.5) + "px";
        containerClasses += " opens-right"
      } else {
        style.right = (windowRect.width - anchorRect.right + anchorRect.width*0.5) + "px";
        containerClasses += " opens-left"
      }

      if(anchorRect.top < windowRect.height*2/3){
        style.top = (anchorRect.top + anchorRect.height*1.0) + "px";
        containerClasses += " opens-down"
      } else {
        style.bottom = (windowRect.height - anchorRect.bottom + anchorRect.height*1.0) + "px";
        containerClasses += " opens-up"
      }

      var menuTitle = <div className="menu-title">{menuName}</div>;

      menuItems = (
        <div className={containerClasses} style={style}>
          {menuTitle}
          <div className='menu-items'>
            {this.state.items}
            </div>
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
      anchor: MenuStore.anchor,
      menuName: MenuStore.menuName
    })
  },
  _close: function() {
    Dispatcher.send('menu:close');
  }
});

module.exports = MenuLayer;
