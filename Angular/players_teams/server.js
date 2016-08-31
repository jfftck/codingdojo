'use strict';

const ROOT     = __dirname,
      PORT     = process.env.PORT || 8000;

var express  = require('express'),
    path     = require('path'),
    app      = express();


app.use(express.static(path.join(ROOT, 'client')));
app.use(express.static(path.join(ROOT, 'bower_components')));


app.listen(PORT, function() {
  console.log('server running on port %d', PORT);
});
