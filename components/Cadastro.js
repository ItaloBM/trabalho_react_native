import React, { useState } from 'react';
import { Button, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Container, Title, Input, ErrorMessage } from '../styles/CadastroStyles'; 

const Cadastro = () => {
  const navigation = useNavigation();

  const [nome, setNome] = useState('');
  const [regiao, setRegiao] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erroMensagem, setErroMensagem] = useState(''); 

  const handleCadastro = () => {
    if (!nome || !regiao || !email || !senha) {
      setErroMensagem('Por favor, preencha todos os campos.'); 
      return; 
    }
    setErroMensagem(''); 
    navigation.navigate('Login'); 
  };

  return (
    <Container>
      <Title>Cadastro</Title>
      <Input 
        placeholder="Nome" 
        value={nome} 
        onChangeText={setNome} 
      />
      <Input 
        placeholder="Região" 
        value={regiao} 
        onChangeText={setRegiao} 
      />
      <Input 
        placeholder="Email" 
        value={email} 
        onChangeText={setEmail} 
      />
      <Input 
        placeholder="Senha" 
        secureTextEntry 
        value={senha} 
        onChangeText={setSenha} 
      />
      {erroMensagem ? (
        <ErrorMessage>{erroMensagem}</ErrorMessage>
      ) : null}
      <Button title="Cadastrar" onPress={handleCadastro} />
    </Container>
  );
};

export default Cadastro;
