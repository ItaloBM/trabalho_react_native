const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Permite qualquer origem
    methods: ['GET', 'POST'], // Métodos permitidos
  },
});

// Definir uma rota para a raiz
app.get('/', (req, res) => {
  res.send('Servidor funcionando!');
});

// Conectar ao MongoDB
mongoose.connect('mongodb://localhost:27017/chat')
  .then(() => console.log('Conectado ao MongoDB'))
  .catch((err) => console.log('Erro ao conectar ao MongoDB', err));

const MensagemSchema = new mongoose.Schema({
  texto: String,
  timestamp: { type: Date, default: Date.now }, // Garantir que o timestamp seja gerado corretamente
  usuario: { type: String, default: 'Usuário Anônimo' },  // Adicionar um valor default caso o nome não seja fornecido
});

const Mensagem = mongoose.model('Mensagem', MensagemSchema);

io.on('connection', async (socket) => {
  console.log('Usuário conectado:', socket.id);

  // Enviar histórico de mensagens ao cliente
  try {
    const mensagens = await Mensagem.find().sort({ timestamp: 1 }); // Ordenando por timestamp
    socket.emit('historico', mensagens);
  } catch (err) {
    console.error('Erro ao buscar mensagens:', err);
    socket.emit('historico', []); // Em caso de erro, enviar uma lista vazia
  }

  // Receber nova mensagem do cliente
  socket.on('enviarMensagem', async (mensagem) => {
    try {
      if (!mensagem.texto || !mensagem.usuario) {
        console.error('Mensagem inválida:', mensagem);
        return;
      }

      const novaMensagem = new Mensagem({
        texto: mensagem.texto,
        usuario: mensagem.usuario,  // Receber o nome do usuário
        timestamp: new Date()
      });
      await novaMensagem.save(); // Salvar no banco de dados

      console.log('Mensagem salva:', novaMensagem);
      io.emit('novaMensagem', novaMensagem); // Enviar para todos os clientes
    } catch (err) {
      console.error('Erro ao salvar mensagem:', err);
    }
  });

  // Desconectar
  socket.on('disconnect', () => {
    console.log('Usuário desconectado:', socket.id);
  });
});

// Iniciar o servidor na porta 3000, permitindo conexões em qualquer endereço de rede (0.0.0.0)
server.listen(3000, '0.0.0.0', () => {
  console.log('Servidor rodando na porta 3000');
});
