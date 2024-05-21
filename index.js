const express = require('express');
const dotenv = require('dotenv');
const http = require('http');
dotenv.config();
const { sequelize } = require('sequelize');
const path = require('path');
const routes = require('./routes');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
app.use(express.json());

app.use(express.static('public'))
app.use('/', routes);

// Socket.IO connection handler
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });

  socket.on('sendMessage', (message) => {
    console.log('Message received:', message);
    io.emit('receiveMessage', message); 
  });

});

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  // await sequelize.authenticate();
  console.log('Database connected!');
});
