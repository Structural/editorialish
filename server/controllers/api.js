var _ = require('underscore'),
    mongoose = require('mongoose'),
    logfmt = require('logfmt'),
    models = require('../models');

mongoose.connect('mongodb://localhost/editorialish');

var handleError = function(action, err, res) {
  logfmt.log({
    error: err.message,
    action: action,
    stack: err.stack
  });
  res.send(500, {});
};

var sendOrError = function(action, obj, res) {
  return function() {
    var err = arguments[0];
    if (err) {
      handleError(action, err, res);
    } else {
      var data = _.isNumber(obj) ? arguments[obj] : obj;
      res.send(data);
    }
  };
};

exports.index = function(req, res) {
  models.Manuscript.find({}, sendOrError('manuscripts#index', 1, res));
};

exports.create = function(req, res) {
  var manuscript = new models.Manuscript(req.body);
  manuscript.save(sendOrError('manuscripts#create', manuscript, res));
};

exports.update = function(req, res) {
  return models.Manuscript.findById(req.params.id, function(err, manuscript) {
    if (manuscript) {
      manuscript = _.extend(manuscript, req.body);
      manuscript.save(sendOrError('manuscripts#update', manuscript, res));
    } else if (err) {
      handleError('manuscripts#update', err, res);
    } else {
      err = {
        message: 'No manuscript with id ' + req.params.id;
        stack: ''
      };
      handleError('manuscripts#update', err, res);
    }
  })
};
