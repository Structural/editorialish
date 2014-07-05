/** @jsx React.DOM */

var React = require('react'),
    _ = require('underscore');

var Button = require('../shared/button'),
    Dispatcher = require('../dispatcher/dispatcher');

var TriggerList = React.createClass({
  render: function() {
    var list = _.map(Dispatcher.callbacks, function(array, action) {
      return (
        <div className="action">
          <Button action={action}>Trigger</Button>
          <span className="action-name">
            {action}
          </span>
          <span className="action-listener-count">
            [{array.length}]
          </span>
        </div>
      );
    });

    return (
      <div className="action-list">
        <span className="title">Trigger Actions</span>
        {list}
      </div>
    );
  }
});

module.exports = TriggerList;
