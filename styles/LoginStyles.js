import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 16px;
  background-color: #f8f8f8; /* Fundo claro */
`;

export const Titulo = styled.Text`
  font-size: 28px;
  margin-bottom: 20px;
  text-align: center;
  color: #333; 
`;

export const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
`;

export const Input = styled.TextInput`
  flex: 1;
  padding: 10px;
`;

export const BotaoEntrarContainer = styled.TouchableOpacity`
  background-color: green; 
  padding: 15px;
  align-items: center;
  border-radius: 5px;
  margin-top: 10px;
`;

export const BotaoEntrarTexto = styled.Text`
  color: white;
  font-size: 16px;
`;

export const ErroTexto = styled.Text`
  color: red;
  margin-top: 10px;
  text-align: center;
`;

export const BotaoCriarContaContainer = styled.TouchableOpacity`
  background-color: blue; 
  padding: 15px;
  align-items: center;
  border-radius: 5px;
  margin-top: 10px;
`;

export const BotaoCriarContaTexto = styled.Text`
  color: white;
  font-size: 16px;
`;
