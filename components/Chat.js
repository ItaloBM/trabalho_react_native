import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import io from "socket.io-client";
import Toast from "react-native-toast-message";
import { getAuth } from "firebase/auth"; // Para obter o usuário logado do Firebase
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
  const { lobbyId } = route.params; // Receber o lobbyId da navegação
  const [mensagens, setMensagens] = useState([]); // Histórico de mensagens
  const [novaMensagem, setNovaMensagem] = useState(""); // Mensagem a ser enviada
  const [socket, setSocket] = useState(null); // Instância do socket
  const [usuario, setUsuario] = useState(""); // Nome do usuário logado (ou UID)

  useEffect(() => {
    // Recuperar o IP do servidor a partir da variável de ambiente
    const serverIp = process.env.REACT_APP_SERVER_IP || "192.168.1.6"; // Valor padrão se a variável não estiver definida

    // Conectar ao servidor via Socket.IO com o lobbyId específico
    const newSocket = io(`http://${serverIp}:3000`, {
      query: { lobbyId }, // Passa o lobbyId ao se conectar
    });

    setSocket(newSocket);

    // Recuperar histórico de mensagens do lobby específico
    newSocket.on("historico", (historico) => {
      setMensagens(historico);
    });

    // Receber novas mensagens específicas do lobby
    newSocket.on("novaMensagem", (mensagem) => {
      setMensagens((prevMensagens) => [...prevMensagens, mensagem]);
    });

    // Definir usuário logado (Firebase)
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setUsuario(user.displayName || user.email);
    }

    // Desconectar do servidor ao desmontar
    return () => {
      newSocket.disconnect();
      console.log("Desconectado do servidor");
    };
  }, [lobbyId]);

  const enviarMensagem = () => {
    if (novaMensagem.trim() !== "" && socket) {
      // Criar mensagem com o usuário logado
      const mensagem = {
        texto: novaMensagem,
        usuario: usuario,
        timestamp: new Date(),
        lobbyId, // Enviar o lobbyId junto para o servidor
      };

      // Enviar mensagem ao servidor
      socket.emit("enviarMensagem", mensagem);

      // Limpar input
      setNovaMensagem("");

      // Mostrar notificação
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
