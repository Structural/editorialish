/** @jsx React.DOM */

var React = require('react'),
    _ = require('underscore'),
    Button = require('./button'),
    Icon = require('./icon');

var Manuscript = React.createClass({
  render: function() {
    var openIcon = <Icon name="popup" />
    return (
      <div className="manuscript">
        <span>{this.props.manuscript.title}</span>
        <Button content={openIcon} />
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
