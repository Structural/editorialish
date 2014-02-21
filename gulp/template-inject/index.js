/* Rather hacky.  Specific to our use case.  Not for wide distribution. */

var _ = require('underscore'),
    gutil = require('gulp-util'),
    es = require('event-stream');

module.exports = function(templateStr, variable) {
  var template = _.template(new String(templateStr));
  return es.map(function(file, cb) {
    var data = {};
    data[variable] = file.contents;
    file.contents = new Buffer(template(data));
    cb(null, file);
  });
}
