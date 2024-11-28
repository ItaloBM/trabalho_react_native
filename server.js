const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

mongoose.connect('mongodb://localhost:27017/chat')
  .then(() => console.log('Conectado ao MongoDB'))
  .catch((err) => console.log('Erro ao conectar ao MongoDB', err));

const MensagemSchema = new mongoose.Schema({
  texto: String,
  timestamp: { type: Date, default: Date.now },
  usuario: { type: String, default: 'Usuário Anônimo' },
  lobbyId: String, 
});

const Mensagem = mongoose.model('Mensagem', MensagemSchema);

io.on('connection', (socket) => {
  const { lobbyId } = socket.handshake.query; 

  console.log(`Usuário conectado ao lobby: ${lobbyId}`);

  Mensagem.find({ lobbyId })
    .sort({ timestamp: 1 })
    .then((historico) => {
      socket.emit('historico', historico);
    })
    .catch((err) => {
      console.error('Erro ao buscar mensagens:', err);
      socket.emit('historico', []); 
    });

  socket.on('enviarMensagem', (mensagem) => {
    if (mensagem.lobbyId !== lobbyId) {
      console.error('Mensagem enviada para o lobby errado!');
      return;
    }

    const novaMensagem = new Mensagem({
      texto: mensagem.texto,
      usuario: mensagem.usuario,
      timestamp: new Date(),
      lobbyId: mensagem.lobbyId,
    });

    novaMensagem.save()
      .then(() => {
        console.log('Mensagem salva no MongoDB');
        io.to(lobbyId).emit('novaMensagem', novaMensagem); 
      })
      .catch((err) => {
        console.error('Erro ao salvar mensagem:', err);
      });
  });


  socket.join(lobbyId);


  socket.on('disconnect', () => {
    console.log(`Usuário desconectado do lobby: ${lobbyId}`);
    socket.leave(lobbyId); 
  });
});


server.listen(3000, '0.0.0.0', () => {
  console.log('Servidor rodando na porta 3000');
});

