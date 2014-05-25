var Firebase = require('client-firebase'),
    Dispatcher = require('./dispatcher');

var ManuscriptStore = function() {
  this.firebase = new Firebase('https://editorialish.firebaseio.com/manuscripts');
  this.firebase.on('value', function(snapshot) {
    this.manuscripts = snapshot.val();
    this.trigger('change');
  }, this)

  Dispatcher.on('manuscript:create', function() {
    this.firebase.push({
      title: 'New Document',
      text: '',
      comments: []
    })
  }.bind(this))

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