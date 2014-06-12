/** @jsx React.DOM */

var React = require('react'),
    Button = require('../shared/button'),
    LogoutButton = require('../shared/logout-button'),
    ManuscriptStore = require('../store/manuscript-store');

var TitleEdit = require('./title'),
TextEdit = require('./text');

var ManuscriptEditView = React.createClass({
  render: function() {
    var manuscript = ManuscriptStore.manuscripts[this.props.manuscriptId];

    return (
      <div className="manuscript-editor">
        <div className="toolbar">
          <div className="group left">
            <Button action="manuscript:list">
              home
            </Button>
            <Button action="manuscript:save" args={[this.props.manuscriptId]}>
              save
            </Button>
          </div>
        </div>
        <div className="editor-contents">
          <div className='manuscript'>
            <TitleEdit title={manuscript.title} manuscriptId={this.props.manuscriptId} />
            <TextEdit text={manuscript.text} manuscriptId={this.props.manuscriptId} />
          </div>
        </div>
      </div>
      );
  }
});

module.exports = ManuscriptEditView;
