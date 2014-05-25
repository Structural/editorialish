var Marionette = require('backbone.marionette'),
    ManuscriptView = require('../manuscript/manuscript_view');

var ManuscriptsView = Marionette.CollectionView.extend({
  itemView: ManuscriptView,
  tagName: 'ul',
  className: 'manuscripts'
});

module.exports = ManuscriptsView;
