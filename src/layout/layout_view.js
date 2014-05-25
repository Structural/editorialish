var Marionette = require('backbone.marionette');

module.exports = Marionette.Layout.extend({
  template: '#layout-template',
  regions: {
    toaster: '.editorialish-toaster',
    header: '.editorialish-header',
    main: '.editorialish-main'
  }
});
