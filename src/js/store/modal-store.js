var Store = require('./store');

var ModalStore = new Store({
  name: 'Modal',
  initialize: function() {
    this.items = undefined;
    this.modalName = undefined;
  },

  dispatches: {
    'modal:open': function(items, name) {
      this.items = items;
      this.modalName = name;
      this.trigger();
    },
    'modal:close': function() {
      this.items = undefined;
      this.modalName = undefined;
      this.trigger();
    }
  }
});

module.exports = ModalStore;
