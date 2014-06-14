var Store = require('./store');

var MenuStore = new Store({
  initialize: function() {
    this.items = undefined;
    this.anchor = undefined;
  },

  dispatches: {
    'menu:open': function(items, anchor) {
      this.items = items;
      this.anchor = anchor;
      this.trigger();
    },
    'menu:close': function() {
      this.items = undefined;
      this.anchor = undefined;
      this.trigger();
    }
  }
});

module.exports = MenuStore;
