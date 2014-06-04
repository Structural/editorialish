var Store = require('./store');
var Firebase = require('firebase-client');
var FirebaseSimpleLogin = require('firebase-simple-login');

var UserStore = new Store({
  initialize: function() {
    this.user = undefined;

    var firebase = new Firebase('https://editorialish.firebaseio.com');
    var auth = new FirebaseSimpleLogin(firebase, function(error, user) {
      if (!error && user) {
        this.user = user;
        this.trigger();
      }
    });
  },

  dispatches: {

  }
});

module.exports = UserStore;
