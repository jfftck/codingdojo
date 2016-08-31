'use strict';
// No magic values!!!
const MONGOOSE_CONNECTION = 'localhost/dogs';
const PORT_NUMBER = 8000;

// Require modules
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Create Express app
var app = express();

// Setup express usages
app.use(bodyParser.urlencoded({ exteneded: true }));
app.use(express.static(path.join(__dirname, 'static')));

// Setup views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Connect to Mongo using mongoose
mongoose.connect('mongodb://' + MONGOOSE_CONNECTION);

// Routes
app.get('/', function(request, response) {

});

// Start server
var listener = app.listen(PORT_NUMBER, function() {
    console.log('listening on port: %d', listener.address().port);
});
