var Marionette = require('backbone.marionette');

module.exports = Marionette.Layout.extend({
  template: '#layout-template',
  regions: {
    header: '.editorialish-header',
    main: '.editorialish-main'
  }
});
