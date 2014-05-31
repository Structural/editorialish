/** @jsx React.DOM */

var React = require('react'),
    Dispatcher = require('../dispatcher/dispatcher');

var TextEdit = React.createClass({
  getInitialState: function() {
    return {
      text: this.props.text
    };
  },

  render: function() {
    return (
      <textarea onChange={this._onChange} value={this.state.text} />
    );
  },

  _onChange: function(event) {
    Dispatcher.send('manuscript:localUpdate',
                    [this.props.manuscriptId, {text: event.target.value}]);
    this.setState({text: event.target.value});
  }
});

module.exports = TextEdit;
