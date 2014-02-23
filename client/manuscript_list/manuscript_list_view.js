
var Marionette = require('backbone.marionette'),
    ToolbarView = require('../list_toolbar/list_toolbar_view'),
    ManuscriptsView = require('../manuscripts/manuscripts_view');

module.exports = Marionette.ItemView.extend({
  className: 'list ui-scrollable',
  initialize: function(options) {
    this.views = {};
    this.views.toolbar = new ToolbarView();
    this.views.manuscripts = new ManuscriptsView({
      collection: this.collection
    });

    this.listenTo(this.views.manuscripts, 'itemview:manuscript:edit', this.editMan);
    this.listenTo(this.views.toolbar, 'manuscript:new', this.newMan);
  },
  render: function() {
    this.$el.empty();
    this.views.toolbar.render();
    this.views.manuscripts.render();
    this.$el.append(this.views.toolbar.$el);
    this.$el.append(this.views.manuscripts.$el);
  },
  onBeforeClose: function() {
    this.views.toolbar.close();
    this.views.manuscripts.close();
  },

  editMan: function(view, manuscript) {
    this.trigger('manuscript:edit', manuscript);
  },
  newMan: function() {
    this.trigger('manuscript:new');
  }
});
