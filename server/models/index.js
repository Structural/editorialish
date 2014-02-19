var _ = require('underscore'),
    manuscript = require('./manuscript'),
    note = require('./note');

var noLeadingUnderscore = function(s) {
  return s[0] !== '_';
};

var exportedKeys = function(keys) {
  return keys.filter(noLeadingUnderscore);
};

var exportedObject = function(obj) {
  return _.pick(obj, exportedKeys(_.keys(obj)));
}

_.extend(exports,
         exportedObject(manuscript),
         exportedObject(note));
