/** @jsx React.DOM */

var React = require('react');

var Icon = require('../shared/icon');
var Button = require('../shared/button');

var Login = React.createClass({
  render: function() {
    return (
      <div className="login">
        <Icon name="github" />
        <Button content="Login with Github" action="user:login" />
      </div>
    );
  }
});

module.exports = Login;
