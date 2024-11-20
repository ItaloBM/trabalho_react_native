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
  ModalImagem,
  ModalTitulo,
  PerfilContainer,
  PerfilImagem,
  Nickname,
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
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [nickname, setNickname] = useState('Carregando...');
  const [avatarModalVisible, setAvatarModalVisible] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [newNickname, setNewNickname] = useState('');
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

  const updateNicknameInFirestore = async (uid, newNickname) => {
    try {
      const userDocRef = doc(db, 'usuarios', uid);
      await updateDoc(userDocRef, {
        nickname: newNickname,
      });
      console.log('Nickname atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar nickname no Firestore:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigation.navigate('Login');
    } catch (error) {
      console.error('Erro ao sair:', error);
    }
  };

  const openProfileModal = () => {
    setAvatarModalVisible(true);
    Animated.timing(animation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const closeProfileModal = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => setAvatarModalVisible(false));
  };

  const updateNickname = () => {
    if (newNickname.trim()) {
      setNickname(newNickname);
      updateNicknameInFirestore(user.uid, newNickname);
      closeProfileModal();
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
            <TouchableOpacity onPress={openProfileModal}>
              <Nickname>{nickname}</Nickname>
            </TouchableOpacity>
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

          <Modal visible={avatarModalVisible} transparent animationType="fade">
            <ModalContainer>
              <Animated.View
                style={[{ transform: [{ scale: animation }] }, { width: '80%', backgroundColor: 'rgb(38, 38, 38)', borderRadius: 10, padding: 20 }]}
              >
                <ModalTitulo>Editar Perfil</ModalTitulo>
                <TextInput
                  placeholder="Digite um novo nickname"
                  placeholderTextColor="#888"
                  value={newNickname}
                  onChangeText={setNewNickname}
                  style={{ backgroundColor: '#fff', padding: 10, borderRadius: 5, marginBottom: 10 }}
                />
                <Botao onPress={updateNickname}>
                  <BotaoTexto>Salvar</BotaoTexto>
                </Botao>
                <TouchableOpacity onPress={closeProfileModal} style={{ position: 'absolute', top: 10, right: 10 }}>
                  <Icon name="close" size={30} color="white" />
                </TouchableOpacity>
              </Animated.View>
            </ModalContainer>
          </Modal>

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
