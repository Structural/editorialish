/** @jsx React.DOM */

var React = require('react'),
    _ = require('underscore');

var Menu = require('../shared/menu'),
    DeleteButton = require('./delete-button'),
    Dispatcher = require('../dispatcher/dispatcher');

var Manuscript = React.createClass({
  render: function() {
    return (
      <div className="manuscript">
        <Menu iconName="angle-double-down" menuName={this.props.manuscript.title}>
          <DeleteButton id={this.props.id} />
        </Menu>
        <span className="manuscript-title" onClick={this._open}>
          {this.props.manuscript.title}
        </span>
      </div>
    );
  },

  _open: function() {
    Dispatcher.send('manuscript:edit', [this.props.id]);
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
