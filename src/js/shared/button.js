/** @jsx React.DOM */

var React = require('react');
var Dispatcher = require('../dispatcher/dispatcher');
var _ = require('underscore');

var Button = React.createClass({
  render: function() {
    var leftLabel = undefined;
    var rightLabel = undefined;
    var children = this.props.children ? this.props.children : undefined;
    var classes = this.props.className ? this.props.className : "";
    var labelClass = this.props.children ? "label can-be-hidden" : "label";

    if (_.contains(['left', 'right', 'middle'], this.props.align)){
      classes = classes + " " + this.props.align;
    }
    if (this.props.label){
      if (this.props.align === 'right'){
        leftLabel =<span className={labelClass}>{this.props.label}</span>;
      } else {
        rightLabel =<span className={labelClass}>{this.props.label}</span>;
      }
    }

    return (
      <button onClick={this._activate} className={classes}>
        {leftLabel}
        {children}
        {rightLabel}
      </button>
    );
  },

  _activate: function(event) {
    if (this.props.onClick) {
      this.props.onClick(event);
    }

    if (this.props.action) {
      Dispatcher.send(this.props.action, this.props.args);
    }
  }
});

module.exports = Button;
