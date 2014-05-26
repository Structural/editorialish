/** @jsx React.DOM */

var React = require('react'),
    ManuscriptStore = require('./manuscript_store'),
    Button = require('./button'),
    ManuscriptList = require('./manuscript_list');

var ManuscriptListView = React.createClass({
  getInitialState: function() {
    return {
      manuscripts: ManuscriptStore.manuscripts
    };
  },
  componentDidMount: function() {
    ManuscriptStore.on('change', function() {
      this.setState({manuscripts: ManuscriptStore.manuscripts});
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

module.exports = ManuscriptListView;
