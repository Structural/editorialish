var Firebase = require('firebase-client'),
    _ = require('underscore');

var Store = require('./store'),
    Environment = require('../environment');

var FolderStore = new Store({
  initialize: function() {
    this.folders = {};
    this.activeFolder = undefined;
    this.firebase = new Firebase(Environment.FirebaseRootUrl).child('folders');
    this.firebase.on('value', function(snapshot) {
      this.folders = snapshot.val();
      if (!this.activeFolder) {
        this.activeFolder = _.keys(this.folders)[0];
      }
      this.trigger();
    }, this);
  },

  dispatches: {
    'folder:open': function(id) {
      this.activeFolder = id;
      this.trigger();
    }
  }
});

module.exports = FolderStore;
