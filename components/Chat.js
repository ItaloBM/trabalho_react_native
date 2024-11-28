import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import io from "socket.io-client";
import Toast from "react-native-toast-message";
import { getAuth } from "firebase/auth";
import { SERVER_IP } from "@env"; // Importando a variável de ambiente
import {
  Container,
  Titulo,
  Botao,
  BotaoTexto,
  Input,
  ChatContainer,
  Mensagem,
  MensagemTexto,
} from "../styles/ChatStyles";

const Chat = ({ route }) => {
  const { lobbyId } = route.params;
  const [mensagens, setMensagens] = useState([]);
  const [novaMensagem, setNovaMensagem] = useState("");
  const [socket, setSocket] = useState(null);
  const [usuario, setUsuario] = useState("");

  useEffect(() => {
    // Usando o IP do servidor definido no arquivo .env
    const serverIp = SERVER_IP || "192.168.204.116";

    const newSocket = io(`http://${serverIp}:3000`, {
      query: { lobbyId },
    });

    setSocket(newSocket);

    newSocket.on("historico", (historico) => {
      setMensagens(historico);
    });

    newSocket.on("novaMensagem", (mensagem) => {
      setMensagens((prevMensagens) => [...prevMensagens, mensagem]);
    });

    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setUsuario(user.displayName || user.email);
    }

    return () => {
      newSocket.disconnect();
      console.log("Desconectado do servidor");
    };
  }, [lobbyId]);

  const enviarMensagem = () => {
    if (novaMensagem.trim() !== "" && socket) {
      const mensagem = {
        texto: novaMensagem,
        usuario: usuario,
        timestamp: new Date(),
        lobbyId,
      };

      socket.emit("enviarMensagem", mensagem);

      setNovaMensagem("");

      Toast.show({
        type: "success",
        position: "bottom",
        text1: "Mensagem enviada!",
        visibilityTime: 2000,
      });
    }
  };

  return (
    <Container>
      <Titulo>Chat em Tempo Real</Titulo>
      <ChatContainer>
        <FlatList
          data={mensagens}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Mensagem enviadaPorUsuario={item.usuario === usuario}>
              <MensagemTexto>
                <strong>{item.usuario || "Outro usuário"}:</strong> {item.texto}
              </MensagemTexto>
            </Mensagem>
          )}
        />
      </ChatContainer>
      <Input
        value={novaMensagem}
        onChangeText={setNovaMensagem}
        placeholder="Digite sua mensagem..."
      />
      <Botao onPress={enviarMensagem}>
        <BotaoTexto>Enviar</BotaoTexto>
      </Botao>

      <Toast />
    </Container>
  );
};

export default Chat;