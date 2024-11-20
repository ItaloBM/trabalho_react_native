const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Permitir que qualquer frontend se conecte
    methods: ['GET', 'POST']
  }
});

// Lógica de conexão
io.on('connection', (socket) => {
  console.log('Usuário conectado:', socket.id);

  // Receber mensagem
  socket.on('enviarMensagem', (mensagem) => {
    io.emit('novaMensagem', mensagem); // Enviar mensagem para todos
  });

  // Desconectar
  socket.on('disconnect', () => {
    console.log('Usuário desconectado:', socket.id);
  });
});

server.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
