/** @jsx React.DOM */

var React = require('react');
var _ = require('underscore');

var Button = require('../shared/button');
var Dispatcher = require('../dispatcher/dispatcher');

var Folder = React.createClass({
  render: function() {
    var classes = 'folder';
    if (this.props.active) {
      classes += ' active';
    }

    return (
      <div className={classes} onClick={this._onClick}>
        {this.props.folder.name}
      </div>
    );
  },

  _onClick: function() {
    Dispatcher.send('folders:select', [this.props.id]);
  }
});

var FolderList = React.createClass({
  render: function() {
    var folders = _.map(this.props.folders, function(folder, id) {
      var isActive = id === this.props.activeFolder;
      return <Folder folder={folder} id={id} key={id} active={isActive} />
    }, this)

    return (
      <div className="folders">
        <Button action="folders:create">New Folder</Button>
        {folders}
      </div>
    );
  }
});

module.exports = FolderList;
