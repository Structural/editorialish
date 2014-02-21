var Marionette = require('backbone.marionette');

module.exports = Marionette.Layout.extend({
  template: '#layout-template',
  regions: {
    header: '.edi-header',
    main: '.edi-main'
  }
});
