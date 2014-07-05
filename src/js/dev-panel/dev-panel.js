/** @jsx React.DOM */

var React = require('react');
var Button = require('../shared/button');
var _ = require('underscore');
var Dispatcher = require('../dispatcher/dispatcher');

var DevPanel = React.createClass({

  render: function() {
    var list = _.map(Dispatcher.callbacks,
      function(callbacksArray, action){
        return(
          <div className="action">
            <span className="action-trigger">
              <Button action={action}>Trigger</Button>
            </span>
            <span className="action-name">
              {action}
            </span>
            <span className="action-listener-count">
              [{callbacksArray.length}]
            </span>
          </div>
        );
      }
    );

    var history = _.map(Dispatcher.actionHistory, function(action) {
      var argString = '';
      var argPrompt = '';
      if (action.arguments) {
        argString = _.map(action.arguments, function(arg) {
          return arg.toString()
        }).join(', ');
        argString = '[' + argString + ']';
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
      <div className="dev-panel">
        <div className="action-list">
          <span className="title">Trigger Actions</span>
          {list}
        </div>
        <div className="action-history">
          <span className="title">Action History</span>
          {history}
        </div>
      </div>
    );
  }
});

module.exports = DevPanel;
