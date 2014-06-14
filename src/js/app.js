/** @jsx React.DOM */

var React = require('react')
    ViewStateStore = require('./store/view-state-store'),
    UserStore = require('./store/user-store'),
    HomePage = require('./home-page/home-page'),
    EditorPage = require('./editor-page/editor-page'),
    Login = require('./login/login');

var App = React.createClass({
  getInitialState: function() {
    return {
      user: UserStore.user,
      view: ViewStateStore.view
    }
  },
  componentDidMount: function() {
    UserStore.listen(this._onUserChange);
    ViewStateStore.listen(this._onViewStateChange);
  },
  componentWillUnmount: function() {
    ViewStateStore.ignore(this._onViewStateChange);
    UserStore.ignore(this._onUserChange);
  },
  render: function() {
    var contents = undefined;
    if (!this.state.user) {
      contents = <Login />;
    } else if (this.state.view === 'manuscript:list') {
      contents = <HomePage />;
    } else if (this.state.view === 'manuscript:edit') {
      contents = <EditorPage manuscriptId={ViewStateStore.manuscriptId} />
    }

    return (
      <div className ='app editorialish'>{contents}</div>
    );
  },

  _onViewStateChange: function() {
    this.setState({view: ViewStateStore.view});
  },
  _onUserChange: function() {
    this.setState({user: UserStore.user});
  }
});

module.exports = App;
