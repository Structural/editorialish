var Firebase = require('firebase-client'),
    FirebaseSimpleLogin = require('firebase-simple-login');

var Store = require('./store'),
    Environment = require('../environment');

var UserStore = new Store({
  name: 'User',
  initialize: function() {
    this.user = undefined;
    this.error = undefined;

    this.firebase = new Firebase(Environment.FirebaseRootUrl);
    this.auth = new FirebaseSimpleLogin(this.firebase, function(error, user) {
      this.error = error;
      this.user = user;
      this.trigger();
    }.bind(this));
  },

  login: function(){
    this.auth.login('github', {
       rememberMe: true
    });
  },

  logout: function(){
    this.auth.logout();
  },

  dispatches: {
    'user:login': function() {this.login();},
    'user:logout': function() {this.logout();}
  }
});

module.exports = UserStore;
