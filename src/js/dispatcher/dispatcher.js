var Dispatcher = {
  callbacks: {},

  send: function(action, args) {
    var cbs = this.callbacks[action];
    if (cbs) {
      for (var i = 0; i < cbs.length; i++) {
        cbs[i].callback.apply(cbs[i].context, args);
      }
    }
  },

  on: function(action, callback, context) {
    if (!this.callbacks[action]) {
      this.callbacks[action] = [];
    }

    this.callbacks[action].push({callback: callback, context: context});
  }
};

module.exports = Dispatcher;
