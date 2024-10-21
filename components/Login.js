import React, { useState } from 'react';
import { Alert } from 'react-native'; 
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../databases/Firebase';
import { useNavigation } from '@react-navigation/native';
import { Container, Titulo, Input, Botao, BotaoTexto, Texto, LogoImage } from '../styles/LoginStyles';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigation = useNavigation();

  const handleLogin = () => {
    console.log("Tentando logar com:", email);
    signInWithEmailAndPassword(auth, email, senha)
      .then(() => {
        console.log("Login bem-sucedido");
        Alert.alert('Sucesso', 'Login realizado com sucesso!');
        navigation.navigate('Home');
      })
      .catch(error => {
        console.error("Erro ao logar:", error.message);
        Alert.alert('Erro', error.message);
      });
  };

  return (
    <Container>

      <LogoImage source={{ uri: 'https://static.vecteezy.com/system/resources/thumbnails/007/698/902/small_2x/geek-gamer-avatar-profile-icon-free-vector.jpg' }} style={{ width: 100, height: 100 }} />
      <Titulo>Bem-vindo de volta, jogador!</Titulo>
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
      <Texto>
        Esqueceu a senha?
      </Texto>
      <Botao onPress={handleLogin}>
        <BotaoTexto>Entrar</BotaoTexto>
      </Botao>
    </Container>
  );
};

export default Login;
