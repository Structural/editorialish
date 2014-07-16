var Firebase = require('firebase-client'),
    FirebaseSimpleLogin = require('firebase-simple-login');

var Store = require('./store'),
    Environment = require('../environment'),
    Dispatcher = require('../dispatcher/dispatcher');

var UserStore = new Store({
  name: 'User',
  initialize: function() {
    this.user = undefined;
    this.error = undefined;

    this.firebase = new Firebase(Environment.FirebaseRootUrl);
    this.auth = new FirebaseSimpleLogin(this.firebase, function(error, user) {
      this.error = error;
      this.user = user;

      if (this.user) {
        Dispatcher.send('user:available', [this.user]);
      }
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
    'user:login': 'login',
    'user:logout': 'logout'
  }
});

module.exports = UserStore;
