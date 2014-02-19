var mongoose = require('mongoose');

exports.noteSchema = new mongoose.Schema({
  highlightedText: String,
  text: String,
  startPos: Number,
  endPos: Number
});

exports.Note = mongoose.model('Note', exports.noteSchema);
