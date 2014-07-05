/** @jsx React.DOM */

var React = require('react');

var Environment = require('../environment'),
    Modal = require('./modal'),
    DevPanel = require('../dev-panel/dev-panel');

var Toolbar = React.createClass({
  render: function() {
    var devPanel = undefined;
    if (Environment.DevMode) {
      devPanel = (
        <Modal name="Dev Panel" align="right">
          <DevPanel />
        </Modal>
      );
    }

    return (
      <div className="toolbar">
        {devPanel}
        {this.props.children}
      </div>
    );
  }
});

module.exports = Toolbar;
