import styled from 'styled-components/native';
import { TouchableOpacity, Text, View, TextInput } from 'react-native';

export const Container = styled(View)`
  flex: 1;
  background-color: rgb(10, 10, 10); 
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

export const Titulo = styled(Text)`
  color: rgb(0, 255, 136); 
  text-shadow: 2px 2px 8px rgba(0, 255, 136, 0.7); 
  font-size: 24px;
  margin-bottom: 20px;
`;

export const Botao = styled(TouchableOpacity)`
  width: 70%;
  height: 50px;
  background-color: rgb(0, 255, 136);
 box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-bottom: 15px;
  elevation: 3;
`;

export const BotaoTexto = styled(Text)`
   color: rgb(0, 0, 0); 
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 1px;
`;

export const LobbyContainer = styled(View)`
  padding: 10px; 
  background-color: #555; 
  border-radius: 5px;
  align-self: center; 
`;

export const LobbyNome = styled(Text)`
  color: white; /* Cor do nome do lobby */
  font-size: 18px;
`;

export const LobbyMembros = styled(Text)`
  color: rgb(0, 255, 136); 
  text-shadow: 2px 2px 8px rgba(0, 255, 136, 0.7); 
  font-size: 14px;
`;

export const ModalContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgb(10, 10, 10); 
  padding: 20px;
`;

export const ModalTitulo = styled(Text)`
  font-size: 20px;
  margin-bottom: 20px;
 color: rgb(0, 255, 136); 
  text-shadow: 2px 2px 8px rgba(0, 255, 136, 0.7);  
`;

export const ModalInput = styled(TextInput)`
  background-color: rgb(38, 38, 38); 
  border-radius: 5px;
  padding: 10px;
  border-color: rgb(72, 72, 72); 
  margin-bottom: 10px;
  color: rgb(255, 255, 255); 
  
`;
