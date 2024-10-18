import React, { useRef, useState } from 'react';
import { FlatList, Image, View, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Importando ícones
import {
  Container,
  Titulo,
  Jogos,
  ItemTexto,
  Botao,
  BotaoTexto,
} from '../styles/HomeStyles';

const gamesData = [
  { id: '1', title: 'Rainbow Six Siege', image: require('../img/r6.png') },
  { id: '2', title: 'Counter Strike 2', image: require('../img/cs2.png') },
  { id: '3', title: 'Fortnite', image: require('../img/fortnite.png') },
  // Adicione mais jogos conforme necessário
];

const Home = () => {
  const flatListRef = useRef(null); // Referência para o FlatList
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);

  const scrollToIndex = (index) => {
    flatListRef.current.scrollToIndex({ animated: true, index });
  };

  const openModal = (game) => {
    setSelectedGame(game);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedGame(null);
  };

  return (
    <Container>
      <Titulo>Jogos Disponíveis</Titulo>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => scrollToIndex(0)}>
          <Icon name="chevron-back" size={30} color="rgb(0, 255, 136)" />
        </TouchableOpacity>
        
        <FlatList
          ref={flatListRef} // Adicionando a referência aqui
          data={gamesData}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 10 }}
          renderItem={({ item, index }) => (
            <Jogos style={{ marginHorizontal: 10 }}>
              <TouchableOpacity onPress={() => openModal(item)}>
                <Image 
                  source={item.image} 
                  style={{ width: 120, height : 180, borderRadius: 8 }} 
                />
                <ItemTexto>{item.title}</ItemTexto>
              </TouchableOpacity>
            </Jogos>
          )}
        />
        
        <TouchableOpacity onPress={() => scrollToIndex(gamesData.length - 1)}>
          <Icon name="chevron-forward" size={30} color="rgb(0, 255, 136)" />
        </TouchableOpacity>
      </View>

      {/* Modal para buscar lobby */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
          <View style={{ width: 300, padding: 20, backgroundColor: 'white', borderRadius: 10 }}>
            {selectedGame && (
              <>
                <Image 
                  source={selectedGame.image} 
                  style={{ width: 100, height: 150, borderRadius: 8, alignSelf: 'center' }} 
                />
                <ItemTexto style={{ textAlign: 'center', marginVertical: 10 }}>{selectedGame.title}</ItemTexto>
                
                <Botao onPress={() => {/* Lógica para buscar lobby */}}>
                  <BotaoTexto>Buscar Lobby</BotaoTexto>
                </Botao>
                
                <Botao onPress={closeModal}>
                  <BotaoTexto>Fechar</BotaoTexto>
                </Botao>
              </>
            )}
          </View>
        </View>
      </Modal>
    </Container>
  );
};

export default Home;