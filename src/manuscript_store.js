var Firebase = require('client-firebase');

var ManuscriptStore = function() {
  this.firebase = new Firebase('https://editorialish.firebaseio.com/testing');
  this.firebase.on('value', function(snapshot) {
    this.data = snapshot.val();
    this.trigger('change');
  }, this)

  var callbacks = {
    'change': []
  }

  this.on = function(event, callback) {
    callbacks[event].push(callback);
  }

  this.trigger = function(event) {
    var cbs = callbacks[event];
    for (var i = 0; i < cbs.length; i++) {
      cbs[i]();
    }
  }
};

module.exports = ManuscriptStore;
