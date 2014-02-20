var _ = require('underscore'),
    mongoose = require('mongoose'),
    logfmt = require('logfmt'),
    models = require('../models');

mongoose.connect('mongodb://localhost/editorialish');

exports.index = function(req, res) {
  models.Manuscript.find({}, function(err, manuscripts) {
    if (!err) {
      return res.send(manuscripts);
    } else {
      return logfmt.log(err);
    }
  })
};

exports.create = function(req, res) {
  var manuscript = new models.Manuscript(req.body);
  manuscript.save(function(err) {
    if (!err) {
      return res.send(manuscript);
    } else {
      return logfmt.log(err);
    }
  })
};

exports.update = function(req, res) {
  return models.Manuscript.findById(req.params.id, function(err, manuscript) {
    if (manuscript) {
      manuscript = _.extend(manuscript, req.body);
      return manuscript.save(function(err) {
        if (!err) {
          return res.send(manuscript);
        } else {
          return logfmt.log(err);
        }
      })
    } else if (err) {
      return logfmt.log(err);
    } else {
      return logfmt.log({
        msg: 'No Manuscript with id',
        id: req.params.id
      })
    }
  })
};
