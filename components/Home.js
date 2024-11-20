import React, { useState, useEffect, useRef } from 'react';
import { FlatList, Image, View, TouchableOpacity, Modal, ActivityIndicator, TextInput, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../databases/Firebase'; // Import Firebase auth
import {
  Container,
  Titulo,
  Jogos,
  ItemTexto,
  Botao,
  BotaoTexto,
  NavegacaoContainer,
  ModalContainer,
  ModalConteudo,
  ModalImagem,
  ModalTitulo,
  PerfilContainer,
  PerfilImagem,
  Nickname
} from '../styles/HomeStyles';

const gamesData = [
  { id: '1', title: 'Rainbow Six Siege', image: require('../img/r6.png') },
  { id: '2', title: 'Counter Strike 2', image: require('../img/cs2.png') },
  { id: '3', title: 'Fortnite', image: require('../img/fortnite.png') },
  { id: '4', title: 'Call of Duty: Warzone', image: require('../img/warzone.png') },
  { id: '5', title: 'Red Dead Redemption 2', image: require('../img/red.png') },
  { id: '6', title: 'Dota 2', image: require('../img/dota2.png') },
  { id: '7', title: 'Valorant', image: require('../img/valorant.png') },
  { id: '8', title: 'Grand Theft Auto V', image: require('../img/gta.png') },
  { id: '9', title: 'League of Legends', image: require('../img/lol.png') },
  { id: '10', title: 'Playerunknowns Battlegrounds', image: require('../img/pubg.png') },
];

const ProfileModal = ({ avatarModalVisible, setAvatarModalVisible, nickname, setNickname, handleLogout }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Modal
      animationType="slide"
      transparent
      visible={avatarModalVisible}
      onRequestClose={() => setAvatarModalVisible(false)}
    >
      <ModalContainer>
        <ModalConteudo>
          <ModalTitulo>Configurações do Perfil</ModalTitulo>

          {!isEditing ? (
            <TouchableOpacity onPress={() => setIsEditing(true)}>
              <Nickname style={{ color: '#fff' }}>{nickname}</Nickname>
            </TouchableOpacity>
          ) : (
            <TextInput
              value={nickname}
              onChangeText={setNickname}
              onBlur={() => setIsEditing(false)}
              placeholder="Alterar Nickname"
              placeholderTextColor="#fff"
              style={{
                borderWidth: 1,
                borderColor: '#ccc',
                marginBottom: 10,
                padding: 8,
                borderRadius: 5,
                color: '#fff'
              }}
            />
          )}

          <Botao onPress={handleLogout}>
            <BotaoTexto>Sair</BotaoTexto>
          </Botao>

          <Botao onPress={() => setAvatarModalVisible(false)}>
            <BotaoTexto>Fechar</BotaoTexto>
          </Botao>
        </ModalConteudo>
      </ModalContainer>
    </Modal>
  );
};

const Home = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [loading, setLoading] = useState(false);
  const [avatarModalVisible, setAvatarModalVisible] = useState(false);
  const [nickname, setNickname] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const navigation = useNavigation();
  const flatListRef = useRef(null);

  // Fetch the user's name from Firebase on component mount
  useEffect(() => {
    if (auth.currentUser) {
      const email = auth.currentUser.email;
      const username = email ? email.split('@')[0] : 'Jogador'; // Extract the part before '@'
      setNickname(username); // Set the nickname to the username extracted
    }
  }, []);

  const openModal = (game) => {
    setSelectedGame(game);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedGame(null);
  };

  const goToLobby = () => {
    setLoading(true);
    setTimeout(() => {
      closeModal();
      navigation.navigate('Lobby', { selectedGame: selectedGame?.title });
      setLoading(false);
    }, 1500);
  };

  const renderGameItem = ({ item }) => (
    <Jogos>
      <TouchableOpacity onPress={() => openModal(item)}>
        <Image source={item.image} style={{ width: 200, height: 200, borderRadius: 10 }} />
        <ItemTexto>{item.title}</ItemTexto>
      </TouchableOpacity>
    </Jogos>
  );

  const handleLogout = () => {
    setIsLoggedIn(false);
    console.log('Usuário Deslogado');
    navigation.navigate('Login');
  };

  return (
    <Container>
      {isLoggedIn && (
        <>
          <PerfilContainer>
            <TouchableOpacity onPress={() => setAvatarModalVisible(true)}>
              <PerfilImagem source={require('../img/avatar.png')} />
            </TouchableOpacity>
            <Nickname>{nickname}</Nickname>
          </PerfilContainer>

          <Titulo>Jogos Disponíveis</Titulo>
          <NavegacaoContainer>
            <TouchableOpacity onPress={() => flatListRef.current?.scrollToIndex({ index: 0, animated: true })}>
              <Icon name="chevron-back" size={30} color="rgb(0, 255, 136)" />
            </TouchableOpacity>

            <FlatList
              ref={flatListRef}
              data={gamesData}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={renderGameItem}
            />

            <TouchableOpacity onPress={() => flatListRef.current?.scrollToEnd({ animated: true })}>
              <Icon name="chevron-forward" size={30} color="rgb(0, 255, 136)" />
            </TouchableOpacity>
          </NavegacaoContainer>

          {selectedGame && (
            <Modal
              animationType="slide"
              transparent
              visible={modalVisible}
              onRequestClose={closeModal}
            >
              <ModalContainer>
                <ModalConteudo>
                  <ModalImagem source={selectedGame.image} />
                  <ModalTitulo>{selectedGame.title}</ModalTitulo>
                  <Botao onPress={goToLobby} disabled={loading}>
                    {loading ? (
                      <ActivityIndicator size="small" color="#0000ff" />
                    ) : (
                      <BotaoTexto>Buscar Lobby</BotaoTexto>
                    )}
                  </Botao>
                  <Botao onPress={closeModal}>
                    <BotaoTexto>Fechar</BotaoTexto>
                  </Botao>
                </ModalConteudo>
              </ModalContainer>
            </Modal>
          )}

          <ProfileModal
            avatarModalVisible={avatarModalVisible}
            setAvatarModalVisible={setAvatarModalVisible}
            nickname={nickname}
            setNickname={setNickname}
            handleLogout={handleLogout}
          />
        </>
      )}
    </Container>
  );
};

export default Home;
