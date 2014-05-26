/** @jsx React.DOM */

var React = require('react'),
    Dispatcher = require('./dispatcher');

var TextEdit = React.createClass({
  render: function() {
    var localUpdate = function(event) {
      Dispatcher.send('manuscript:localUpdate',
                      [this.props.manuscriptId, {text: event.target.value}]);
    }

    return (
      <textarea onChange={localUpdate.bind(this)}>{this.props.text}</textarea>
    );
  }
});

module.exports = TextEdit;
