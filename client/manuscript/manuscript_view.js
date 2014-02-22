var Marionette = require('backbone.marionette');

var ManuscriptView = Marionette.ItemView.extend({
  template: '#manuscript-template',
  tagName: 'li',
  className: 'manuscript',
  events: {
    'click': 'editMan'
  },

  editMan: function() {
    this.trigger('editman', this.model);
  }
});

module.exports = ManuscriptView;
