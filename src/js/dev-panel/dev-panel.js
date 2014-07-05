/** @jsx React.DOM */

var React = require('react'),
    _ = require('underscore');

var TriggerList = require('./trigger-list'),
    ActionHistory = require('./action-history');

var DevPanel = React.createClass({
  render: function() {
    return (
      <div className="dev-panel">
        <TriggerList />
        <ActionHistory />
      </div>
    );
  }
});

module.exports = DevPanel;
