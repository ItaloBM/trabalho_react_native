import React, { useState } from 'react';
import { Alert } from 'react-native'; 
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../databases/Firebase';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';  
import { Container, Titulo, Input, Botao, BotaoTexto, Texto, LogoImage, InputContainer, IconOcultar, ErroTexto } from '../styles/LoginStyles';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState(''); 
  const [senhaVisivel, setSenhaVisivel] = useState(false); 
  const navigation = useNavigation();

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, senha)
      .then(() => {
        Alert.alert('Sucesso', 'Login realizado com sucesso!');
        setErro(''); 
        navigation.navigate('Home');
      })
      .catch(error => {
        setErro('Email/senha inválidos');
        Alert.alert('Erro', error.message);
        setTimeout(() => {
          setErro(''); 
        }, 2000);
      });
  };

  return (
    <Container>
      <LogoImage source={{ uri: 'https://static.vecteezy.com/system/resources/thumbnails/007/698/902/small_2x/geek-gamer-avatar-profile-icon-free-vector.jpg' }} />
      <Titulo>Bem-vindo de volta, jogador!</Titulo>
      <Input
        placeholder="Email"
        placeholderTextColor="#999"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <InputContainer>
        <Input
          placeholder="Senha"
          placeholderTextColor="#999"
          secureTextEntry={!senhaVisivel} 
          value={senha}
          onChangeText={setSenha}
        />
        <IconOcultar onPress={() => setSenhaVisivel(!senhaVisivel)}>
          <MaterialIcons name={senhaVisivel ? 'visibility' : 'visibility-off'} size={24} color="#999" />
        </IconOcultar>
      </InputContainer>
      
    
      {erro ? <ErroTexto>{erro}</ErroTexto> : null}
      
      <Botao onPress={handleLogin}>
        <BotaoTexto>Entrar</BotaoTexto>
      </Botao>
      
      <Botao onPress={() => navigation.navigate('Cadastro')}>
        <BotaoTexto>Cadastrar-se</BotaoTexto>
      </Botao>
    </Container>
  );
};

export default Login;
