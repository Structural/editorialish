/** @jsx React.DOM */

var React = require('react'),
    Button = require('./button');

var ManuscriptEditView = React.createClass({
  render: function() {
    return (
      <div>
        <Button content="home" action="manuscript:list" />
        {this.props.manuscriptId}
      </div>
    );
  }
});

module.exports = ManuscriptEditView;
