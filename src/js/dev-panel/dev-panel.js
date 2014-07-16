/** @jsx React.DOM */

var React = require('react'),
    _ = require('underscore');

var TriggerList = require('./trigger-list'),
    ActionHistory = require('./action-history');
    StoreList = require('./store-list');

var DevPanel = React.createClass({
  render: function() {
    return (
      <div className="dev-panel">
        <TriggerList />
        <ActionHistory />
        <StoreList />
      </div>
    );
  }
});

module.exports = DevPanel;
