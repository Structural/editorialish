/** @jsx React.DOM */

var React = require('react');

var Credits = React.createClass({
  render: function() {
    return (
      <div className="credits">
        <div>Editorially is dead, long live Editorially</div>
        <div>A Lubelski and Kermes joint</div>
        <div>
          Pen favicon by Simple Icons, from
          <a href="http://thenounproject.com/term/pen/31089/">
            The Noun Project
          </a>
        </div>
      </div>
    );
  }
});

module.exports = Credits;
