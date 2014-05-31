/** @jsx React.DOM */

var React = require('react'),
    Button = require('./button'),
    ManuscriptStore = require('./manuscript_store'),
    TitleEdit = require('./title_edit'),
    TextEdit = require('./text_edit');

var ManuscriptEditView = React.createClass({
  render: function() {
    var manuscript = ManuscriptStore.manuscripts[this.props.manuscriptId];

    return (
      <div className="manuscript-editor">
        <Button content="home" action="manuscript:list" />
        <TitleEdit title={manuscript.title}
                   manuscriptId={this.props.manuscriptId} />
        <TextEdit text={manuscript.text}
                  manuscriptId={this.props.manuscriptId} />
        <Button content="save" action="manuscript:save"
                args={[this.props.manuscriptId]} />
      </div>
    );
  }
});

module.exports = ManuscriptEditView;
