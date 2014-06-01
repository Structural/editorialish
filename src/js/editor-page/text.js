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
    this.editor = CodeMirror.fromTextArea(text,{
      mode: 'markdown',
      lineNumbers: false,
      lineWrapping: true,
      dragDrop:false,
      autoFocus:true
    });
    this.editor.on('change', this._onChange);
  },
  render: function() {
    return (
      <textarea ref='cmText' defaultValue={this.state.text} />
    );
  },

  _onChange: function() {
    if (this.editor) {
      var text = this.editor.getValue();
      Dispatcher.send('manuscript:localUpdate',
                      [this.props.manuscriptId, {text: text}]);
      this.setState({text: text});
    }
  }
});

module.exports = TextEdit;
