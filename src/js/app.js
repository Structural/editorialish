/** @jsx React.DOM */

var React = require('react')
    RouterStore = require('./store/router-store'),
    UserStore = require('./store/user-store'),
    HomePage = require('./home-page/home-page'),
    EditorPage = require('./editor-page/editor-page'),
    FourOhFourPage = require('./four-oh-four-page/four-oh-four-page'),
    Login = require('./login/login'),
    MenuLayer = require('./menu-layer/menu-layer');

var App = React.createClass({
  getInitialState: function() {
    return {
      user: UserStore.user,
      segments: RouterStore.segments
    }
  },
  componentDidMount: function() {
    UserStore.listen(this._onUserChange);
    RouterStore.listen(this._onRouteChange);
  },
  componentWillUnmount: function() {
    RouterStore.ignore(this._onRouteChange);
    UserStore.ignore(this._onUserChange);
  },
  render: function() {
    var contents = <FourOhFourPage />;
    if (!this.state.user) {
      contents = <Login />;
    } else if (this.state.segments[0] === '') {
      contents = <HomePage />;
    } else if (this.state.segments[0] === 'manuscript') {
      contents = <EditorPage manuscriptId={this.state.segments[1]} />
    }

    return (
      <div className ='app editorialish'>
        {contents}
        <MenuLayer /
      </div>
    );
  },

  _onRouteChange: function() {
    this.setState({segments: RouterStore.segments});
  },
  _onUserChange: function() {
    this.setState({user: UserStore.user});
  }
});

module.exports = App;
