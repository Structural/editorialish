var _ = require('underscore');

var Dispatcher = require('../dispatcher/dispatcher'),
    Environment = require('../environment');

var Store = (function(env) {
  return function(options) {
    if (env.DevMode) {
      Store.stores.push(this);
    }

    this._callbacks = [];
    _.extend(this, _.omit(options, 'initialize', 'dispatches'));

    if (options.initialize) {
      options.initialize.call(this);
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
  }
})(Environment);
/* I swear, I have *no* *idea* why Store is closing over _ and Dispatcher but
   not Environment.  Environment is in the local scope when Store is declared,
   but Chrome's dev tools don't show it in the closure scope when Store is
   evaluated.  Reading
   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions_and_function_scope#Nested_functions_and_closures
   did not help.  So, fuck it I guess.  IIFE FTW. */

if (Environment.DevMode) {
  Store.stores = [];
}

module.exports = Store;
