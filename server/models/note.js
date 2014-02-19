var mongoose = require('mongoose');

exports._noteSchema = new mongoose.Schema({
  highlightedText: String,
  text: String,
  startPos: Number,
  endPos: Number
});

exports.Note = mongoose.model('Note', exports._noteSchema);
