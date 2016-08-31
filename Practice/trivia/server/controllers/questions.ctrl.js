'use strict';

var logger = require('./../../logger/logger');
const DEBUG = logger.levels.DEBUG;
const WARN = logger.levels.WARN;
var log = logger.Logger().log;

log('Loading questions controller', DEBUG);

var mongoose = require('mongoose');

exports = module.exports = new QuestionsController();

function QuestionsController() {
    var ctrl = this;
    var Questions = mongoose.model('questions');

    this.create = createQuestion;
    this.index = questionsIndex;

    function createQuestion(request, response) {
        var question = new Questions(request.body.question);

        question.save((err) => {
            if (err) {
                response.status(403).json({error: err});
            } else {
                response.json({question: question});
            }
        });
    }

    function questionsIndex(request, response) {
        Questions.find({}, (err, questions) => {
            if (err) {
                response.status(403).json({error: err});
            } else {
                response.json({questions: questions});
            }
        });
    }
}
