
import React from 'react';
import { FlatList } from 'react-native';
import { LobbyTitle, LobbyItem, LobbyName, PlayerCount } from '../styles/HomeStyles';

const Lobby = ({ selectedCategory, lobbies }) => {
  if (!selectedCategory || lobbies.length === 0) return null;

  return (
    <>
      <LobbyTitle>Lobbies para {selectedCategory.name}</LobbyTitle>
      <FlatList
        data={lobbies}
        renderItem={({ item }) => (
          <LobbyItem>
            <LobbyName>{item.name}</LobbyName>
            <PlayerCount>{item.playerCount} jogadores</PlayerCount>
          </LobbyItem>
        )}
        keyExtractor={(item) => item.id}
      />
    </>
  );
};

export default Lobby;
