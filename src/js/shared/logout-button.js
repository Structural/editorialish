/** @jsx React.DOM */

var React = require('react');
var Button = require('./button');

var LogoutButton = React.createClass({
  render: function() {
    var button = (
        <Button action="user:logout" className="logout-button">
          Log Out
        </Button>
    );

    return this.transferPropsTo(button);
  }
});

module.exports = LogoutButton;
