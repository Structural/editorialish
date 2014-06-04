var Store = require('./store');
var Firebase = require('firebase-client');
var FirebaseSimpleLogin = require('firebase-simple-login');

var UserStore = new Store({
  initialize: function() {
    this.user = undefined;

    this.firebase = new Firebase('https://editorialish.firebaseio.com');
    this.auth = new FirebaseSimpleLogin(this.firebase, function(error, user) {
      if (!error && user) {
        this.user = user;
        this.trigger();
      }
    }.bind(this));
  },

  dispatches: {
    'user:login': function() {
      this.auth.login('github', {
        rememberMe: true
      });
    }
  }
});

module.exports = UserStore;
