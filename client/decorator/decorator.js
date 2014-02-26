var _ = require('underscore');

/* Utilities */

var fragmentSpan = function(fragmentType, content) {
  var klass = 'fragment';
  if (fragmentType) {
    klass += ' ' + fragmentType;
  }
  var span = ['span', {class: klass}];
  if (content) {
    span.push(content);
  }
  return span;
};

var nStrs = function(n, s) {
  return _.range(n).map(function() { return s; }).join('');
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
  surround(fragmentSpan('markdown markdown-em', '*')),
  fragmentSpanify('em')
);

var decorateStrong = fragmentDecorator(
  surround(fragmentSpan('markdown markdown-strong', '**')),
  fragmentSpanify('strong')
);

var decorateHeader = function(optionsAndChildren) {
  var options = optionsAndChildren[0];
  var children = optionsAndChildren.slice(1);

  return fragmentDecorator(
    prefix(fragmentSpan('markdown markdown-header',
                        nStrs(options.level, '#') + ' ')),
    fragmentSpanify('h' + options.level)
  )(children);
};

var decorateLink = function(optionsAndChildren) {
  var options = optionsAndChildren[0];
  var children = optionsAndChildren.slice(1);

  var linkText = fragmentSpanify()(children);
  return fragmentSpanify('a')([
    fragmentSpan('markdown markdown-bracket', '['),
    linkText,
    fragmentSpan('markdown markdown-bracket', ']'),
    fragmentSpan('markdown markdown-paren', '('),
    fragmentSpan('markdown markdown-href', options.href),
    fragmentSpan('markdown markdown-paren', ')')
  ]);
};

var decorators = {
  markdown: decorateMarkdown,
  para: decorateParagraph,
  em: decorateEm,
  strong: decorateStrong,
  header: decorateHeader,
  link: decorateLink
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
    decorateEm: decorateEm,
    decorateStrong: decorateStrong,
    decorateHeader: decorateHeader,
    decorateLink: decorateLink
  }
};
