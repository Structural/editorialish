var Firebase = require('firebase-client'),
    _ = require('underscore');

var Store = require('./store'),
    Environment = require('../environment');

var FoldersStore = new Store({
  name: 'Folder',
  initialize: function() {
    this.folders = {};
    this.activeFolder = undefined;
    this.userId = undefined;
    this.userDisplayName = undefined;
    this.userFolderListRef = undefined;
    this.globalFolderListRef = new Firebase(Environment.FirebaseRootUrl)
                                   .child('folders');
  },

  create: function(name ) {
    var newFolder = {
      "name": name,
      "participants": {}
    };
    newFolder.participants[this.userId] = this.userDisplayName;

    var globalFolderRef = this.globalFolderListRef.push(newFolder);
    var folderId = globalFolderRef.name();

    var newUserFolder = {};
    newUserFolder[folderId] = newFolder;
    this.userFolderListRef.update(newUserFolder)
  },

  selectFolder: function(id) {
    this.activeFolder = id;
    this.trigger();
  },

  dispatches: {
    'folders:select': 'selectFolder',
    'folders:create': 'create',
    'user:available': function(user) {
      this.userId = user.uid;
      this.userDisplayName = user.displayName;
      this.userFolderListRef = new Firebase(Environment.FirebaseRootUrl)
                                   .child('users')
                                   .child(this.userId)
                                   .child('folders');
      this.userFolderListRef.on('value', function(snapshot) {
        this.folders = snapshot.val();
        if (!this.activeFolder) {
          this.activeFolder = _.keys(this.folders)[0];
        }
        this.trigger();
      }, this)
    }
  }
});

module.exports = FoldersStore;
