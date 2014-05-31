var _ = require('underscore'),
    Dispatcher = require('../dispatcher/dispatcher');

var Store = function(options) {
  this._callbacks = [];

  if (options.initialize) {
    options.initialize.call(this);;
  }

  if (options.dispatches) {
    _.each(options.dispatches, function(callback, action) {
      Dispatcher.on(action, callback, this);
    }, this);
  }

  this.listen = function(callback, context) {
    this._callbacks.push({callback: callback, context: context})
  }

  this.ignore = function(callback) {
    this._callbacks = _.reject(this._callbacks, function(cb) {
      return cb.callback === callback;
    });
  }

  this.trigger = function() {
    _.each(this._callbacks, function(cb) {
      var fn = cb.context ? cb.callback.bind(cb.context) : cb.callback;
      fn();
    });
  }
};

module.exports = Store;
