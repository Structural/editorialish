var Manuscripts = require('./collections/manuscripts');

var mans = new Manuscripts([]);
mans.fetch({
  success: function(collection) {
    console.log(collection);
  }
});
