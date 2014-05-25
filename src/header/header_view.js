var Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView.extend({
  getTemplate: function() {
    if (this._state === 'list') {
      return '#app-header-template-list';
    } else {
      return '#app-header-template-editor';
    }
  },
  className: 'hed',
  events: {
    'click .hed-logo': 'showList'
  },
  initialize: function(options) {
    this._state = 'list';
  },

  showList: function() {
    this.trigger('showlist');
  },

  showListHeader: function() {
    this._state = 'list';
    this.render();
  },
  showEditorHeader: function() {
    this._state = 'editor';
    this.render();
  }
});
