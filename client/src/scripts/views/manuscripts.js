var Marionette = require('backbone.marionette'),
    ManuscriptView = require('./manuscript');

var ManuscriptsView = Marionette.CollectionView.extend({
  itemView: ManuscriptView
});

module.exports = ManuscriptsView;
