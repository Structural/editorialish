/** @jsx React.DOM */

var React = require('react'),
    ManuscriptStore = require('./manuscript_store'),
    Button = require('./button'),
    ManuscriptList = require('./manuscript_list'),
    Credits = require('./credits');

var ManuscriptListView = React.createClass({
  getInitialState: function() {
    return {
      manuscripts: ManuscriptStore.manuscripts
    };
  },
  componentDidMount: function() {
    ManuscriptStore.listen(this._onManuscriptChange);
  },
  componentWillUnmount: function() {
    ManuscriptStore.ignore(this._onManuscriptChange);
  },
  render: function() {
    return (
      <div className="home-page">
        <div className="nav-column">
          <div className="toolbar">Editorialish</div>
          <div className='nav-contents'></div>
          <div className='bottom-toolbar'></div>
        </div>
        <div className="manuscripts-column">
          <div className='toolbar'>
            <Button content="new manuscript" action="manuscript:create" />
          </div>
          <ManuscriptList manuscripts={this.state.manuscripts} />
          <Credits />
        </div>
      </div>
    );
  },

  _onManuscriptChange: function() {
    this.setState({manuscripts: ManuscriptStore.manuscripts});
  }
});

module.exports = ManuscriptListView;
