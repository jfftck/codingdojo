'use strict';

var logger = require('./../../logger/logger');
const DEBUG = logger.levels.DEBUG;
const WARN = logger.levels.WARN;
var log = logger.Logger().log;

log('Loading surveys controller', DEBUG);

var mongoose = require('mongoose');

exports = module.exports = new SurveysController();

function SurveysController() {
    var ctrl = this;
    var Surveys = mongoose.model('surveys');

    ctrl.create = createSurvey;
    ctrl.delete = deleteSurvey;
    ctrl.index = surveysIndex;
    ctrl.show = showSurvey;
    ctrl.vote = vote;

    function createSurvey(request, response) {
        var survey = new Surveys(request.body);

        survey.save((err) => {
            if (err) {
                response.status(403).json({error: err});
            } else {
                response.json({survey: survey});
            }
        });
    }

    function deleteSurvey(request, response) {
        Surveys.findByIdAndRemove(request.params.id, (err, survey) => {
            if (err) {
                response.status(404).json({error: err});
            } else {
                response.json({survey: survey});
            }
        });
    }

    function showSurvey(request, response) {
        Surveys.findById(request.params.id, (err, survey) => {
            if (err) {
                response.status(404).json({error: err});
            } else {
                response.json({survey: survey});
            }
        });
    }

    function surveysIndex(request, response) {
        Surveys.find({}, (err, surveys) => {
            if (err) {
                response.status(404).json({error: err});
            } else {
                response.json({surveys: surveys});
            }
        });
    }

    function vote(request, response) {
        log(request.params, DEBUG);

        Surveys.findById(request.params.id, (err, survey) => {
            if (err) {
                response.status(403).json({error: err});
            } else {
                var name = request.body.name;

                for (var i = 0; i < survey.options.length; i++) {
                    var removeIds = [];

                    for (var j = 0; j < survey.options[i].votes.length; j++) {
                        if (name == survey.options[i].votes[j].name) {
                            removeIds.push(j);
                        }
                    }

                    removeIds.every(id => survey.options[i].votes.splice(id, 1));
                }

                survey.options[request.params.oidx].votes.push({name: name});

                survey.save(err => {
                    if (err) {
                        response.status(403).json({error: err});
                    } else {
                        response.json({survey: survey});
                    }
                });
            }
        });
    }
}
