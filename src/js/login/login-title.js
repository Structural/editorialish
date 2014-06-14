/** @jsx React.DOM */

var React = require('react');

var LoginTitle = React.createClass({
  render: function() {
    return (
      <h1>
        <span className="formatting"># </span>
        Editorially is dead, long live Editorially
      </h1>
    );
  }
});

module.exports = LoginTitle;
