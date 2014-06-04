/** @jsx React.DOM */

var React = require('react');

var Icon = require('../shared/icon');
var Button = require('../shared/button');

var Login = React.createClass({
  render: function() {
    return (
      <div className="login">
        <h1>
          <span className="formatting"># </span>
          Editorially is dead, long live Editorially
        </h1>
        <div className="login-form">
          <Icon name="github" />
          <Button content="Login with Github" action="user:login" />
        </div>
      </div>
    );
  }
});

module.exports = Login;
