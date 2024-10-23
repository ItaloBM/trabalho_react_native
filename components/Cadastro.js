import React, { useState } from 'react';
import { Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../databases/Firebase';
import { useNavigation } from '@react-navigation/native';
import { Container, Titulo, Input, Botao, BotaoTexto, Texto, LogoImage } from '../styles/LoginStyles';

const Cadastro = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmSenha, setConfirmSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigation = useNavigation();

  const handleCadastro = () => {
    if (senha !== confirmSenha) {
      setErro('As senhas não coincidem');
      return;
    }

    console.log("Tentando cadastrar com:", email);
    createUserWithEmailAndPassword(auth, email, senha)
      .then(() => {
        console.log("Cadastro bem-sucedido");
        Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
        setErro('');
        navigation.navigate('Home');
      })
      .catch(error => {
        console.error("Erro ao cadastrar:", error.message);
        setErro(error.message);
        Alert.alert('Erro', error.message);

        setTimeout(() => {
          setErro('');
        }, 2000);
      });
  };

  return (
    <Container>
      <LogoImage source={{ uri: 'https://static.vecteezy.com/system/resources/thumbnails/007/698/902/small_2x/geek-gamer-avatar-profile-icon-free-vector.jpg' }} style={{ width: 100, height: 100 }} />
      <Titulo>Criar Conta</Titulo>
      <Input
        placeholder="Email"
        placeholderTextColor="#999"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <Input
        placeholder="Senha"
        placeholderTextColor="#999"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />
      <Input
        placeholder="Confirmar Senha"
        placeholderTextColor="#999"
        secureTextEntry
        value={confirmSenha}
        onChangeText={setConfirmSenha}
      />
      {erro ? <Texto style={{ color: 'red' }}>{erro}</Texto> : null}
      <Botao onPress={handleCadastro}>
        <BotaoTexto>Cadastrar</BotaoTexto>
      </Botao>
    </Container>
  );
};

export default Cadastro;
