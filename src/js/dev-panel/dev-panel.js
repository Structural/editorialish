/** @jsx React.DOM */

var React = require('react');
var Button = require('../shared/button');
var _ = require('underscore');
var Dispatcher = require('../dispatcher/dispatcher');

var DevPanel = React.createClass({

  render: function() {
    console.log(Dispatcher.callbacks);
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
    return (
      <div className="dev-panel">{list}</div>
    );
  }
});

module.exports = DevPanel;
