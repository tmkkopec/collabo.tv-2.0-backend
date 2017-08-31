const socketIO = require('socket.io');

function setupClientSocket(server) {
    const io = socketIO.listen(server);
    io.sockets.on('connection', function (socket) {

        // convenience function to log server messages on the client
        function log() {
            const array = ['Message from server:'];
            array.push.apply(array, arguments);
            socket.emit('log', array);
        }

        socket.on('message', function (message) {
            // for a real app, would be room-only (not broadcast)
            socket.broadcast.emit('message', message);
        });

        socket.on('create or join', function (room) {
            log('Received request to create or join room ' + room);

            const abc = io.sockets.sockets;
            const numClients = Object.keys(abc).length;
            log('Room ' + room + ' now has ' + numClients + ' client(s)');

            if (numClients === 1) {
                socket.join(room);
                log(socket.id, room);
                socket.emit('created', room, socket.id);

            } else {
                log(socket.id, room);
                io.sockets.in(room).emit('join', room);
                socket.join(room);
                socket.emit('joined', room, socket.id);
                io.sockets.in(room).emit('ready');
            }
        });

        socket.on('ipaddr', function () {
            const ifaces = os.networkInterfaces();
            for (let dev in ifaces) {
                ifaces[dev].forEach(function (details) {
                    if (details.family === 'IPv4' && details.address !== '127.0.0.1') {
                        socket.emit('ipaddr', details.address);
                    }
                });
            }
        });

        socket.on('bye', function () {
            console.log('received bye');
        });

    });
}

module.exports = setupClientSocket;