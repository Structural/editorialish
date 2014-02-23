var should = require('should'),
    decorator = require('../client/decorator/decorator');

suite('Decorator');

test('decorating a string', function() {
  (decorator.decorate('words')).should.eql('words');
});

test('decorating markdown', function() {
  (decorator.fragments.decorateMarkdown(['text'])).should
    .eql(['html', 'text']);
});
