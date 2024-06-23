//Express dependancies
const express = require('express');
const app = express();
const port = 3001;

//socket.io dependancies
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
app.use(express.static('public'));

app.get('/', function(request, response) {
  response.sendFile(__dirname +'/index.html');
});

setInterval(() => {
    io.emit('updateGame');
}, 15);


server.listen(port, function() {
  console.log('Starting server on port', port);
});