
import React, { useState } from 'react';
import { FlatList, View, Text, TouchableOpacity, Modal, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  Container,
  Titulo,
  Botao,
  BotaoTexto,
  LobbyContainer,
  LobbyNome,
  LobbyMembros,
  ModalContainer,
  ModalTitulo,
  ModalInput
} from '../styles/LobbyStyles';

import Toast from './Toast'; 

const LobbiesData = [
  { id: '1', name: 'Lobby 1', maxMembers: 3, currentMembers: 3, game: 'Fortnite' },
  { id: '2', name: 'Lobby 2', maxMembers: 8, currentMembers: 5, game: 'Fortnite' },
  { id: '3', name: 'Lobby 3', maxMembers: 10, currentMembers: 7, game: 'Fortnite' },
  { id: '4', name: 'Lobby 1', maxMembers: 4, currentMembers: 4, game: 'Rainbow Six Siege' },
  { id: '5', name: 'Lobby 2', maxMembers: 6, currentMembers: 2, game: 'Rainbow Six Siege' },
];

const Lobby = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { selectedGame } = route.params || {};
  const [lobbiesData, setLobbiesData] = useState(LobbiesData);
  const [selectedLobby, setSelectedLobby] = useState(null);
  const [toastVisible, setToastVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [newLobbyName, setNewLobbyName] = useState('');
  const [newLobbyMaxMembers, setNewLobbyMaxMembers] = useState('');
  const [lobbyCreatedToastVisible, setLobbyCreatedToastVisible] = useState(false);

  const joinLobby = (lobby) => {
    setSelectedLobby(lobby);
  };

  const handleEnterLobby = () => {
    if (selectedLobby && selectedLobby.currentMembers < selectedLobby.maxMembers) {
      navigation.navigate('Chat', { lobbyId: selectedLobby.id });
    } else {
      setToastVisible(true);
    }
  };

  const renderLobbyItem = ({ item }) => (
    <TouchableOpacity onPress={() => joinLobby(item)} style={{ marginBottom: 10 }}>
      <LobbyContainer selected={selectedLobby && selectedLobby.id === item.id}>
        <LobbyNome>{item.name}</LobbyNome>
        <LobbyMembros>Membros: {item.currentMembers}/{item.maxMembers}</LobbyMembros>
      </LobbyContainer>
    </TouchableOpacity>
  );

  const filteredLobbies = lobbiesData.filter((lobby) => lobby.game === selectedGame);

  const handleCreateLobby = () => {
    const maxMembers = parseInt(newLobbyMaxMembers, 10);
    if (newLobbyName && !isNaN(maxMembers) && maxMembers > 0) {
      const newLobby = {
        id: (lobbiesData.length + 1).toString(),
        name: newLobbyName,
        maxMembers: maxMembers,
        currentMembers: 0,
        game: selectedGame,
      };
      setLobbiesData((prevLobbies) => [...prevLobbies, newLobby]);
      setNewLobbyName('');
      setNewLobbyMaxMembers('');
      setModalVisible(false);
      setLobbyCreatedToastVisible(true); 
    } else {
     
    }
  };

  return (
    <Container>
      <Titulo>Lobbies Disponíveis para {selectedGame || 'Selecione um jogo'}</Titulo>
      {filteredLobbies.length > 0 ? (
        <FlatList
          data={filteredLobbies}
          keyExtractor={(item) => item.id}
          renderItem={renderLobbyItem}
        />
      ) : (
        <Text style={{ color: 'white', fontSize: 18 }}>Nenhum lobby disponível para este jogo.</Text>
      )}
      {selectedLobby && (
        <Botao onPress={handleEnterLobby}>
          <BotaoTexto>Entrar no Lobby</BotaoTexto>
        </Botao>
      )}
      <Botao onPress={() => setModalVisible(true)}>
        <BotaoTexto>Criar Novo Lobby</BotaoTexto>
      </Botao>


      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <ModalContainer>
          <ModalTitulo>Criar Novo Lobby</ModalTitulo>
          <ModalInput
            placeholder="Nome do Lobby"
            value={newLobbyName}
            onChangeText={setNewLobbyName}
          />
          <ModalInput
            placeholder="Limite de Membros"
            value={newLobbyMaxMembers}
            onChangeText={(text) => {
              
              if (/^\d*$/.test(text)) {
                setNewLobbyMaxMembers(text);
              }
            }}
            keyboardType="numeric"
          />
          <Botao onPress={handleCreateLobby}>
            <BotaoTexto>Criar Lobby</BotaoTexto>
          </Botao>
          <Botao onPress={() => setModalVisible(false)}>
            <BotaoTexto>Cancelar</BotaoTexto>
          </Botao>
        </ModalContainer>
      </Modal>

      <Toast
        message="O lobby está cheio. Tente novamente ou espere até que tenha espaço."
        visible={toastVisible}
        onClose={() => setToastVisible(false)}
        type="error" 
      />
      <Toast
        message="Lobby criado com sucesso!"
        visible={lobbyCreatedToastVisible}
        onClose={() => setLobbyCreatedToastVisible(false)}
        type="success" 
      />
    </Container>
  );
};

export default Lobby;
