var _ = require('underscore'),
    Firebase = require('firebase-client'),
    Store = require('./store'),
    Dispatcher = require('./dispatcher');

var ManuscriptStore = new Store({
  initialize: function() {
    this.firebase = new Firebase('https://editorialish.firebaseio.com/manuscripts');
    this.firebase.on('value', function(snapshot) {
      this.manuscripts = snapshot.val();
      this.trigger();
    }, this)
  },

  dispatches: {
    'manuscript:create': function() {
      this.firebase.push({
        title: 'New Document',
        text: '',
        comments: []
      });
    },
    'manuscript:localUpdate': function(id, changes) {
      var manuscript = this.manuscripts[id];
      _.extend(manuscript, changes);
      this.trigger();
    },
    'manuscript:save': function(id) {
      var manuscript = this.manuscripts[id];
      update = {};
      update[id] = manuscript;
      this.firebase.update(update);
      // Let Firebase's "value" event run trigger (above);
    }
  }
});

module.exports = ManuscriptStore;
