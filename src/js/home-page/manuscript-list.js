/** @jsx React.DOM */

var React = require('react'),
    _ = require('underscore'),
    Button = require('../shared/button'),
    Icon = require('../shared/icon');

var Manuscript = React.createClass({
  render: function() {
    var openIcon = <Icon name="popup" />
    var deleteIcon = <Icon name="cancel" />
    return (
      <div className="manuscript">
        <span>{this.props.manuscript.title}</span>
        <Button content={deleteIcon} className="delete-button"
                action="manuscript:delete" args={[this.props.id]} />
        <Button content={openIcon} className="open-button"
                action="manuscript:edit" args={[this.props.id]} />
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
