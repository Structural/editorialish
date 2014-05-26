var Dispatcher = require('./dispatcher');

var ViewStateStore = function() {
  this.view = 'manuscript:list';

  Dispatcher.on('manuscript:edit', function(manuscriptId) {
    this.view = 'manuscript:edit';
    this.manuscriptId = manuscriptId;
    this.trigger('change');
  }.bind(this));

  Dispatcher.on('manuscript:list', function() {
    this.view = 'manuscript:list';
    this.trigger('change');
  }.bind(this));

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
}

module.exports = new ViewStateStore();
