/** @jsx React.DOM */

var React = require('react');

var ManuscriptStore = require('../store/manuscript-store'),
    FolderStore = require('../store/folder-store'),
    Button = require('../shared/button'),
    Icon = require('../shared/icon'),
    LogoutButton = require('../shared/logout-button'),
    Credits = require('../shared/credits'),
    ManuscriptList = require('./manuscript-list'),
    FolderList = require('./folder-list');

var HomePage = React.createClass({
  toggleNav:function(){
    this.setState({showNav: !this.state.showNav})
  },
  getInitialState: function() {
    return {
      manuscripts: ManuscriptStore.manuscripts,
      folders: FolderStore.folders,
      showNav: false
    };
  },
  componentDidMount: function() {
    ManuscriptStore.listen(this._onManuscriptChange);
    FolderStore.listen(this._onFolderChange);
  },
  componentWillUnmount: function() {
    FolderStore.listen(this._onFolderChange);
    ManuscriptStore.ignore(this._onManuscriptChange);
  },
  render: function() {
    var user = this.props.user;
    var classes = 'home-page';
    if (this.state.showNav === true) {
      classes = classes + " nav-is-shown";
    }
    return (
      <div className={classes}>
        <div className="nav-column">
          <div className="nav-title-bar"><div className='ed-icon'></div> Editorialish</div>
          <div className='nav-contents'>
            <FolderList folders={this.state.folders} />
            <Credits />
          </div>
          <div className='bottom-toolbar'>
            <LogoutButton className='logout-button' align='right'/>
            <div className='two-line-info middle'>
              <div className="title">{user.displayName}</div>
              <div className="sub-title">{user.username}</div>
            </div>
          </div>
        </div>
        <div className="manuscripts-column">
          <div className='toolbar'>
            <Button align="left" onClick={this.toggleNav} label="Menu" className='hamburger-button'><Icon name="bars"/></Button>
            <Button align="right" action="manuscript:create" label="New Manuscript"><Icon name="plus"/></Button>

            <div className='two-line-info middle'>
              <div className="title">All Documents</div>
              <div className="sub-title">last updated at 10:02am</div>
            </div>

          </div>
          <ManuscriptList manuscripts={this.state.manuscripts} />
        </div>
      </div>
    );
  },

  _onManuscriptChange: function() {
    this.setState({manuscripts: ManuscriptStore.manuscripts});
  },
  _onFolderChange: function() {
    this.setState({folders: FolderStore.folders});
  }
});

module.exports = HomePage;
