var _ = require('underscore'),
    mongoose = require('mongoose'),
    logfmt = require('logfmt'),
    models = require('../models');

mongoose.connect('mongodb://localhost/editorialish');

var handleError = function(action, err, res, status) {
  status = status || 500;
  logfmt.log({
    error: err.message,
    action: action,
    stack: err.stack
  });
  res.send(status, {});
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

var findByIdAndDo = function(action, model, id, res, fn) {
  model.findById(id, function(err, result) {
    if (result) {
      fn(result);
    } else if (err) {
      handleError(action, err, res);
    } else {
      err = {
        message: 'No document with id ' + id,
        stack: ''
      };
      handleError(action, err, res, 404);
    }
  });
};

exports.index = function(req, res) {
  models.Manuscript.find({}, sendOrError('manuscripts#index', 1, res));
};

exports.create = function(req, res) {
  var manuscript = new models.Manuscript(req.body);
  manuscript.save(sendOrError('manuscripts#create', manuscript, res));
};

exports.show = function(req, res) {
  findByIdAndDo('manuscripts#show', models.Manuscript, req.params.id, res,
    function(manuscript) {
      res.send(manuscript);
    });
};

exports.update = function(req, res) {
  findByIdAndDo('manuscripts#update', models.Manuscript, req.params.id, res,
    function(manuscript) {
      manuscript = _.extend(manuscript, req.body);
      manuscript.save(sendOrError('manuscripts#update', manuscript, res));
    });
};
