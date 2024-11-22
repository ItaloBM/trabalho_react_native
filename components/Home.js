import React, { useState, useEffect, useRef } from 'react';
import { FlatList, Image, TouchableOpacity, Modal, ActivityIndicator, TextInput, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../databases/Firebase';
import * as ImagePicker from 'expo-image-picker';  // Para escolher a imagem
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
  const [profileModalVisible, setProfileModalVisible] = useState(false);  // Modal de perfil
  const [animation] = useState(new Animated.Value(0));

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
          const gameDetails = data.results[0]; // Pega o primeiro resultado
          return {
            ...game,
            image: { uri: gameDetails.background_image }, // Atualiza a imagem com a URL da API
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

  const fetchUserNickname = async (uid) => {
    try {
      setLoading(true);
      const userDoc = await getDoc(doc(db, 'usuarios', uid));
      if (userDoc.exists()) {
        setNickname(userDoc.data().nickname || 'Sem nickname');
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
    setModalVisible(true);
  };

  const closeGameModal = () => {
    setModalVisible(false);
    setSelectedGame(null);
  };

  const goToLobby = () => {
    setLoading(true);
    setTimeout(() => {
      closeGameModal();
      navigation.navigate('Lobby', { selectedGame: selectedGame?.title });
      setLoading(false);
    }, 1500);
  };

  // Função para abrir o modal do perfil
  const openProfileModal = () => {
    setProfileModalVisible(true);
  };

  // Função para fechar o modal do perfil
  const closeProfileModal = () => {
    setProfileModalVisible(false);
  };

  // Função para fazer logout
  const logout = async () => {
    try {
      await auth.signOut();
      setUser(null);
      navigation.navigate('Login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  // Função para atualizar o nickname
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

  // Função para atualizar a foto
  const updateProfilePicture = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.cancelled) {
      const userRef = doc(db, 'usuarios', user.uid);
      await updateDoc(userRef, { profilePicture: result.uri }); // Atualiza a foto
      setProfilePicture(result.uri);
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

          {/* Modal de Perfil */}
          <Modal visible={profileModalVisible} transparent animationType="slide">
            <ModalContainer>
              <ModalConteudo>
                <TouchableOpacity onPress={updateProfilePicture}>
                  <ModalImagem source={require('../img/avatar.png')} />
                </TouchableOpacity>
                <TextInput
                  style={{ borderBottomWidth: 1, marginBottom: 10 }}
                  placeholder="Novo Nickname"
                  value={nickname}
                  onChangeText={setNickname}
                />
                <Botao onPress={() => updateNickname(nickname)}>
                  <BotaoTexto>Salvar Nickname</BotaoTexto>
                </Botao>
                <Botao onPress={logout}>
                  <BotaoTexto>Logout</BotaoTexto>
                </Botao>
                <TouchableOpacity onPress={closeProfileModal} style={{ position: 'absolute', top: 10, right: 10 }}>
                  <Icon name="close" size={30} color="white" />
                </TouchableOpacity>
              </ModalConteudo>
            </ModalContainer>
          </Modal>
          
          {/* Modal de Jogo */}
          <Modal visible={modalVisible} transparent animationType="slide">
            <ModalContainer>
              <ModalConteudo>
                <ModalImagem source={selectedGame?.image} />
                <ModalTitulo>{selectedGame?.title}</ModalTitulo>
                <Botao onPress={goToLobby}>
                  <BotaoTexto>Entrar na Sala</BotaoTexto>
                </Botao>
                <TouchableOpacity onPress={closeGameModal} style={{ position: 'absolute', top: 10, right: 10 }}>
                  <Icon name="close" size={30} color="white" />
                </TouchableOpacity>
              </ModalConteudo>
            </ModalContainer>
          </Modal>
        </>
      )}
    </Container>
  );
};

export default Home;
