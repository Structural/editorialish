var should = require('should'),
    decorator = require('../client/decorator/decorator');

suite('Decorator');

test('string', function() {
  (decorator.decorate('words')).should.eql('words');
});

test('markdown', function() {
  (decorator.fragments.decorateMarkdown(['text'])).should
    .eql(['html', 'text']);
});
