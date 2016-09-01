'use strict';

var logger = require('./../../logger/logger');
const DEBUG = logger.levels.DEBUG;
const WARN = logger.levels.WARN;
var log = logger.Logger().log;

log('Loading appointments controller', DEBUG);

var mongoose = require('mongoose');

exports = module.exports = new AppointmentsController();

function AppointmentsController() {
    var ctrl = this;
    var Appointments = mongoose.model('appointments');

    this.create = createAppointment;
    this.delete = deleteAppointment;
    this.index = appointmentsIndex;

    function createAppointment(request, response) {
        var appointment = new Appointments(request.body.appointment);

        Appointments.find({}, (err, appointments) => {
            var countDate = 0;
            for (var i = 0; i < appointments.length; i++) {
                if (appointments[i].date == appointment.date) {
                    countDate++;
                }
            }

            if (countDate > 2) {
                response.status(403).json({error: 'No more appointments available for this date.'})
            } else {
                appointment.save((err) => {
                    if (err) {
                        response.status(403).json({error: err});
                    } else {
                        response.json({appointment: appointment});
                    }
                });
            }
        });

    }

    function deleteAppointment(request, response) {
        Appointments.findByIdAndRemove(request.body.id, (err, appointment) => {
            if (err) {
                response.status(404).json({error: err});
            } else {
                response.json({appointment: appointment});
            }
        });
    }

    function appointmentsIndex(request, response) {
        Appointments.find({}, (err, appointments) => {
            if (err) {
                response.status(403).json({error: err});
            } else {
                response.json({appointments: appointments});
            }
        });
    }
}
