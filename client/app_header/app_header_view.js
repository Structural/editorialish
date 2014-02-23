var Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView.extend({
  getTemplate: function() {
    if (this._state === 'list') {
      return '#app-header-template-list';
    } else {
      return '#app-header-template-editor';
    }
  },
  className: 'app-header',
  events: {
    'click .app-header-list-link': 'showList'
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
