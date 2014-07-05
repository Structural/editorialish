/** @jsx React.DOM */

var React = require('react');
var Button = require('../shared/button');
var Icon = require('../shared/icon');
var LogoutButton = require('../shared/logout-button');
var ManuscriptStore = require('../store/manuscript-store');
var Toolbar = require('../shared/toolbar');

var TitleEdit = require('./title'),
TextEdit = require('./text');

var ManuscriptEditView = React.createClass({
  getInitialState: function() {
    return {
      manuscript: ManuscriptStore.manuscripts[this.props.manuscriptId]
    };
  },
  componentDidMount: function() {
    ManuscriptStore.listen(this._onManuscriptChange);
  },
  componentWillUnmount: function() {
    ManuscriptStore.ignore(this._onManuscriptChange);
  },

  render: function() {
    var manuscript = this.state.manuscript;
    var titleEditor = undefined;
    var textEditor = undefined;
    var title = "Unknown Manuscript"
    if (manuscript) {
      titleEditor = <TitleEdit title={manuscript.title}
                               manuscriptId={this.props.manuscriptId} />;
      textEditor = <TextEdit text={manuscript.text}
                             manuscriptId={this.props.manuscriptId} />;
      title = manuscript.title;
    }

    return (
      <div className="manuscript-editor">
        <Toolbar>
          <Button action="manuscript:list" label="Home" align='left'>
            <Icon name="chevron-left"/>
          </Button>
          <Button action="manuscript:save" args={[this.props.manuscriptId]} align="right" label='Save'>
            <Icon name="save"/>
          </Button>
          <div className='two-line-info middle'>
            <div className="title">{title}</div>
            <div className="sub-title">last updated at 10:02am</div>
          </div>
        </Toolbar>
        <div className="editor-contents">
          <div className='manuscript'>
            {titleEditor}
            {textEditor}
          </div>
        </div>
      </div>
      );
  },

  _onManuscriptChange: function() {
    this.setState({
      manuscript: ManuscriptStore.manuscripts[this.props.manuscriptId]
    });
  }
});

module.exports = ManuscriptEditView;
