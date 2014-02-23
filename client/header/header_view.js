var Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView.extend({
  template: '#app-header-template-list',
  className: 'hed',
  events: {
    'click .hed-logo': 'showList'
  },

  showList: function() {
    this.trigger('showlist');
  }
});
