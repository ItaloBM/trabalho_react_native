import React, { useState, useEffect, useRef } from 'react';
import { FlatList, Image, TouchableOpacity, Modal, ActivityIndicator, TextInput, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../databases/Firebase';
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
  ModalTitulo,
  PerfilContainer,
  PerfilImagem,
  Nickname,
} from '../styles/HomeStyles';

const gamesData = [
  { id: '1', title: 'Rainbow Six Siege' },
  { id: '2', title: 'Counter Strike 2' },
  { id: '3', title: 'Fortnite' },
  { id: '4', title: 'Call of Duty: Warzone' },
  { id: '5', title: 'Red Dead Redemption 2' },
  { id: '6', title: 'Dota 2' },
  { id: '7', title: 'Valorant' },
  { id: '8', title: 'Grand Theft Auto V' },
  { id: '9', title: 'League of Legends' },
  { id: '10', title: 'Playerunknowns Battlegrounds' },
];

const Home = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [nickname, setNickname] = useState('Carregando...');
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [avatarModalVisible, setAvatarModalVisible] = useState(false); // Controle do modal de avatar
  const [selectedAvatar, setSelectedAvatar] = useState(require('../img/avatar.jpg'));
  const [avatarOptions, setAvatarOptions] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const navigation = useNavigation();
  const flatListRef = useRef(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchUserNickname(currentUser.uid);
      } else {
        setUser(null);
        setNickname('Usuário não autenticado');
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    fetchGames();
    loadAvatarOptions();
  }, []);

  const fetchGames = async () => {
    try {
      setLoading(true);
      const gameImages = await Promise.all(
        gamesData.map(async (game) => {
          const response = await fetch(
            `https://api.rawg.io/api/games?key=fbd0e8c049eb4491aab016400545ab60&search=${encodeURIComponent(game.title)}`
          );
          const data = await response.json();
          const gameDetails = data.results[0];
          return {
            ...game,
            image: { uri: gameDetails.background_image },
          };
        })
      );
      setGames(gameImages);
    } catch (error) {
      console.error('Erro ao buscar jogos:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadAvatarOptions = () => {
    const avatars = [
      require('../img/avatar.jpg'),
      require('../img/avatar1.jpg'),
      require('../img/avatar2.jpg'),
      require('../img/avatar3.jpg'),
      require('../img/avatar4.jpg'),
      require('../img/avatar5.jpg'),
      require('../img/avatar6.jpg'),
      require('../img/avatar7.jpg'),
    ];
    setAvatarOptions(avatars);
  };

  const fetchUserNickname = async (uid) => {
    try {
      setLoading(true);
      const userDoc = await getDoc(doc(db, 'usuarios', uid));
      if (userDoc.exists()) {
        setNickname(userDoc.data().nickname || 'Sem nickname');
        if (userDoc.data().profilePicture) {
          setSelectedAvatar({ uri: userDoc.data().profilePicture });
        }
      } else {
        setNickname('Usuário não encontrado');
      }
    } catch (error) {
      console.error('Erro ao buscar nickname:', error);
      setNickname('Erro ao carregar');
    } finally {
      setLoading(false);
    }
  };

  const openGameModal = (game) => {
    setSelectedGame(game);
    setModalVisible(true); // Abre o modal ao selecionar um jogo
  };

  const closeGameModal = () => {
    setModalVisible(false); // Fecha o modal
    setSelectedGame(null); // Limpa o jogo selecionado
  };

  const goToLobby = () => {
    setLoading(true);
    setTimeout(() => {
      closeGameModal();
      navigation.navigate('Lobby', { selectedGame: selectedGame?.title });
      setLoading(false);
    }, 1500);
  };

  const openProfileModal = () => {
    setProfileModalVisible(true);
  };

  const closeProfileModal = () => {
    setProfileModalVisible(false);
  };

  const openAvatarModal = () => {
    setAvatarModalVisible(true); // Abre o modal de seleção de avatar
  };

  const closeAvatarModal = () => {
    setAvatarModalVisible(false); // Fecha o modal de avatar
  };

  const logout = async () => {
    try {
      await auth.signOut();
      setUser(null);
      navigation.navigate('Login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const updateNickname = async (newNickname) => {
    if (!newNickname) return;
    try {
      const userRef = doc(db, 'usuarios', user.uid);
      await updateDoc(userRef, { nickname: newNickname });
      setNickname(newNickname);
      closeProfileModal();
    } catch (error) {
      console.error('Erro ao atualizar nickname:', error);
    }
  };

  const selectAvatar = async (avatar) => {
    setSelectedAvatar(avatar);
    try {
      const userRef = doc(db, 'usuarios', user.uid);
      await updateDoc(userRef, { profilePicture: avatar.uri });
      closeAvatarModal(); // Fecha o modal de avatar após a seleção
    } catch (error) {
      console.error('Erro ao atualizar avatar:', error);
    }
  };
  const renderGameItem = ({ item }) => (
    <Jogos>
      <TouchableOpacity onPress={() => openGameModal(item)}>
        <Image source={item.image} style={{ width: 200, height: 200, borderRadius: 10 }} />
        <ItemTexto>{item.title}</ItemTexto>
      </TouchableOpacity>
    </Jogos>
  );



  if (loading) {
    return <ActivityIndicator size="large" color="#00f" />;
  }

  return (
    <Container>
      {user && (
        <>
          <PerfilContainer>
            <TouchableOpacity onPress={openProfileModal}>
              <PerfilImagem source={selectedAvatar} />
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
              data={games}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={renderGameItem}
            />

            <TouchableOpacity onPress={() => flatListRef.current?.scrollToEnd({ animated: true })}>
              <Icon name="chevron-forward" size={30} color="rgb(0, 255, 136)" />
            </TouchableOpacity>
          </NavegacaoContainer>

          {/* Modal de Jogo */}
          <Modal visible={modalVisible} transparent animationType="slide">
            <ModalContainer>
              <ModalConteudo>
                <ModalTitulo>{selectedGame?.title}</ModalTitulo>
                <Image source={selectedGame?.image} style={{ width: 300, height: 200, borderRadius: 10 }} />
                <Botao onPress={goToLobby}>
                  <BotaoTexto>Ir para o Lobby</BotaoTexto>
                </Botao>
                <Botao onPress={closeGameModal}>
                  <BotaoTexto>Fechar</BotaoTexto>
                </Botao>
              </ModalConteudo>
            </ModalContainer>
          </Modal>

          {/* Modal de Perfil */}
          <Modal visible={profileModalVisible} transparent animationType="slide">
            <ModalContainer>
              <ModalConteudo>
                <ModalTitulo>Perfil</ModalTitulo>
                <TextInput
                  value={nickname}
                  onChangeText={setNickname}
                  placeholder="Digite um novo nickname"
                  placeholderTextColor="#fff"
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: '#fff',
                    marginVertical: 20,
                    color: '#fff',
                  }}
                />

                <Botao onPress={() => updateNickname(nickname)}>
                  <BotaoTexto>Salvar Alterações</BotaoTexto>
                </Botao>
                <Botao onPress={openAvatarModal}>
                  <BotaoTexto>Alterar Avatar</BotaoTexto>
                </Botao>
                <Botao onPress={closeProfileModal}>
                  <BotaoTexto>Fechar</BotaoTexto>
                </Botao>
              </ModalConteudo>
            </ModalContainer>
          </Modal>

          {/* Modal de Alteração de Avatar */}
          <Modal visible={avatarModalVisible} transparent animationType="slide">
            <ModalContainer>
              <ModalConteudo>
                <ModalTitulo>Selecione um Avatar</ModalTitulo>

                {/* Lista de Avatares */}
                <FlatList
                  data={avatarOptions}
                  keyExtractor={(item, index) => index.toString()}
                  numColumns={3}
                  contentContainerStyle={{ alignItems: 'center' }}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity
                      onPress={() => setSelectedImageIndex(index)}
                      style={{
                        margin: 10,
                        borderWidth: selectedImageIndex === index ? 2 : 0,
                        borderColor: 'rgb(0, 255, 136)',
                        borderRadius: 50,
                      }}
                    >
                      <Image
                        source={item}
                        style={{
                          width: 80,
                          height: 80,
                          borderRadius: 40,
                        }}
                      />
                    </TouchableOpacity>
                  )}
                />

                {/* Botões */}
                <Botao onPress={() => selectAvatar(avatarOptions[selectedImageIndex])}>
                  <BotaoTexto>Salvar</BotaoTexto>
                </Botao>
                <Botao onPress={closeAvatarModal}>
                  <BotaoTexto>Cancelar</BotaoTexto>
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
