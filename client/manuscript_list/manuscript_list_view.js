var Marionette = require('backbone.marionette'),
    ToolbarView = require('../list_toolbar/list_toolbar_view'),
    ManuscriptsView = require('../manuscripts/manuscripts_view');

module.exports = Marionette.ItemView.extend({
  className: 'list',
  initialize: function(options) {
    this.views = {};
    this.views.toolbar = new ToolbarView();
    this.views.manuscripts = new ManuscriptsView({
      collection: this.collection
    });

    this.listenTo(this.views.manuscripts, 'itemview:editman', this.editMan);
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
    this.trigger('editman', manuscript);
  }
});
