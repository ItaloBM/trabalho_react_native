import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: rgb(18, 18, 18);
  padding: 10px;
`;

export const Titulo = styled.Text`
  font-size: 32px;
  font-weight: bold;
  color: rgb(0, 255, 136);
  text-align: center;
  margin-bottom: 10px;
`;

export const ChatContainer = styled.View`
  flex: 1;
  margin-bottom: 10px;
`;

export const Mensagem = styled.View`
  background-color: rgb(38, 38, 38);
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 5px;
  max-width: 80%;
  align-self: ${(props) => (props.enviadaPorUsuario ? 'flex-end' : 'flex-start')};
`;

export const MensagemTexto = styled.Text`
  color: rgb(255, 255, 255);
`;

export const Input = styled.TextInput`
  width: 100%;
  height: 50px;
  background-color: rgb(38, 38, 38);
  border-radius: 10px;
  padding: 10px;
  color: rgb(255, 255, 255);
  border-width: 1px;
  border-color: rgb(72, 72, 72);
`;

export const Botao = styled.TouchableOpacity`
  background-color: rgb(0, 255, 136);
  padding: 10px;
  border-radius: 5px;
  align-items: center;
`;

export const BotaoTexto = styled.Text`
  color: rgb(18, 18, 18);
  font-weight: bold;
`;
