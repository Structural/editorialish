/** @jsx React.DOM */

var React = require('react');

var Credits = require('../shared/credits'),
    LogoutButton = require('../shared/logout-button');

var NavColumn = React.createClass({
  render: function() {
    return (
      <div className="nav-column">
        <div className="nav-title-bar">
          <div className="ed-icon"></div>
          Editorialish
        </div>
        <div className="nav-contents">
          {this.props.children}
          <Credits />
        </div>
        <div className="bottom-toolbar">
          <LogoutButton align="right" />
          <div className="two-line-info middle">
            <div className="title">{this.props.user.displayName}</div>
            <div className="sub-title">{this.props.user.username}</div>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = NavColumn;
