/** @jsx React.DOM */

var React = require('react');

var ModalStore = require('../store/modal-store'),
    Button = require('../shared/button'),
    Icon = require('../shared/icon');

var ModalLayer = React.createClass({
  getInitialState: function() {
    return {
      items: ModalStore.items,
      name: ModalStore.modalName
    }
  },
  componentDidMount: function() {
    ModalStore.listen(this._onModalChange);
  },
  componentWillUnmount: function() {
    ModalStore.ignore(this._onModalChange);
  },

  render: function() {
    var layerClasses = ['modal-layer'];
    if (this.state.items) {
      layerClasses.push('is-showing-modal');
    }

    return (
      <div className={layerClasses.join(' ')}>
        <div className="modal-layer-content">
          <Button className="modal-close" action="modal:close">
            <Icon name="times" />
          </Button>
          {this.state.items}
        </div>
      </div>
    );
  },

  _onModalChange: function() {
    this.setState({
      items: ModalStore.items,
      name: ModalStore.modalName
    })
  }
});

module.exports = ModalLayer;
