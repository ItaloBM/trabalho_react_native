import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: rgb(18, 18, 18);
  padding: 10px;
  justify-content: center;
`;

export const Titulo = styled.Text`
  font-size: 32px;
  font-weight: bold;
  color: rgb(0, 255, 136); 
  margin-bottom: 20px;
  text-shadow: 2px 2px 8px rgba(0, 255, 136, 0.7);
  text-align: center;
`;

export const Jogos = styled.View`
  width: 250px; 
  height: 300px; /* Aumentar a altura do container */
  padding: 5px;
  margin-vertical: 8px;
  background-color: rgb(38, 38, 38); 
  border-radius: 10px;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 255, 136, 0.4); 
`;

export const ItemTexto = styled.Text`
  color: rgb(255, 255, 255); 
  font-size: 18px;
  text-shadow: 1px 1px 5px rgba(255, 255, 255, 0.3); 
  margin-top: 10px;
`;


export const Botao = styled.TouchableOpacity`
  background-color: rgb(0, 255, 136);
  padding: 10px 20px;
  border-radius: 5px;
  align-items: center;
  margin-top: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

export const BotaoTexto = styled.Text`
  color: rgb(18, 18, 18);
  font-size: 18px;
  font-weight: bold;
`;