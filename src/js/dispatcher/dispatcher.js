var callbacks = {};

var Dispatcher = {
  send: function(action, args) {
    var cbs = callbacks[action];
    if (cbs) {
      for (var i = 0; i < cbs.length; i++) {
        cbs[i].callback.apply(cbs[i].context, args);
      }
    }
  },

  on: function(action, callback, context) {
    if (!callbacks[action]) {
      callbacks[action] = [];
    }

    callbacks[action].push({callback: callback, context: context});
  }
};

module.exports = Dispatcher;
