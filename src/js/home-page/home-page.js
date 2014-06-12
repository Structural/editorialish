/** @jsx React.DOM */

var React = require('react'),
    ManuscriptStore = require('../store/manuscript-store'),
    Button = require('../shared/button'),
    LogoutButton = require('../shared/logout-button'),
    Credits = require('../shared/credits');

var ManuscriptList = require('./manuscript-list');


var HomePage = React.createClass({
  toggleNav:function(){
    this.setState({showNav: !this.state.showNav})
  },
  getInitialState: function() {
    return {
      manuscripts: ManuscriptStore.manuscripts,
      showNav: false
    };
  },
  componentDidMount: function() {
    ManuscriptStore.listen(this._onManuscriptChange);
  },
  componentWillUnmount: function() {
    ManuscriptStore.ignore(this._onManuscriptChange);
  },
  render: function() {
    var classes = 'home-page';
    if (this.state.showNav === true) {
      classes = classes + " nav-is-shown";
    }
    return (
      <div className={classes}>
        <div className="nav-column">
          <div className="toolbar">Editorialish</div>
          <div className='nav-contents'>
            <Credits />
          </div>
          <div className='bottom-toolbar'>
            <LogoutButton />
          </div>
        </div>
        <div className="manuscripts-column">
          <div className='toolbar'>
            <div className="group left">
              <button onClick={this.toggleNav}>Menu</button>
            </div>
            <div className="group right">
              <Button content="new manuscript" action="manuscript:create"/>
            </div>
          </div>
          <ManuscriptList manuscripts={this.state.manuscripts} />

        </div>
      </div>
    );
  },

  _onManuscriptChange: function() {
    this.setState({manuscripts: ManuscriptStore.manuscripts});
  }
});

module.exports = HomePage;
