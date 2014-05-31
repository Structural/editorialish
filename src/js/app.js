/** @jsx React.DOM */

var React = require('react')
    ViewStateStore = require('./store/view-state-store'),
    HomePage = require('./home-page/home-page'),
    EditorPage = require('./editor-page/editor-page');

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
                 : this.state.view === 'manuscript:edit' ? <EditorPage manuscriptId={ViewStateStore.manuscriptId} />
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
