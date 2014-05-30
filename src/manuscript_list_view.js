/** @jsx React.DOM */

var React = require('react'),
    ManuscriptStore = require('./manuscript_store'),
    Button = require('./button'),
    ManuscriptList = require('./manuscript_list'),
    Credits = require('./credits');

var ManuscriptListView = React.createClass({
  getInitialState: function() {
    return {
      manuscripts: ManuscriptStore.manuscripts
    };
  },
  componentDidMount: function() {
    ManuscriptStore.listen(this._onManuscriptChange);
  },
  componentWillUnmount: function() {
    ManuscriptStore.ignore(this._onManuscriptChange);
  },
  render: function() {
    return (
      <div>
        <Button content="new manuscript" action="manuscript:create" />
        <ManuscriptList manuscripts={this.state.manuscripts} />
        <Credits />
      </div>
    );
  },

  _onManuscriptChange: function() {
    this.setState({manuscripts: ManuscriptStore.manuscripts});
  }
});

module.exports = ManuscriptListView;
