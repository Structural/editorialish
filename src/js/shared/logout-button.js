/** @jsx React.DOM */

var React = require('react');
var Button = require('./button');
var Icon = require('./icon');

var LogoutButton = React.createClass({
  render: function() {
    var logoutIcon = <Icon name="right" />
    return (
      <Button action="user:logout" content='Log Out' />
    );
  }
});

module.exports = LogoutButton;
