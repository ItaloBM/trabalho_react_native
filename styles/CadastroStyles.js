import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #1f1b24;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

export const Titulo = styled.Text`
   font-size: 28px;
  color: rgb(0, 255, 136);
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
  letter-spacing: 1px;
`;

export const InputContainer = styled.View`
  width: 100%;
  position: relative;
`;

export const Input = styled.TextInput`
  width: 100%;
  height: 50px;
  background-color: black;
  border-radius: 10px;
  padding: 10px;
  margin-top: 20px;
  font-size: 16px;
  color: rgb(255, 255, 255);
  border-width: 1px;
  border-color: rgb(72, 72, 72);
`;

export const Icone = styled.TouchableOpacity`
  position: absolute;
  right: 15px;
  top: 32px; 
`;

export const Botao = styled.TouchableOpacity`
  width: 100%;
  height: 50px;
   background-color: black;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgb(0, 255, 136);
  margin-top: 40px;
`;

export const BotaoTexto = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 1px;
`;

export const Texto = styled.Text`
  color: rgb(255, 0, 0);  
  margin-top: 10px;
  font-size: 14px;
  text-align: center;
`;
