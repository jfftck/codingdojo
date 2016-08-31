'use strict';

var logger = require('./../../logger/logger');
const DEBUG = logger.levels.DEBUG;
const WARN = logger.levels.WARN;
var log = logger.Logger().log;

log('Loading buckets controller', DEBUG);

var mongoose = require('mongoose');

exports = module.exports = new BucketsController();

function BucketsController() {
    var ctrl = this;
    var Buckets = mongoose.model('buckets');

    ctrl.complete = completeBucket;
    ctrl.create = createBucket;
    ctrl.show = showBucket;

    function completeBucket(request, response) {
        Buckets.findById(request.params.id, (err, bucket) => {
            bucket.complete = request.body.complete;

            bucket.save((err) => {
                if (err) {
                    response.status(403).json({error: err});
                } else {
                    response.json({bucket: bucket});
                }
            });
        });
    }

    function createBucket(request, response) {
        log(request.body, DEBUG);

        var bucket = new Buckets(request.body.bucket);

        bucket.save((err) => {
            if (err) {
                response.status(403).json({error: err});
            } else {
                response.json({bucket: bucket});
            }
        });
    }

    function showBucket(request, response) {
        log(request.params, DEBUG);

        var query = Buckets.find({});

        query.or([{owner: request.params.user}, {tagged: request.params.user}]);
        query.exec((err, buckets) => {
            if (err) {
                response.status(403).json({error: err});
            } else {
                response.json({buckets: buckets});
            }
        });
    }
}
