import React, { useEffect, useState } from 'react';
import { FlatList, Platform } from 'react-native';
import io from 'socket.io-client';
import Toast from 'react-native-toast-message';  
import {
  Container,
  Titulo,
  Botao,
  BotaoTexto,
  Input,
  ChatContainer,
  Mensagem,
  MensagemTexto,
} from '../styles/ChatStyles';

const Chat = () => {
  const [mensagens, setMensagens] = useState([]); 
  const [novaMensagem, setNovaMensagem] = useState(''); 
  const [socket, setSocket] = useState(null); 

  useEffect(() => {
    
    const newSocket = io('http://192.168.1.106:3000'); 
    setSocket(newSocket);

    
    newSocket.on('connect', () => {
      console.log('Conectado ao servidor:', newSocket.id);
    });

    
    newSocket.on('novaMensagem', (mensagem) => {
      setMensagens((prevMensagens) => [...prevMensagens, mensagem]);
    });

    
    return () => {
      newSocket.disconnect();
      console.log('Desconectado do servidor');
    };
  }, []); 

  const enviarMensagem = () => {
    if (novaMensagem.trim() !== '' && socket) {
      const mensagem = { texto: novaMensagem, timestamp: new Date() };

      
      socket.emit('enviarMensagem', mensagem);

      
      setNovaMensagem('');

      
      Toast.show({
        type: 'success', 
        position: 'bottom', 
        text1: 'Mensagem enviada!',
        visibilityTime: 2000, 
      });
    }
  };

  return (
    <Container>
      <Titulo>Chat em Tempo Real</Titulo>
      <ChatContainer>
        <FlatList
          data={mensagens}
          keyExtractor={(item, index) => index.toString()} 
          renderItem={({ item }) => (
            <Mensagem>
              <MensagemTexto>{item.texto}</MensagemTexto>
            </Mensagem>
          )}
        />
      </ChatContainer>
      <Input
        value={novaMensagem}
        onChangeText={setNovaMensagem}
        placeholder="Digite sua mensagem..."
      />
      <Botao onPress={enviarMensagem}>
        <BotaoTexto>Enviar</BotaoTexto>
      </Botao>

      
      <Toast />
    </Container>
  );
};

export default Chat;
