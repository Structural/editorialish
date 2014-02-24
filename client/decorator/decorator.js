var _ = require('underscore');

/* Utilities */

var fragmentSpan = function(fragmentType, content) {
  var span = ['span', {class: 'fragment ' + fragmentType}];
  if (content) {
    span.push(content);
  }
  return span;
};

/* Decorator Steps */

var fragmentDecorator = function() {
  var fns = Array.prototype.slice.call(arguments);
  return function(children) {
    children = _.map(children, decorate);
    children = _.reduce(fns, function(kids, fn) {
      return fn(kids);
    }, children);
    return children;
  };
};

var prefix = function(fragment) {
  return function(children) {
    children.splice(0, 0, fragment);
    return children;
  };
};

var fragmentSpanify = function(fragmentType) {
  return function(children) {
    Array.prototype.splice.apply(
      children, _.flatten([0, 0, fragmentSpan(fragmentType)]));
    return children;
  };
};

var surround = function(fragment) {
  return function(children) {
    children.push(_.clone(fragment));
    children.splice(0, 0, fragment);
    return children;
  };
};

/* Decorators */

var decorateMarkdown = fragmentDecorator(
  prefix('html')
);

var decorateParagraph = fragmentDecorator(
  fragmentSpanify('p')
);

var decorateEm = fragmentDecorator(
  surround(fragmentSpan('markdown', '*')),
  fragmentSpanify('em')
);

var decorators = {
  markdown: decorateMarkdown,
  para: decorateParagraph,
  em: decorateEm
};

var decorate = function(node) {
  if (_.isString(node)) {
    return node;
  } else if (_.isArray(node)) {
    var type = node[0];
    var fn = decorators[type];
    return fn(node.slice(1));
  } else {
    return '';
  }
};

module.exports = {
  decorate: decorate,
  // These shouldn't really be used by the rest of the app, but we're exporting
  // them for unit testing.
  fragments: {
    decorateMarkdown: decorateMarkdown,
    decorateParagraph: decorateParagraph,
    decorateEm: decorateEm
  }
};
