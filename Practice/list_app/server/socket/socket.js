'use strict';

exports = module.exports = socket;

function socket(server) {
    var io = require('socket.io')(server);

    io.sockets.on('connection', (socket) => {
        socket.on('client_changed', (data) => {
            socket.emit('server_updated', data);
        });
    });
}
