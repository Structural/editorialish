var mongoose = require('mongoose');

var manuscriptSchema = new mongoose.Schema({
  title: String,
  text: String
});

exports.Manuscript = mongoose.model('Manuscript', manuscriptSchema);
