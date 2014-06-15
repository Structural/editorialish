/** @jsx React.DOM */

var React = require('react');

var Credits = React.createClass({
  render: function() {
    return (
      <div className="credits">
        <div>An Editorially-ish markdown editor</div>
        <div>A Lubelski and Kermes joint</div>
        <div className='icon'>
          Pen favicon by Simple Icons, from <a href="http://thenounproject.com/term/pen/31089/">
            The Noun Project
          </a>
        </div>
      </div>
    );
  }
});

module.exports = Credits;
