var callbacks = {};

var Dispatcher = {
  send: function(action) {
    var cbs = callbacks[action];
    for (var i = 0; i < cbs.length; i++) {
      cbs[i]();
    }
  },

  on: function(action, callback) {
    if (!callbacks[action]) {
      callbacks[action] = [];
    }

    callbacks[action].push(callback);
  }
};

module.exports = Dispatcher;
