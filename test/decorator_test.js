var should = require('should'),
    decorator = require('../client/decorator/decorator');

suite('Decorator');

test('string', function() {
  decorator.decorate('words').should.eql('words');
});

test('markdown', function() {
  decorator.fragments.decorateMarkdown(['text']).should
    .eql(['html', 'text']);
});

test('paragraph', function() {
  decorator.fragments.decorateParagraph(['text']).should
    .eql(['span', {class: 'fragment p'}, 'text']);
});

test('emphasis', function() {
  decorator.fragments.decorateEm(['text']).should
    .eql(['span', {class: 'fragment em'},
           ['span', {class: 'fragment markdown'}, '*'],
           'text',
           ['span', {class: 'fragment markdown'}, '*']]);
});

test('strong', function() {
  decorator.fragments.decorateStrong(['text']).should
    .eql(['span', {class: 'fragment strong'},
           ['span', {class: 'fragment markdown'}, '**'],
           'text',
           ['span', {class: 'fragment markdown'}, '**']]);
});

test('a small parsed paragraph', function() {
  var tree = [
    'markdown',
    [ 'para',
      'text',
      ['em', 'italic'],
      'text'
    ]
  ]
  decorator.decorate(tree).should
    .eql([
      'html',
      [ 'span',
        {class: 'fragment p'},
        'text',
        [ 'span',
          {class: 'fragment em'},
          [ 'span',
            {class: 'fragment markdown'},
            '*'
          ],
          'italic',
          [ 'span',
            {class: 'fragment markdown'},
            '*'
          ]
        ],
        'text'
      ]
    ]);
});
