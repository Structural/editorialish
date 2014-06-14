/** @jsx React.DOM */

var React = require('react'),
    Button = require('../shared/button'),
    LogoutButton = require('../shared/logout-button'),
    ManuscriptStore = require('../store/manuscript-store');

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
    if (manuscript) {
      titleEditor = <TitleEdit title={manuscript.title}
                               manuscriptId={this.props.manuscriptId} />;
      textEditor = <TextEdit text={manuscript.text}
                             manuscriptId={this.props.manuscriptId} />;
    }

    return (
      <div className="manuscript-editor">
        <div className="toolbar">
          <div className="group left">
            <Button content="home" action="manuscript:list" />
            <Button content="save" action="manuscript:save" args={[this.props.manuscriptId]} />
          </div>
        </div>
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
