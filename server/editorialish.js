var express = require('express'),
    logfmt = require('logfmt');

var editorialish = express();

editorialish.configure(function() {
  editorialish.use(logfmt.requestLogger());
  editorialish.use(express.bodyParser());
  editorialish.use(express.methodOverride());
  editorialish.use(express.static(__dirname + '/../client/public'));
  editorialish.use(editorialish.router);
  editorialish.use(express.errorHandler(
    { dumpExceptions: true, showStack: true }));
});

editorialish.get('/', function(req, res) {
  res.send('Hello, world');
});

var port = Number(process.env.PORT || 3000);
editorialish.listen(port, function() {
  logfmt.log({'port': port});
});
