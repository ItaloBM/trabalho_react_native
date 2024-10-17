import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

export const Title = styled.Text`
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
`;

export const SearchInput = styled.TextInput`
  border-width: 1px;
  border-color: #ccc;
  padding: 10px;
  margin-bottom: 10px;
  width: 100%;
  border-radius: 5px;
`;

export const CategoryItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

export const CategoryImage = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 5px;
  margin-right: 10px;
`;

export const CategoryName = styled.Text`
  font-size: 18px;
`;

export const LobbyTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-top: 20px;
`;

export const LobbyItem = styled.View`
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 5px;
  margin-bottom: 10px;
  width: 100%;
`;

export const LobbyName = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

export const PlayerCount = styled.Text`
  font-size: 14px;
  color: #666;
`;

export const LogoutBotao = styled.TouchableOpacity`
  background-color: red;
  padding: 15px 25px;
  border-radius: 25px;
  margin-top: 20px;
  align-self: baseline;
  align-items: center;
`;

export const LogoutBotaoTexto = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: bold;
`;
