var Marionette = require('backbone.marionette');

module.exports = Marionette.AppRouter.extend({
  appRoutes: {
    '': 'showList',
    'document/:id': 'showManuscript'
  },
  rootRoute: function() {
    return '/';
  },
  manuscriptRoute: function(id) {
    return '/document/' + id;
  }
});
