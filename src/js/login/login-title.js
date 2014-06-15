/** @jsx React.DOM */

var React = require('react');

var LoginTitle = React.createClass({
  render: function() {
    return (
      <div className="leader">
        <h1><span className="formatting"># </span>Editorialish</h1>
        <div className='subtitle'><span className="formatting">*</span><i>Editorially</i><span className="formatting">*</span> is dead, long live <span className="formatting">**</span><b>Editorially</b><span className="formatting">**</span></div>
      </div>
    );
  }
});

module.exports = LoginTitle;
