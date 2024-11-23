import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, TouchableOpacity, Modal, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Container, Titulo, Botao, BotaoTexto, LobbyContainer, LobbyNome, LobbyMembros, ModalContainer, ModalTitulo, ModalInput } from '../styles/LobbyStyles';

import { db } from '../databases/Firebase'; // Certifique-se que está corretamente configurado
import { collection, addDoc, getDocs } from 'firebase/firestore';
import Toast from './Toast';

const Lobby = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { selectedGame } = route.params || {};

  const [Lobbies, setLobbies] = useState([]);
  const [LobbySelecionado, setLobbySelecionado] = useState(null);
  const [ToastVisivel, setToastVisivel] = useState(false);
  const [ModalVisivel, setModalVisivel] = useState(false);
  const [LobbyName, setLobbyName] = useState('');
  const [LobbyMaximoMembros, setLobbyMaximoMembros] = useState('');
  const [LobbyCriadoToast, setLobbyCriadoToast] = useState(false);
  const [ErroFormulario, setErroFormulario] = useState('');

  // Buscar os lobbies disponíveis do Firestore
  const fetchLobbies = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'lobbies'));
      const lobbies = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLobbies(lobbies);
    } catch (error) {
      console.error('Erro ao buscar lobbies:', error);
      Alert.alert('Erro', 'Não foi possível carregar os lobbies. Verifique sua conexão e tente novamente.');
    }
  };

  useEffect(() => {
    fetchLobbies();
  }, []);

  // Filtrar lobbies pelo jogo selecionado
  const filteredLobbies = Lobbies.filter((lobby) => lobby.game === selectedGame);

  // Selecionar um lobby
  const joinLobby = (lobby) => {
    setLobbySelecionado(lobby);
  };

  // Entrar no lobby selecionado
  const handleEnterLobby = () => {
    if (LobbySelecionado && LobbySelecionado.currentMembers < LobbySelecionado.maxMembers) {
      navigation.navigate('Chat', { lobbyId: LobbySelecionado.id });
    } else {
      setToastVisivel(true);
      setTimeout(() => setToastVisivel(false), 3000);
    }
  };

  // Criar novo lobby
  const handleCreateLobby = async () => {
    const maxMembers = parseInt(LobbyMaximoMembros, 10);

    // Validar campos
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

      setLobbies((prevLobbies) => [
        ...prevLobbies,
        { id: docRef.id, ...newLobby },
      ]);

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
            <TouchableOpacity onPress={() => joinLobby(item)} style={{ marginBottom: 10 }}>
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
        <Botao onPress={handleEnterLobby}>
          <BotaoTexto>Entrar no Lobby</BotaoTexto>
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
