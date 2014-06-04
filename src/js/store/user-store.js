var Store = require('./store');
var Firebase = require('firebase-client');
var FirebaseSimpleLogin = require('firebase-simple-login');

var UserStore = new Store({
  initialize: function() {
    this.user = undefined;
    this.error = undefined;

    this.firebase = new Firebase('https://editorialish.firebaseio.com');
    this.auth = new FirebaseSimpleLogin(this.firebase, function(error, user) {
      this.error = error;
      this.user = user;
      console.log(error, user);
      this.trigger();
    }.bind(this));
  },

  dispatches: {
    'user:login': function() {
      this.auth.login('github', {
        rememberMe: true
      });
    },
    'user:logout': function() {
      this.auth.logout();
    }
  }
});

module.exports = UserStore;
