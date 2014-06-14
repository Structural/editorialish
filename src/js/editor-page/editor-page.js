/** @jsx React.DOM */

var React = require('react');
var Button = require('../shared/button');
var Icon = require('../shared/icon');
var LogoutButton = require('../shared/logout-button');
var ManuscriptStore = require('../store/manuscript-store');

var TitleEdit = require('./title'),
TextEdit = require('./text');

var ManuscriptEditView = React.createClass({
  render: function() {
    var manuscript = ManuscriptStore.manuscripts[this.props.manuscriptId];

    return (
      <div className="manuscript-editor">
        <div className="toolbar">
          <Button action="manuscript:list" label="Home" align='left'>
            <Icon name="chevron-left"/>
          </Button>
          <Button action="manuscript:save" args={[this.props.manuscriptId]} align="right" label='Save'>
            <Icon name="save"/>
          </Button>
          <div className='two-line-info middle'>
            <div className="title">Document Editor</div>
            <div className="sub-title">last updated at 10:02am</div>
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
