var Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView.extend({
  template: '#header-template',
  className: 'hed',
  events: {
    'click .hed-logo': 'showList'
  },

  showList: function() {
    this.trigger('showlist');
  }
});
