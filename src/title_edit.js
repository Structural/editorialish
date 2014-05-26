/** @jsx React.DOM */

var React = require('react');

var TitleEdit = React.createClass({
  render: function() {
    return (
      <input type="text" value={this.props.title} />
    );
  }
});

module.exports = TitleEdit;
