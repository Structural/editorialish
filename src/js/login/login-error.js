/** @jsx React.DOM */

var React = require('react');

var LoginError = React.createClass({
  render: function() {
    return (
      <div className="error">{this.props.message}</div>
    );
  }
});

module.exports = LoginError;
