import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: rgb(18, 18, 18); 
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

export const Titulo = styled.Text`
  font-size: 32px;
  font-weight: bold;
  color: rgb(0, 255, 136); 
  margin-bottom: 30px;
  text-shadow: 2px 2px 8px rgba(0, 255, 136, 0.7); 
`;

export const Input = styled.TextInput`
  width: 100%;
  height: 50px;
  background-color: rgb(38, 38, 38); 
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 20px;
  font-size: 16px;
  color: rgb(255, 255, 255); 
  border-width: 1px;
  border-color: rgb(72, 72, 72); 
`;

export const Botao = styled.TouchableOpacity`
  width: 100%;
  height: 50px;
  background-color: rgb(255, 50, 50); 
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-bottom: 15px;
  elevation: 3;
  box-shadow: 0 4px 10px rgba(255, 50, 50, 0.6); 
`;

export const BotaoTexto = styled.Text`
  color: rgb(255, 255, 255); 
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 1px;
`;
