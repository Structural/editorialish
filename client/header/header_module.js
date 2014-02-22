var HeaderView = require('./header_view');

module.exports = function(region) {
  return function(HeaderModule, Editorialish, Backbone, Marionette, $, _) {
    var view = new HeaderView();

    HeaderModule.addInitializer(function() {
      region.show(view);
    });

    HeaderModule.listenTo(view, 'showlist', function() {
      this.trigger('showlist');
    });
  };
};
