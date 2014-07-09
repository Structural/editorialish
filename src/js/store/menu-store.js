var Store = require('./store');

var MenuStore = new Store({
  name: 'Menu',
  initialize: function() {
    this.items = undefined;
    this.anchor = undefined;
    this.menuName = undefined;
  },

  dispatches: {
    'menu:open': function(items, anchor, menuName) {
      this.items = items;
      this.anchor = anchor;
      this.menuName = menuName;
      this.trigger();
    },
    'menu:close': function() {
      this.items = undefined;
      this.anchor = undefined;
      this.menuName = undefined;
      this.trigger();
    }
  }
});

module.exports = MenuStore;
