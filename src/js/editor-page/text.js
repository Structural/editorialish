/** @jsx React.DOM */

var React = require('react'),
    CodeMirror = require('code-mirror/mode/markdown'),
    Dispatcher = require('../dispatcher/dispatcher');

var TextEdit = React.createClass({
  getInitialState: function() {
    return {
      text: this.props.text
    };
  },
  componentDidMount: function() {
    var text = this.refs.cmText.getDOMNode();
    var editor = CodeMirror.fromTextArea(text,{
      mode: 'markdown',
      lineNumbers: false,
      lineWrapping: true,
      dragDrop:false,
      autoFocus:true
    });
  },
  render: function() {
    return (
      <textarea ref='cmText' onChange={this._onChange} value={this.state.text} />
    );
  },

  _onChange: function(event) {
    Dispatcher.send('manuscript:localUpdate',
                    [this.props.manuscriptId, {text: event.target.value}]);
    this.setState({text: event.target.value});
  }
});

module.exports = TextEdit;
