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
            <Button action={action}>Trigger</Button>
            <span> {action} [{callbacksArray.length}]</span>
          </div>
        );
      }
    );

    var history = _.map(Dispatcher.actionHistory, function(action) {
      var argString = '';
      if (action.arguments) {
        var argString = _.map(action.arguments, function(arg) {
          return arg.toString()
        }).join(', ');
      }

      return (
        <div className="historical-action">
          {action.action}
          with arguments
          [{argString}]
        </div>
      );
    });

    return (
      <div className="dev-panel">
        <div className="action-list">
          {list}
        </div>
        <div className="action-history">
          {history}
        </div>
      </div>
    );
  }
});

module.exports = DevPanel;
