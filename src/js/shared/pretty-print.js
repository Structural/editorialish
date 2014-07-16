var _ = require('underscore');

var parent = function(obj) {
  return Object.getPrototypeOf(obj);
};

var grandparent = function(obj) {
  return parent(parent(obj));
};

var pprint = function(obj) {
  if (obj === null) {
    return "null";
  } else if (obj === undefined) {
    return "undefined";
  } else if (typeof obj === 'string') {
    return "\"" + obj + "\"";
  } else if (obj instanceof Array) {
    return "[" + _.map(obj, pprint).join(', ') + "]";
  } else if (typeof obj === 'object') {
    if (grandparent(obj) === null) {
      return JSON.stringify(obj, undefined, 2);
    } else {
      // Note - displayName is not standard, but seems to work in
      // FF and Chrome.  Sometimes.  Depending on what objects you're
      // looking at.  Other times it's name.  Which is only standard
      // in ES6.
      var ctor = parent(obj).constructor;
      var name = (ctor.name === undefined || ctor.name === "") ?
                 ctor.displayName :
                 ctor.name;
      return "[object " + name + "]";
    }
  } else {
    return obj.toString();
  }
};

module.exports = pprint;
