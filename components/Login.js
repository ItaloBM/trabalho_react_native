import React, { useState } from 'react';
import { Alert } from 'react-native';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../databases/Firebase'; // Verifique se o caminho está correto
import { useNavigation } from '@react-navigation/native';
import {
  Container,
  Title,
  Input,
  Button,
  ButtonText,
  LinkText,
  Footer,
} from '../styles/LoginStyles';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation(); // Inicializa a navegação

  const handleLogin = () => {
    console.log("Tentando logar com:", email); // Verifique se o email está correto
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log("Login bem-sucedido"); // Confirma se o login foi bem-sucedido
        Alert.alert('Sucesso', 'Login realizado com sucesso!');
        navigation.navigate('Home'); // Navega para a tela Home
      })
      .catch(error => {
        console.error("Erro ao logar:", error.message); // Mostra o erro no console
        Alert.alert('Erro', error.message);
      });
  };
  

  const handleSignUp = () => {
    // Lógica de criação de conta
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        Alert.alert('Sucesso', 'Conta criada com sucesso!');
        navigation.navigate('Home'); // Navega para a tela Home
      })
      .catch(error => {
        Alert.alert('Erro', error.message); // Exibe erro caso ocorra
      });
  };

  return (
    <Container>
      <Title>Bem-vindo de volta!</Title>

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
        value={password}
        onChangeText={setPassword}
      />

      <Button onPress={handleLogin}>
        <ButtonText>Entrar</ButtonText>
      </Button>

      <Button onPress={handleSignUp}>
        <ButtonText>Criar Nova Conta</ButtonText>
      </Button>

      <Footer>
        <LinkText>Esqueceu sua senha?</LinkText>
      </Footer>
    </Container>
  );
};

export default Login;
