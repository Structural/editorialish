var Firebase = require('firebase-client'),
    _ = require('underscore');

var Store = require('./store'),
    Environment = require('../environment');

var FoldersStore = new Store({
  initialize: function() {
    this.folders = {};
    this.activeFolder = undefined;
    this.userId = undefined;
    this.userDisplayName = undefined;
  },

  refresh: function(){
    this.userId = UserStore.user.uid;
    this.userDisplayName = UserStore.user.displayName;
    this.userFoldersRef = new Firebase(Environment.FirebaseRootUrl)
      .child('users')
      .child(this.userId)
      .child('folders');
    this.userFoldersRef.on('value', function(snapshot) {
      this.folders = snapshot.val();
      if (!this.activeFolder) {
        this.activeFolder = _.keys(this.folders)[0];
      }
      this.trigger();
    }, this);
  },

  create: function(){
    userId = this.userId;
    userDisplayName = this.userDisplayName;
    newFolder = {
      "name": "New Folder",
      "participants": {}
    };
    newFolder.participants[userId] = userDisplayName;

    globalFoldersRef = new Firebase(Environment.FirebaseRootUrl)
      .child('folders');
    globalFolderRef = globalFoldersRef.push(newFolder);
    name = globalFolderRef.name();
    console.log(name);
    var newUserFolder = {};
    newUserFolder[name] = newFolder;
    this.userFoldersRef.update(newUserFolder)

  },

  selectFolder: function(id){
    this.activeFolder = id;
    this.trigger();
  },

  dispatches: {
    "folders:select": function(id){ this.selectFolder(id);},
    "folders:create": function(){ this.create();},
    "folders:refresh": function(){ this.refresh();}
  }
});

module.exports = FoldersStore;
