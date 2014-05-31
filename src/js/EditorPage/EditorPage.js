/** @jsx React.DOM */

var React = require('react'),
Button = require('../shared/button'),
ManuscriptStore = require('../store/manuscript_store');

var TitleEdit = require('./Title'),
TextEdit = require('./Text');

var ManuscriptEditView = React.createClass({
  render: function() {
    var manuscript = ManuscriptStore.manuscripts[this.props.manuscriptId];

    return (
      <div className="manuscript-editor">
      <div className="toolbar">
      <Button content="home" action="manuscript:list" />
      <Button content="save" action="manuscript:save" args={[this.props.manuscriptId]} />
      </div>
      <TitleEdit title={manuscript.title} manuscriptId={this.props.manuscriptId} />

      <TextEdit text={manuscript.text}
      manuscriptId={this.props.manuscriptId} />
      </div>
      );
  }
});

module.exports = ManuscriptEditView;
