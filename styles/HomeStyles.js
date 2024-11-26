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
  width: 210px;
  height: 300px;
  margin-left: 20px;
  padding: 5px;
  margin-vertical: 8px;
  background-color: rgb(38, 38, 38);
  border-radius: 10px;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 255, 136, 0.4);
  overflow: hidden;
`;

export const ItemTexto = styled.Text`
  color: rgb(255, 255, 255);
  font-size: 18px;
  text-shadow: 1px 1px 5px rgba(255, 255, 255, 0.3);
  margin-top: 10px;
  text-align: center;
`;

export const Botao = styled.TouchableOpacity`
  background-color: rgb(0, 255, 136);
  padding: 10px 20px;
  border-radius: 5px;
  align-items: center;
  margin-top: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  transition: background-color 0.3s ease;
  &:hover {
    background-color: rgb(0, 200, 100);
  }
`;

export const BotaoTexto = styled.Text`
  color: rgb(18, 18, 18);
  font-size: 18px;
  font-weight: bold;
`;

export const NavegacaoContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-vertical: 20px;
`;

export const ModalContainer = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.7);
  justify-content: center;
  align-items: center;
  overflow: hidden; /* Adicionado */
`;

export const ModalConteudo = styled.View`
  background-color: rgb(38, 38, 38);
  border-radius: 10px;
  padding: 20px;
  align-items: center;
  width: 80%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  overflow: hidden; /* Adicionado */
`;


export const ModalImagem = styled.Image`
  width: 90px;
  height: 90px;
  border-radius: 10px;
`;

export const ModalTitulo = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: rgb(0, 255, 136);
  margin-bottom: 10px;
`;

export const PerfilContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 100px;
`;

export const PerfilImagem = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-right: 10px;
`;

export const Nickname = styled.Text`
  color: rgb(0, 255, 136);
  font-size: 18px;
  font-weight: bold;
  text-shadow: 1px 1px 5px rgba(0, 255, 136, 0.3);
`;



