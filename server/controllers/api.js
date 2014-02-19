var mongoose = require('mongoose'),
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
}
