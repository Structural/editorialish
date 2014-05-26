/** @jsx React.DOM */

var React = require('react');

var TextEdit = React.createClass({
  render: function() {
    return (
      <textarea>{this.props.text}</textarea>
    );
  }
});

module.exports = TextEdit;
