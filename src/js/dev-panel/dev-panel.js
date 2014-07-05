/** @jsx React.DOM */

var React = require('react');
var Button = require('../shared/button');
var _ = require('underscore');
var Dispatcher = require('../dispatcher/dispatcher');

var parent = function(obj) {
  return Object.getPrototypeOf(obj);
}

var grandparent = function(obj) {
  return parent(parent(obj));
}

var pprint = function(obj) {
  if (typeof obj === 'string') {
    return "\"" + obj + "\"";
  } else if (obj instanceof Array) {
    return "[" + _.map(obj, pprint).join(', ') + "]";
  } else if (typeof obj === 'object') {
    if (grandparent(obj) === null) {
      return JSON.stringify(obj);
    } else {
      // Note - displayName is not standard, but seems to work in
      // FF and Chrome.  Sometimes.  Depending on what objects you're
      // looking at.  Other times it's name.  Which is only standard
      // in ES6.
      var ctor = parent(obj).constructor;
      var name = (ctor.name === undefined || ctor.name === "") ?
                 ctor.displayName :
                 ctor.name;
      return "[object " + name + "]";
    }
  } else {
    return obj.toString();
  }
};

var DevPanel = React.createClass({

  render: function() {
    var list = _.map(Dispatcher.callbacks,
      function(callbacksArray, action){
        return(
          <div className="action">
            <Button action={action}>Trigger</Button>
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
