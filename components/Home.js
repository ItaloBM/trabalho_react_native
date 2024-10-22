import React, { useState, useRef } from 'react';
import { FlatList, Image, View, TouchableOpacity, Modal, ActivityIndicator, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
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

const Home = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [loading, setLoading] = useState(false);
  const [avatarModalVisible, setAvatarModalVisible] = useState(false);
  const [nickname, setNickname] = useState('Ovattsug');
  const [isLoggedIn, setIsLoggedIn] = useState(true); 
  const navigation = useNavigation();
  const flatListRef = useRef(null);

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

          <Modal
            animationType="slide"
            transparent
            visible={avatarModalVisible}
            onRequestClose={() => setAvatarModalVisible(false)}
          >
            <ModalContainer>
              <ModalConteudo>
                <ModalTitulo>Configurações do Perfil</ModalTitulo>

                <TextInput
                  value={nickname}
                  onChangeText={setNickname}
                  placeholder="Alterar Nickname"
                  style={{ borderWidth: 1, borderColor: '#ccc', marginBottom: 10, padding: 8, borderRadius: 5 }}
                />

                <Botao onPress={handleLogout}>
                  <BotaoTexto>Sair</BotaoTexto>
                </Botao>

                <Botao onPress={() => setAvatarModalVisible(false)}>
                  <BotaoTexto>Fechar</BotaoTexto>
                </Botao>
              </ModalConteudo>
            </ModalContainer>
          </Modal>
        </>
      )}
    </Container>
  );
};

export default Home;
