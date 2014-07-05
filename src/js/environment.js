/* These are variables and things that change depending on where you're
   running the app (dev vs prod environments, etc). */

var Environment = {
  FirebaseRootUrl: 'https://$FIREBASE_APP.firebaseio.com',
  DevMode: $DEV_MODE
}

module.exports = Environment;
