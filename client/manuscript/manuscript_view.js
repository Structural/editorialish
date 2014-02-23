var Marionette = require('backbone.marionette');

var ManuscriptView = Marionette.ItemView.extend({
  template: '#manuscript-template',
  tagName: 'li',
  className: 'manuscript',
  ui: {
    deleteButton: '.man-delete'
  },
  events: {
    'click @ui.deleteButton': 'deleteManuscript',
    'click': 'editMan'
  },

  deleteManuscript: function(e) {
    this.model.destroy();
  },

  editMan: function() {
    this.trigger('editman', this.model);
  }
});

module.exports = ManuscriptView;
