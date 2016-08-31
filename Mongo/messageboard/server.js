'use strict';
// Setup messageboard app.
const PORT_NUMBER = 8000;
const MONGOOSE_CONNECTION = 'localhost/messageboard';

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var logger = require('./logger');

var app = express();

// Setup a proper logger and pass the constants to shorten the code.
var DEBUG = logger.levels.DEBUG;
var WARN = logger.levels.WARN;
var CRITICAL = logger.levels.CRITICAL;
var log = logger.Logger(DEBUG).log;

var Schema = mongoose.Schema;

app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://' + MONGOOSE_CONNECTION);

// Schemas /Each should be in it's own module./
var PostSchema = Schema({
    name: {type: String, minLength: 4, required: true},
    message: {type: String, minLength: 1, required: true},
    comments: [{type: Schema.Types.ObjectId, ref: 'comment'}]
});

var CommentSchema = Schema({
    _post: {type: Schema.Types.ObjectId, ref: 'post'},
    name: {type: String, minLength: 4, required: true},
    message: {type: String, minLength: 1, required: true}
});

var Post = mongoose.model('post', PostSchema);
var Comment = mongoose.model('comment', CommentSchema);

app.get('/', (request, response) => {
    Post.find().populate('comments').exec((postsError, post) => {
        if (postsError) {
            log(postsError, WARN);
        }

        log(post, DEBUG);

        response.render('index', {posts: post});
    });
});

app.post('/new', (request, response) => {
    var post = new Post();

    post.name = request.body.name;
    post.message = request.body.message;
    post.save((postError) => {
        if (postError) {
            log(err, WARN);
        }
    });

    response.redirect('/');
});

app.post('/post/:id', (request, response) => {
    Post.findById(request.params.id, (err, post) => {
        var comment = new Comment();

        log(['name', request.body.name], DEBUG);
        log(['comment', request.body.comment], DEBUG);

        comment.name = request.body.name;
        comment.message = request.body.comment;
        comment._post = post._id;

        comment.save((commentError) => {
            if (commentError) {
                log(['Comments Save Error:', commentError], WARN);
                return;
            }

            post.comments.push(comment);

            post.save((postError) => {
                if (postError) {
                    log(postError, WARN);
                }
            });

            log(post, DEBUG);
        });
    });

    response.redirect('/');
});

var listener = app.listen(PORT_NUMBER, () => {
    log('Listening on port: ' + listener.address().port);
});
