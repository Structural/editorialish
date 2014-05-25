/** @jsx React.DOM */

var React = require('react'),
    Button = require('./button'),
    ManuscriptList = require('./manuscript_list');

var App = React.createClass({
  getInitialState: function() {
    return {
      manuscripts: this.props.store.manuscripts
    };
  },
  componentWillMount: function() {
    this.props.store.on('change', function() {
      this.setState({manuscripts: this.props.store.manuscripts});
    }.bind(this))
  },
  render: function() {
    return (
      <div>
        <Button content="new manuscript" action="manuscript:create" />
        <ManuscriptList manuscripts={this.state.manuscripts} />
      </div>
    );
  }
});

module.exports = App;
