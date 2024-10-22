
import React, { useEffect, useState } from 'react';
import { View, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { db } from '../databases/Firebase';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';
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

const Chat = ({ route }) => {
  const { lobbyId } = route.params; 
  const [mensagens, setMensagens] = useState([]);
  const [novaMensagem, setNovaMensagem] = useState('');

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'lobbies', lobbyId, 'mensagens'), (snapshot) => {
      const novasMensagens = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMensagens(novasMensagens);
    });
    return () => unsubscribe();
  }, [lobbyId]);

  const enviarMensagem = async () => {
    if (novaMensagem.trim() !== '') {
      await addDoc(collection(db, 'lobbies', lobbyId, 'mensagens'), {
        texto: novaMensagem,
        timestamp: new Date()
      });
      setNovaMensagem('');
    }
  };

  return (
    <Container>
      <Titulo>Chat do Lobby</Titulo>
      <ChatContainer>
        <FlatList
          data={mensagens}
          keyExtractor={(item) => item.id}
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
    </Container>
  );
};

export default Chat;
