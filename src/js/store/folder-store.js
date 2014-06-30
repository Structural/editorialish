var Firebase = require('firebase-client');

var Store = require('./store'),
    Environment = require('../environment');

var FolderStore = new Store({
  initialize: function() {
    this.folders = {};
    this.firebase = new Firebase(Environment.FirebaseRootUrl).child('folders');
    this.firebase.on('value', function(snapshot) {
      this.folders = snapshot.val();
      this.trigger();
    }, this);
  },

  dispatches: {

  }
});

module.exports = FolderStore;
