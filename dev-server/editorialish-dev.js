var fs = require('fs'),
    express = require('express');

var editorialishDev = express();
editorialishDev.use(express.static('dist'));
editorialishDev.get(/.*/, function(req, res) {
  // For some reason res.sendFile doesn't exist (thanks, express).
  fs.readFile('dist/404.html', function(err, data) {
    res.end(data);
  });
});
editorialishDev.listen(3000);
