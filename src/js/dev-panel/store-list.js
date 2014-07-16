/** @jsx React.DOM */

var React = require('react'),
    _ = require('underscore');

var Store = require('../store/store'),
    pprint = require('../shared/pretty-print');

var isDataProperty = function(pair) {
  var name = pair[0], value = pair[1];
  if (_.contains(['initialize', 'dispatches', 'name', '_callbacks'], name)) {
    return false;
  } else if (value instanceof Function) {
    return false;
  } else {
    return true;
  }
};

var StoreList = React.createClass({
  render: function() {
    var stores = _.map(Store.stores, function(store) {
      var properties = _.pairs(store);
      properties = _.filter(properties, isDataProperty);
      properties = _.map(properties, function(pair) {
        var name = pair[0], value = pair[1];
        return (
          <span className="property">
            <span className="property-name">
              {name}
            </span>
            <span className="property-value">
              {pprint(value)}
            </span>
          </span>
        );
      })

      return (
        <div className="store">
          <span className="store-name">
            {store.name}
          </span>
          {properties}
        </div>
      );
    });

    return (
      <div className="stores">
        <span className="title">Stores</span>
        {stores}
      </div>
    );
  }
});

module.exports = StoreList;
