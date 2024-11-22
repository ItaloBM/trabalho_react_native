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

const Chat = () => {
  const [mensagens, setMensagens] = useState([]); // Histórico de mensagens
  const [novaMensagem, setNovaMensagem] = useState(""); // Mensagem a ser enviada
  const [socket, setSocket] = useState(null); // Instância do socket
  const [usuario, setUsuario] = useState(""); // Nome do usuário logado (ou UID)

  useEffect(() => {
    // Conectar ao servidor via Socket.IO

    const newSocket = io("http://192.168.1.11:3000"); // Substitua 192.168.1.2 pelo IP da máquina servidora

    setSocket(newSocket);

    // Recuperar histórico ao conectar
    newSocket.on("historico", (historico) => {
      setMensagens(historico); // Definir histórico de mensagens
    });

    // Receber novas mensagens
    newSocket.on("novaMensagem", (mensagem) => {
      setMensagens((prevMensagens) => [...prevMensagens, mensagem]);
    });

    // Definir usuário logado (aqui, usando Firebase para pegar o usuário logado)
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setUsuario(user.displayName || user.email); // Atribuir nome ou e-mail ao usuário
    }

    // Desconectar do servidor ao desmontar
    return () => {
      newSocket.disconnect();
      console.log("Desconectado do servidor");
    };
  }, []);

  const enviarMensagem = () => {
    if (novaMensagem.trim() !== "" && socket) {
      // Criar mensagem com o usuário logado
      const mensagem = {
        texto: novaMensagem,
        usuario: usuario, // Enviar o nome do usuário
        timestamp: new Date(),
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
            <Mensagem>
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
