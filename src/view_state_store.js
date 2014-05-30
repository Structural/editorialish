var Store = require('./store'),
    Dispatcher = require('./dispatcher');

var ViewStateStore = new Store({
  initialize: function() {
    this.view = 'manuscript:list';
  },

  dispatches: {
    'manuscript:edit': function(manuscriptId) {
      this.view = 'manuscript:edit';
      this.manuscriptId = manuscriptId;
      this.trigger();
    },
    'manuscript:list': function() {
      this.view = 'manuscript:list';
      this.trigger();
    }
  }
});

module.exports = ViewStateStore;
