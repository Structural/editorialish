/** @jsx React.DOM */

var React = require('react'),
    Dispatcher = require('./dispatcher');

var TitleEdit = React.createClass({
  render: function() {
    var localUpdate = function(event) {
      Dispatcher.send('manuscript:localUpdate',
                      [this.props.manuscriptId, {title: event.target.value}]);
    }

    return (
      <input type="text" value={this.props.title}
             onChange={localUpdate.bind(this)} />
    );
  }
});

module.exports = TitleEdit;
