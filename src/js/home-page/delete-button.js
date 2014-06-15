/** @jsx React.DOM */

var React = require('react');

var Button = require('../shared/button');

var DeleteButton = React.createClass({
  render: function() {
    return (
      <Button className="delete-button" action="manuscript:delete"
              args={[this.props.id]}>
        Delete
      </Button>
    );
  }
});

module.exports = DeleteButton;
