/** @jsx React.DOM */

var React = require('react')
    ViewStateStore = require('./view_state_store'),
    ManuscriptListView = require('./manuscript_list_view'),
    ManuscriptEditView = require('./manuscript_edit_view');

var App = React.createClass({
  getInitialState: function() {
    return {view: ViewStateStore.view}
  },
  componentDidMount: function() {
    ViewStateStore.on('change', function() {
      this.setState({view: ViewStateStore.view});
    }.bind(this))
  },
  render: function() {
    var contents = this.state.view === 'manuscript:list' ? <ManuscriptListView />
                 : this.state.view === 'manuscript:edit' ? <ManuscriptEditView manuscriptId={ViewStateStore.manuscriptId} />
                 : undefined;

    return (
      <div>{contents}</div>
    );
  }
});

module.exports = App;
