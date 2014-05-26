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
      <div>
        <Button content="home" action="manuscript:list" />
        <TitleEdit title={manuscript.title} />
        <TextEdit text={manuscript.text} />
      </div>
    );
  }
});

module.exports = ManuscriptEditView;
