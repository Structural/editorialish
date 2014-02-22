var express = require('express'),
    logfmt = require('logfmt'),
    api = require('./controllers/api'),
    path = require('path'),
    staticDir = path.join(__dirname, '..', 'dist');

var editorialish = express();

editorialish.configure(function() {
  editorialish.use(logfmt.requestLogger());
  editorialish.use(express.bodyParser());
  editorialish.use(express.methodOverride());
  editorialish.use(editorialish.router);
  editorialish.use(express.static(staticDir));
  editorialish.use(express.errorHandler(
    { dumpExceptions: true, showStack: true }));
});

editorialish.get('/document/:id', function(req, res) {
  res.sendfile(path.join(staticDir, 'index.html'));
});

editorialish.get('/api/manuscripts', api.index);
editorialish.post('/api/manuscripts', api.create);
editorialish.get('/api/manuscripts/:id', api.show);
editorialish.put('/api/manuscripts/:id', api.update);
editorialish.delete('/api/manuscripts/:id', api.destroy);

var port = Number(process.env.PORT || 3000);
editorialish.listen(port, function() {
  logfmt.log({port: port});
});
