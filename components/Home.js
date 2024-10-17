// Home.js
import React, { useState } from "react";
import { ImageBackground } from "react-native";

import {
  Container,
  Title,
  LogoutBotao,
  LogoutBotaoTexto,
} from "../styles/HomeStyles";
import Busca from "./Busca";
import Lobby from "./Lobby";

const Home = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categories] = useState([
    { id: "1", name: "R6", image: require("../img/gs.png") },
    { id: "2", name: "GTA", image: require("../img/lol.png") },
    { id: "3", name: "Categoria 3", image: require("../img/r6.png") },
  ]);

  const [lobbies, setLobbies] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    // Simulação de busca de lobbies
    const fetchedLobbies = [
      { id: "1", name: "Lobby 1", playerCount: 3 },
      { id: "2", name: "Lobby 2", playerCount: 5 },
      { id: "3", name: "Lobby 3", playerCount: 2 },
    ];
    setLobbies(fetchedLobbies); // Atualiza o estado dos lobbies
  };

  return (
    <ImageBackground
      source={require("../img/gs")}
      style={{ flex: 1, width: "100%" }}
    >
      <Container>
        <Title>Bem-vindo à Rede Social de Games!</Title>
        <Busca
          searchQuery={searchQuery}
          handleSearch={handleSearch}
          categories={categories}
          handleSelectCategory={handleSelectCategory}
        />
        <Lobby selectedCategory={selectedCategory} lobbies={lobbies} />
        <LogoutBotao onPress={() => navigation.navigate("Login")}>
          <LogoutBotaoTexto>Sair</LogoutBotaoTexto>
        </LogoutBotao>
      </Container>
    </ImageBackground>
  );
};

export default Home;
