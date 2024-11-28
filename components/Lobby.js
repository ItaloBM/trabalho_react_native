import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, TouchableOpacity, Modal, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Container, Titulo, Botao, BotaoTexto, LobbyContainer, LobbyNome, LobbyMembros, ModalContainer, ModalTitulo, ModalInput } from '../styles/LobbyStyles';

import { db } from '../databases/Firebase'; 
import { collection, addDoc, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import Toast from './Toast';

const Lobby = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { selectedGame } = route.params || {};

  const [Lobbies, setLobbies] = useState([]);
  const [LobbySelecionado, setLobbySelecionado] = useState(null);
  const [UsuarioAtual, setUsuarioAtual] = useState(null); 
  const [ToastVisivel, setToastVisivel] = useState(false);
  const [ModalVisivel, setModalVisivel] = useState(false);
  const [LobbyName, setLobbyName] = useState('');
  const [LobbyMaximoMembros, setLobbyMaximoMembros] = useState('');
  const [LobbyCriadoToast, setLobbyCriadoToast] = useState(false);
  const [ErroFormulario, setErroFormulario] = useState('');

  // Atualizar lobbies em tempo real
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'lobbies'), (querySnapshot) => {
      const lobbies = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLobbies(lobbies);
    });

    return () => unsubscribe();
  }, []);

  // Filtrar lobbies pelo jogo selecionado
  const filteredLobbies = Lobbies.filter((lobby) => lobby.game === selectedGame);

  // Entrar no lobby selecionado
  const handleEnterLobby = async (lobby) => {
    if (!lobby) return;

    // Verifica se o usuário já está no lobby
    if (UsuarioAtual && UsuarioAtual.id === lobby.id) {
      // Não incrementa o número de membros, pois já está no lobby
      Alert.alert('Você já entrou nesse lobby.');
      return;
    }

    // Verifica se o lobby está cheio
    if (lobby.currentMembers >= lobby.maxMembers) {
      setToastVisivel(true);
      setTimeout(() => setToastVisivel(false), 3000);
      return;
    }

    try {
      // Incrementa o número de membros
      const increment = lobby.currentMembers + 1;
      const lobbyRef = doc(db, 'lobbies', lobby.id);
      await updateDoc(lobbyRef, { currentMembers: increment });

      // Define o lobby selecionado e guarda o usuário atual
      setLobbySelecionado(lobby);
      setUsuarioAtual({ id: lobby.id, name: lobby.name });
      navigation.navigate('Chat', { lobbyId: lobby.id });
    } catch (error) {
      console.error('Erro ao entrar no lobby:', error);
      Alert.alert('Erro', 'Não foi possível entrar no lobby.');
    }
  };

  // Sair do lobby selecionado ou voltar para a página anterior
  const handleExitLobby = async () => {
    if (!LobbySelecionado || !UsuarioAtual) return;

    try {
      // Decrementa o número de membros apenas uma vez para o usuário que está saindo
      const decrement = Math.max(0, LobbySelecionado.currentMembers - 1); 
      const lobbyRef = doc(db, 'lobbies', LobbySelecionado.id);

      await updateDoc(lobbyRef, { currentMembers: decrement });

      // Limpa os dados do lobby e do usuário
      setLobbySelecionado(null);
      setUsuarioAtual(null);

      // Navegar de volta ou alertar o usuário
      navigation.goBack();
      Alert.alert('Você saiu do lobby.');
    } catch (error) {
      console.error('Erro ao sair do lobby:', error);
      Alert.alert('Erro', 'Não foi possível sair do lobby.');
    }
  };

  // Criar novo lobby
  const handleCreateLobby = async () => {
    const maxMembers = parseInt(LobbyMaximoMembros, 10);

    if (!LobbyName || !LobbyMaximoMembros || isNaN(maxMembers)) {
      setErroFormulario('Preencha todos os campos corretamente antes de criar o lobby.');
      setTimeout(() => setErroFormulario(''), 3000);
      return;
    }

    if (maxMembers <= 1) {
      setErroFormulario('O lobby precisa ter pelo menos 2 membros.');
      setTimeout(() => setErroFormulario(''), 3000);
      return;
    }

    try {
      const newLobby = {
        name: LobbyName,
        maxMembers,
        currentMembers: 0,
        game: selectedGame,
      };

      const lobbiesRef = collection(db, 'lobbies');
      const docRef = await addDoc(lobbiesRef, newLobby);

      console.log('Lobby criado com sucesso:', docRef.id);

      setLobbyName('');
      setLobbyMaximoMembros('');
      setModalVisivel(false);
      setLobbyCriadoToast(true);

      setTimeout(() => {
        setLobbyCriadoToast(false);
      }, 3000);
    } catch (error) {
      console.error('Erro ao criar lobby no Firestore:', error);
      Alert.alert('Erro', 'Não foi possível criar o lobby. Verifique sua conexão e tente novamente.');
    }
  };

  return (
    <Container>
      <Titulo>Lobbies Disponíveis para {selectedGame || 'Selecione um jogo'}</Titulo>
      {filteredLobbies.length > 0 ? (
        <FlatList
          data={filteredLobbies}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleEnterLobby(item)}
              style={{ marginBottom: 10 }}
            >
              <LobbyContainer selected={LobbySelecionado && LobbySelecionado.id === item.id}>
                <LobbyNome>{item.name}</LobbyNome>
                <LobbyMembros>Membros: {item.currentMembers}/{item.maxMembers}</LobbyMembros>
              </LobbyContainer>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={{ color: 'white', fontSize: 18 }}>Nenhum lobby disponível para este jogo.</Text>
      )}

      {LobbySelecionado && (
        <Botao onPress={handleExitLobby}>
          <BotaoTexto>Sair do Lobby</BotaoTexto>
        </Botao>
      )}

      <Botao onPress={() => setModalVisivel(true)}>
        <BotaoTexto>Criar Novo Lobby</BotaoTexto>
      </Botao>

      <Modal
        visible={ModalVisivel}
        animationType="slide"
        onRequestClose={() => setModalVisivel(false)}
      >
        <ModalContainer>
          <ModalTitulo>Criar Novo Lobby</ModalTitulo>
          <ModalInput
            placeholder="Nome do Lobby"
            value={LobbyName}
            onChangeText={setLobbyName}
          />
          <ModalInput
            placeholder="Limite de Membros"
            value={LobbyMaximoMembros}
            onChangeText={(text) => {
              if (/^\d*$/.test(text)) {
                setLobbyMaximoMembros(text);
              }
            }}
            keyboardType="numeric"
          />
          {ErroFormulario ? (
            <Text style={{ color: 'red', marginBottom: 10 }}>{ErroFormulario}</Text>
          ) : null}
          <Botao onPress={handleCreateLobby}>
            <BotaoTexto>Criar Lobby</BotaoTexto>
          </Botao>
          <Botao onPress={() => setModalVisivel(false)}>
            <BotaoTexto>Cancelar</BotaoTexto>
          </Botao>
        </ModalContainer>
      </Modal>

      <Toast
        message="O lobby está cheio. Tente novamente ou espere até que tenha espaço."
        visible={ToastVisivel}
        onClose={() => setToastVisivel(false)}
        type="error"
      />
      <Toast
        message="Lobby criado com sucesso!"
        visible={LobbyCriadoToast}
        onClose={() => setLobbyCriadoToast(false)}
        type="success"
      />
    </Container>
  );
};

export default Lobby;
