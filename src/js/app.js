/** @jsx React.DOM */

var React = require('react')
    ViewStateStore = require('./store/view_state_store'),
    HomePage = require('./HomePage/HomePage'),
    ManuscriptEditView = require('./EditorPage/EditorPage');

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
    var contents = this.state.view === 'manuscript:list' ? <HomePage />
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
