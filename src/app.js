/** @jsx React.DOM */

var React = require('react');

var App = React.createClass({
  getInitialState: function() {
    return {
      data: this.props.store.data
    };
  },
  componentWillMount: function() {
    this.props.store.on('change', function() {
      this.setState({data: this.props.store.data});
    }.bind(this))
  },
  render: function() {
    return (
      <div>{this.state.data}</div>
    );
  }
});

module.exports = App;
