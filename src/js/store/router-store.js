var Store = require('./store'),
    Dispatcher = require('../dispatcher/dispatcher');

var RouterStore = new Store({
  initialize: function() {
    window.onpopstate = function() {
      this._pathChanged();
      this._updateAndTrigger();
    }.bind(this);
  },

  _pathSegments: function() {
    return window.location.pathname.substring(1).split('/');
  },
  _updateAndTrigger: function() {
    this.segments = this._pathSegments();
    this.trigger();
  },
  _pathChanged: function() {
    Dispatcher.send('pathChanged', [this._pathSegments()]);
  },
  _goToPath: function(path) {
    window.history.pushState({}, '', path);
    this._updateAndTrigger();
  },

  dispatches: {
    // Some browsers fire a popstate on page load, some don't.  Store functions
    // should be idempotent, so sending this twice shouldn't be a problem.
    'app:start': function() {
      this._pathChanged();
      this._updateAndTrigger();
    },
    'manuscript:edit': function(manuscriptId) {
      this._goToPath('/manuscript/' + manuscriptId);
    },
    'manuscript:list': function() {
      this._goToPath('/');
    }
  }
});

module.exports = RouterStore;
