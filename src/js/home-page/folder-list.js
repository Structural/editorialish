/** @jsx React.DOM */

var React = require('react'),
    _ = require('underscore');

var Folder = React.createClass({
  render: function() {
    return (
      <div className="folder">
        {this.props.folder.name}
      </div>
    );
  }
});

var FolderList = React.createClass({
  render: function() {
    var folders = _.map(this.props.folders, function(folder, id) {
      return <Folder folder={folder} id={id} key={id} />
    })

    return (
      <div className="folders">
        {folders}
      </div>
    );
  }
});

module.exports = FolderList;
