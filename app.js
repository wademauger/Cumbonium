var bodyParser = require('body-parser');
var sanitizer = require('sanitizer')
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static("public")); // Mount public folder
app.use(bodyParser.json()); // Support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // Support encoded bodies

var chat = {
    history: ["Swag box"]
};

server.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Listening at http://%s:%s', host, port);
});

io.on('connection', function (socket) {
    socket.emit('chat-other', chat.history);
    socket.on('chat-personal', function (data) {
        data = new Date().toLocaleTimeString() + " [" + socket.handshake.address + "] " + sanitizer.escape(data);
        chat.history.push(data);
        if(chat.history.length > 10) {
            chat.history.splice(0, 1);
        }
        io.emit('chat-other', [data]);
    });
});