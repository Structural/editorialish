/** @jsx React.DOM */

var React = require('react');

var Button = require('../shared/button');

var FourOhFourPage = React.createClass({
  render: function() {
    return (
      <div className="four-oh-four-page">
        Oh, wow.  There's nothing here at all.  That's, uh, wow.  Our bad.
        Maybe you should go to the
        <Button action="manuscript:list" content="home page" />
      </div>
    );
  }
});

module.exports = FourOhFourPage;
