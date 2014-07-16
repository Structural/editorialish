/** @jsx React.DOM */

var React = require('react'),
    _ = require('underscore');

var Dispatcher = require('../dispatcher/dispatcher'),
    pprint = require('../shared/pretty-print');

var ActionHistory = React.createClass({
  render: function() {
    var history = _.map(Dispatcher.actionHistory, function(action) {
      var argString = '';
      var argPrompt = '';
      if (action.arguments) {
        argString = pprint(action.arguments);
        argPrompt = 'with arguments';
      }

      return (
        <div className="historical-action">
          <span className="action-name">
            {action.action}
          </span>
          <span className="action-arguments-prompt">
            {argPrompt}
          </span>
          <span className="action-arguments">
            {argString}
          </span>
        </div>
      );
    });

    return (
      <div className="action-history">
        <span className="title">Action History</span>
        {history}
      </div>
    );
  }
});

module.exports = ActionHistory;
