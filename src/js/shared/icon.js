/** @jsx React.DOM */

var React = require('react');

var Icon = React.createClass({
  render: function() {
    var classes = "fa fa-";

    if(this.props.name){
      classes += this.props.name;
    } else {
      classes += "question";
    }

    if (this.props.className){
      classes = classes + " " + this.props.className;
    }
    return (<i className={classes}></i>);
  }
});

module.exports = Icon;
