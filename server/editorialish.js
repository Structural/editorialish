var express = require('express');

var editorialish = express();

editorialish.configure(function() {
  editorialish.use(express.bodyParser());
  editorialish.use(express.methodOverride());
  editorialish.use(editorialish.router);
  editorialish.use(express.errorHandler(
    { dumpExceptions: true, showStack: true }));
});

editorialish.get('/', function(req, res) {
  res.send('Hello, world');
});

var port = Number(process.env.PORT || 3000);
editorialish.listen(port, function() {
  console.log('Listening on', port);
});
