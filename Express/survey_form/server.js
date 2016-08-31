'use strict';

var express = require('express');
var bodyparser = require('body-parser');
var ejs = require('ejs');
var path = require('path');

var app = express();

app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'static')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
    response.render('index');
});

app.post('/result', function(request, response) {
    response.render('result', request.body);
})

var listener = app.listen(8000, function() {
    console.log('Listening on port: ' + listener.address().port);
})
