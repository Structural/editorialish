/** @jsx React.DOM */

var React = require('react');
var _ = require('underscore');

var Button = require('../shared/button');
var Icon = require('../shared/icon');
var Dispatcher = require('../dispatcher/dispatcher');
var NewFolder = require('./new-folder');

var Folder = React.createClass({
  render: function() {
    var classes = 'folder';
    if (this.props.active) {
      classes += ' active';
    }

    return (
      <div className={classes} onClick={this._onClick}>
        {this.props.folder.name}
        <Button action="folders:delete" args={[this.props.id]}>
          <Icon name="times" />
        </Button>
      </div>
    );
  },

  _onClick: function(event) {
    // This is true iff we clicked on the folder div, not any inputs inside it.
    if (event.target === event.currentTarget) {
      Dispatcher.send('folders:select', [this.props.id]);
    }
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
        <NewFolder />
        {folders}
      </div>
    );
  }
});

module.exports = FolderList;
