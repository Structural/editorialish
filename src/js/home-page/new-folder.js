/** @jsx React.DOM */

var React = require('react');

var Button = require('../shared/button');
var Dispatcher = require('../dispatcher/dispatcher');

var NewFolder = React.createClass({
  getInitialState: function() {
    return {
      showInput: false,
      folderName: ''
    }
  },
  render: function() {
    if (this.state.showInput) {
      return (
        <div className="new-folder">
          <input type="text" onChange={this._changeFolderName}
                 onKeyDown={this._createOnEnter} ref="folderNameInput" />
          <Button action="folders:create" args={[this.state.folderName]}
                  onClick={this._createFolder}>
            Create
          </Button>
        </div>
      );
    } else {
      return (
        <Button onClick={this._showInput}>New Folder</Button>
      );
    }
  },

  _showInput: function() {
    this.setState({
      showInput: true
    }, function() {
      this.refs.folderNameInput.getDOMNode().focus();
    })
  },
  _changeFolderName: function(event) {
    this.setState({
      folderName: event.target.value
    })
  },
  _createFolder: function() {
    this.setState({
      showInput: false,
      folderName: ''
    })
  },
  _createOnEnter: function(event) {
    if (event.keyCode === 13) {
      Dispatcher.send('folders:create', [this.state.folderName]);
      this._createFolder();
    }
  }
});

module.exports = NewFolder;
