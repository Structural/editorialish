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
        <Button content={openIcon}
                action="manuscript:edit" args={[this.props.id]} />
      </div>
    );
  }
});

var ManuscriptList = React.createClass({
  render: function() {
    var manuscripts = _.map(this.props.manuscripts, function(manuscript, id) {
      return <Manuscript manuscript={manuscript} id={id} />;
    });

    return (
      <div className="manuscripts">
        {manuscripts}
      </div>
    );
  }
});

module.exports = ManuscriptList;
