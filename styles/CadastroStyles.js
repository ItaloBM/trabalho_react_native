import styled from 'styled-components/native';


export const Container = styled.View`
  flex: 1;
  background-color: rgb(10, 10, 10); 
  justify-content: center;
  align-items: center;
  padding: 20px;
  position: relative; 
`;

export const Titulo = styled.Text`
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  color: rgb(0, 255, 136); 
  text-shadow: 2px 2px 8px rgba(0, 255, 136, 0.7); 
`;


export const Input = styled.TextInput`
  width: 100%;
  height: 50px;
  background-color: rgb(38, 38, 38); 
  border-radius: 10px;
  padding: 10px;
  margin-top: 20px;
  font-size: 16px;
  color: rgb(255, 255, 255); 
  border-width: 1px;
  border-color: rgb(72, 72, 72); 
`;

export const InputContainer = styled.View`
  position: relative;
  width: 100%;
`;

export const IconOcultar = styled.TouchableOpacity`
  position: absolute;
  right: 20px;
  top: 45px;
  margin-top: -12px; 
`;
export const ErroTexto = styled.Text`
  position: absolute; 
  bottom: 160px; 
  left: 20px; 
  color: white;
  padding: 10px;
  background-color: rgba(255, 0, 0, 0.4); 
  border: 2px solid red; 
  border-radius: 5px; 
  font-size: 14px;
  font-weight: bold;
  z-index: 1; 
`;

export const Botao = styled.TouchableOpacity`
  width: 100%;
  height: 50px;
  background-color: rgb(255, 255, 255); 
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-bottom: 15px;
  elevation: 3;
  margin-top: 70px;
`;

export const BotaoTexto = styled.Text`
 color: rgb(0, 0, 0); 
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 1px;
`;
export const LogoImage = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  margin-bottom: 20px;
`;
