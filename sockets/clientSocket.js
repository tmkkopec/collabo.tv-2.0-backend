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

        socket.on('create or join', function (room) {log('Received request to create or join room ' + room);

        let  clientsInRoom = io.nsps['/'].adapter.rooms[room];
        let numClients = clientsInRoom === undefined ? 0 : Object.keys(clientsInRoom.sockets).length;

        log('Room ' + room + ' now has ' + (numClients) + ' client(s)');

        if (numClients === 0) {
            socket.join(room);
			
            log('Client ID ' + socket.id + ' created room ' + room);
            socket.emit('created', room, socket.id);

        } else {
            log('Client ID ' + socket.id + ' joined room ' + room);
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

        socket.on('logout', function () {
            log('Received request tologout from room ' + room);
			socket.leave(room);
        });

    });
}

module.exports = setupClientSocket;