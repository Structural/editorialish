/** @jsx React.DOM */

var React = require('react');
var Button = require('./button');

var LogoutButton = React.createClass({
  render: function() {
    return (
      <Button action="user:logout">
        Log Out
      </Button>
    );
  }
});

module.exports = LogoutButton;
