/** @jsx React.DOM */

var React = require('react'),
    Dispatcher = require('../dispatcher/dispatcher');

var TitleEdit = React.createClass({
  getInitialState: function() {
    return {
      title: this.props.title
    };
  },

  render: function() {
    return (
      <input type="text" value={this.state.title} onChange={this._onChange} placeholder='Document Title'/>
    );
  },

  _onChange: function(event) {
    Dispatcher.send('manuscript:localUpdate',
                    [this.props.manuscriptId,  {title: event.target.value}]);
    this.setState({title: event.target.value});
  }
});

module.exports = TitleEdit;
