import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 20px;
`;

export const Title = styled.Text`
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
`;

export const Input = styled.TextInput`
  border-width: 1px;
  border-color: #ccc;
  margin-bottom: 15px;
  padding: 10px;
`;

export const ErrorMessage = styled.Text`
  color: red;
  margin-bottom: 10px;
  text-align: center; 
`;
