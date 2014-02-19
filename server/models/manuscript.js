var mongoose = require('mongoose'),
    note = require('./note');

exports._manuscriptSchema = new mongoose.Schema({
  title: String,
  text: String,
  notes: [note._noteSchema]
});

exports.Manuscript = mongoose.model('Manuscript', exports._manuscriptSchema);
