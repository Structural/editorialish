/** @jsx React.DOM */

var React = require('react');

var Icon = React.createClass({
  render: function() {
    return (
      <i className={"fa fa-" + this.props.name} />
    );
  }
});

module.exports = Icon;
