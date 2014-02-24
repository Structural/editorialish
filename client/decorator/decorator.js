var _ = require('underscore');

var fragmentDecorator = function(fn) {
  return function(children) {
    return fn(_.map(children, decorate));
  };
};

var fragmentSpan = function(fragmentType, content) {
  var span = ['span', {class: 'fragment ' + fragmentType}];
  if (content) {
    span.push(content);
  }
  return span;
}

var fragmentSpanify = function(fragmentType) {
  return function(children) {
    Array.prototype.splice.apply(
      children, _.flatten([0, 0, fragmentSpan(fragmentType)]));
  };
};

var decorateMarkdown = fragmentDecorator(function(children) {
  children.splice(0, 0, 'html');
  return children;
});

var decorateParagraph = fragmentDecorator(function(children) {
  fragmentSpanify('p')(children);
  return children;
});

var decorateEm = fragmentDecorator(function(children) {
  var asterisk = fragmentSpan('markdown', '*');
  children.push(_.clone(asterisk));
  children.splice(0, 0, _.clone(asterisk));
  fragmentSpanify('em')(children);
  return children;
});

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
