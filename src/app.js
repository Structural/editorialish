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
    ViewStateStore.listen(this._onViewStateChange);
  },
  componentWillUnmount: function() {
    ViewStateStore.ignore(this._onViewStateChange);
  },
  render: function() {
    var contents = this.state.view === 'manuscript:list' ? <ManuscriptListView />
                 : this.state.view === 'manuscript:edit' ? <ManuscriptEditView manuscriptId={ViewStateStore.manuscriptId} />
                 : undefined;

    return (
      <div className ='app editorialish'>{contents}</div>
    );
  },

  _onViewStateChange: function() {
    this.setState({view: ViewStateStore.view});
  }
});

module.exports = App;
