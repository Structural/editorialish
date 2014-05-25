/** @jsx React.DOM */

var React = require('react'),
    _ = require('underscore');

var Manuscript = React.createClass({
  render: function() {
    return (
      <div className="manuscript">
        <span>{this.props.manuscript.title}</span>
      </div>
    );
  }
});

var ManuscriptList = React.createClass({
  render: function() {
    var manuscripts = _.map(this.props.manuscripts, function(manuscript) {
      return <Manuscript manuscript={manuscript} />;
    });

    return (
      <div className="manuscripts">
        {manuscripts}
      </div>
    );
  }
});

module.exports = ManuscriptList;
