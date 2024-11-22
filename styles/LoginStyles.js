import styled from 'styled-components/native';
import { Animated } from 'react-native';

export const Container = styled.View`
  flex: 1;
  background-color: #1f1b24;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const LogoImagem = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  margin-bottom: 20px;
  border: 2px solid rgb(0, 255, 136);
`;

export const Titulo = styled(Animated.Text)`
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
  padding-right: 40px; 
`;


export const Icone = styled.TouchableOpacity`
  position: absolute;
  right: 15px; 
  top: 20px;
  bottom: 0;
  justify-content: center; 
  padding: 0px;
`;

export const Botao = styled.TouchableOpacity`
  padding: 15px;
  border-radius: 8px;
  margin-top: 40px;
  width: 100%;
  background-color: black;
  align-items: center;
  box-shadow: 0px 4px 6px rgb(0, 255, 136);
  elevation: 5;
`;

export const BotaoTexto = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
`;

export const Texto = styled.Text`
  font-size: 14px;
  color: #ccc;
  margin-top: 10px;
  text-align: center;
`;
