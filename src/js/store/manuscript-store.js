var _ = require('underscore'),
    Firebase = require('firebase-client');

var Store = require('./store'),
    Environment = require('../environment');

var manuscriptsRootUrl = Environment.FirebaseRootUrl + '/manuscripts';

var ManuscriptStore = new Store({
  name: 'Manuscript',
  initialize: function() {
    this.manuscripts = {};
    this.firebase = new Firebase(manuscriptsRootUrl);
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
      // Let Firebase's "value" event run trigger (above).
    },
    'manuscript:delete': function(id) {
      var manuscriptFirebase = this.firebase.child(id);
      manuscriptFirebase.remove();
      // Let Firebase's "value" event run trigger (above).
    }
  }
});

module.exports = ManuscriptStore;
