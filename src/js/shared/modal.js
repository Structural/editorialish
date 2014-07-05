/** @jsx React.DOM */

var React = require('react');

var Button = require('./button'),
    Dispatcher = require('../dispatcher/dispatcher');

var Modal = React.createClass({
  render: function() {
    return (
      <Button className="modal-open" onClick={this._open}
              align={this.props.align}>
        {this.props.name}
      </Button>
    );
  },

  _open: function() {
    Dispatcher.send('modal:open', [this.props.children, this.props.name]);
  }
});

module.exports = Modal;
