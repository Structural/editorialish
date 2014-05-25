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
    'click': 'editManuscript'
  },

  deleteManuscript: function(e) {
    this.model.destroy();
  },

  editManuscript: function() {
    this.trigger('manuscript:edit', this.model);
  }
});

module.exports = ManuscriptView;
