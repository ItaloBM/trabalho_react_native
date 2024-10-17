// LoginStyles.js
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #f0f0f5;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

export const Title = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
`;

export const Input = styled.TextInput`
  width: 100%;
  height: 50px;
  background-color: #fff;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 15px;
  font-size: 16px;
  border-width: 1px;
  border-color: #ddd;
`;

export const Button = styled.TouchableOpacity`
  width: 100%;
  height: 50px;
  background-color: #6200ea;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  margin-bottom: 10px;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
`;

export const LinkText = styled.Text`
  color: #6200ea;
  font-size: 14px;
  margin-top: 10px;
  text-decoration: underline;
`;

export const Footer = styled.View`
  align-items: center;
  margin-top: 20px;
`;
