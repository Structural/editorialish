var mongoose = require('mongoose'),
    note = require('./note');

exports.manuscriptSchema = new mongoose.Schema({
  title: String,
  text: String,
  notes: [note.noteSchema]
});

exports.Manuscript = mongoose.model('Manuscript', exports.manuscriptSchema);
