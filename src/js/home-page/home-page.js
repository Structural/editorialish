/** @jsx React.DOM */

var React = require('react');

var ManuscriptStore = require('../store/manuscript-store'),
    FoldersStore = require('../store/folder-store'),
    NavColumn = require('./nav-column'),
    Button = require('../shared/button'),
    Icon = require('../shared/icon'),
    ManuscriptList = require('./manuscript-list'),
    FolderList = require('./folder-list'),
    Dispatcher = require('../dispatcher/dispatcher');

var HomePage = React.createClass({
  toggleNav:function(){
    this.setState({showNav: !this.state.showNav})
  },
  getInitialState: function() {
    return {
      manuscripts: ManuscriptStore.manuscripts,
      folders: FoldersStore.folders,
      activeFolder: FoldersStore.activeFolder,
      showNav: false
    };
  },
  componentDidMount: function() {
    ManuscriptStore.listen(this._onManuscriptChange);
    FoldersStore.listen(this._onFolderChange);
  },
  componentWillUnmount: function() {
    FoldersStore.listen(this._onFolderChange);
    ManuscriptStore.ignore(this._onManuscriptChange);
  },
  render: function() {
    var classes = 'home-page';
    if (this.state.showNav === true) {
      classes = classes + " nav-is-shown";
    }

    return (
      <div className={classes}>
        <NavColumn user={this.props.user}>
          <FolderList folders={this.state.folders}
                      activeFolder={this.state.activeFolder} />
        </NavColumn>
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
    this.setState({
      folders: FoldersStore.folders,
      activeFolder: FoldersStore.activeFolder
    });
  }
});

module.exports = HomePage;
