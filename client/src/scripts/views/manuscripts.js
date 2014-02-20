var Marionette = require('backbone.marionette'),
    ManuscriptView = require('./manuscript');

var ManuscriptsView = Marionette.CollectionView.extend({
  itemView: ManuscriptView,
  tagName: 'ul',
  className: 'mans'
});

module.exports = ManuscriptsView;
