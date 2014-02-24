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
           ['span', {class: 'fragment markdown markdown-em'}, '*'],
           'text',
           ['span', {class: 'fragment markdown markdown-em'}, '*']]);
});

test('strong', function() {
  decorator.fragments.decorateStrong(['text']).should
    .eql(['span', {class: 'fragment strong'},
           ['span', {class: 'fragment markdown markdown-strong'}, '**'],
           'text',
           ['span', {class: 'fragment markdown markdown-strong'}, '**']]);
});

test('header one', function() {
  decorator.fragments.decorateHeader([{level: 1}, 'text']).should
    .eql(['span', {class: 'fragment h1'},
           ['span', {class: 'fragment markdown markdown-header'}, '# '],
           'text']);
});

test('header two', function() {
  decorator.fragments.decorateHeader([{level: 2}, 'text']).should
    .eql(['span', {class: 'fragment h2'},
           ['span', {class: 'fragment markdown markdown-header'}, '## '],
           'text']);
});

test('header three', function() {
  decorator.fragments.decorateHeader([{level: 3}, 'text']).should
    .eql(['span', {class: 'fragment h3'},
           ['span', {class: 'fragment markdown markdown-header'}, '### '],
           'text']);
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
            {class: 'fragment markdown markdown-em'},
            '*'
          ],
          'italic',
          [ 'span',
            {class: 'fragment markdown markdown-em'},
            '*'
          ]
        ],
        'text'
      ]
    ]);
});
