/** @jsx React.DOM */

var React = require('react'),
    _ = require('underscore'),
    Button = require('../shared/button'),
    Icon = require('../shared/icon');

var Manuscript = React.createClass({
  render: function() {
    return (
      <div className="manuscript">
        <span>{this.props.manuscript.title}</span>
        <Button className="delete-button" action="manuscript:delete"
                args={[this.props.id]}>
          <Icon name="cancel" />
        </Button>
        <Button className="open-button" action="manuscript:edit"
                args={[this.props.id]}>
          <Icon name="popup" />
        </Button>
      </div>
    );
  }
});

var ManuscriptList = React.createClass({
  render: function() {
    var manuscripts = _.map(this.props.manuscripts, function(manuscript, id) {
      return <Manuscript manuscript={manuscript} id={id} key={id} />;
    });

    return (
      <div className="manuscripts">
        {manuscripts}
      </div>
    );
  }
});

module.exports = ManuscriptList;
