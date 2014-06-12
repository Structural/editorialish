/** @jsx React.DOM */

var React = require('react'),
    _ = require('underscore');

var Menu = require('./menu'),
    DeleteButton = require('./delete-button');

var Manuscript = React.createClass({
  render: function() {
    return (
      <div className="manuscript">
        <span>{this.props.manuscript.title}</span>
        <Menu>
          <DeleteButton id={this.props.id} />
        </Menu>
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
