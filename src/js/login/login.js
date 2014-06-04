/** @jsx React.DOM */

var React = require('react');

var Icon = require('../shared/icon');
var Button = require('../shared/button');
var LoginTitle = require('./login-title');
var LoginError = require('./login-error');
var UserStore = require('../store/user-store');

var Login = React.createClass({
  getInitialState: function() {
    return {
      error: UserStore.error
    };
  },
  componentDidMount: function() {
    UserStore.listen(this._onUserChange);
  },
  componentWillUnmount: function() {
    UserStore.ignore(this._onUserChange);
  },

  render: function() {
    var error = undefined;
    if (this.state.error) {
      error = <LoginError message={this.state.error.message} />;
    }

    return (
      <div className="login">
        <LoginTitle />
        <div className="login-form">
          {error}
          <Icon name="github" />
          <Button content="Login with Github" action="user:login" />
        </div>
      </div>
    );
  },

  _onUserChange: function() {
    this.setState({
      error: UserStore.error
    })
  }
});

module.exports = Login;
