var express = require('express'),
    logfmt = require('logfmt'),
    api = require('./controllers/api');

var editorialish = express();

editorialish.configure(function() {
  editorialish.use(logfmt.requestLogger());
  editorialish.use(express.bodyParser());
  editorialish.use(express.methodOverride());
  editorialish.use(editorialish.router);
  editorialish.use(express.static(__dirname + '/../client/public'));
  editorialish.use(express.errorHandler(
    { dumpExceptions: true, showStack: true }));
});

editorialish.get('/api/documents', api.index);
editorialish.post('/api/documents', api.create);

var port = Number(process.env.PORT || 3000);
editorialish.listen(port, function() {
  logfmt.log({'port': port});
});
