import React, { useState } from 'react';
import { Alert, TouchableOpacity, View } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../databases/Firebase';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons'; 
import { Container, Titulo, Input, Botao, BotaoTexto, ErroTexto, LogoImage, InputContainer, IconOcultar } from '../styles/CadastroStyles';

const Cadastro = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmSenha, setConfirmSenha] = useState('');
  const [erro, setErro] = useState('');
  const [senhaVisivel, setSenhaVisivel] = useState(false); 
  const [confirmSenhaVisivel, setConfirmSenhaVisivel] = useState(false); 
  const navigation = useNavigation();

  const handleCadastro = () => {
    if (!email || !senha || !confirmSenha) {
      setErro('Preencha todos os campos');
      return;
    }

    if (senha !== confirmSenha) {
      setErro('As senhas não coincidem');
      return;
    }

    createUserWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
        setErro('');
        navigation.navigate('Login'); 
      })
      .catch(error => {
        let errorMessage = error.message;

        if (error.code === 'auth/weak-password') {
          errorMessage = 'A senha não pode ter menos de 6 caracteres';
        } else if (error.code === 'auth/invalid-email') {
          errorMessage = 'O e-mail informado é inválido';
        } else if (error.code === 'auth/missing-password') {
          errorMessage = 'Preencha todos os campos';
        }

        setErro(errorMessage);
        Alert.alert('Erro', errorMessage);

        setTimeout(() => {
          setErro('');
        }, 2000);
      });
  };

  return (
    <Container>
      <LogoImage
        source={{ uri: 'https://static.vecteezy.com/system/resources/thumbnails/007/698/902/small_2x/geek-gamer-avatar-profile-icon-free-vector.jpg' }}
      />
      <Titulo>Criar Conta</Titulo>
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
      <InputContainer>
        <Input
          placeholder="Confirmar Senha"
          placeholderTextColor="#999"
          secureTextEntry={!confirmSenhaVisivel}
          value={confirmSenha}
          onChangeText={setConfirmSenha}
        />
        <IconOcultar onPress={() => setConfirmSenhaVisivel(!confirmSenhaVisivel)}>
          <MaterialIcons name={confirmSenhaVisivel ? 'visibility' : 'visibility-off'} size={24} color="#999" />
        </IconOcultar>
      </InputContainer>
      {erro ? <ErroTexto>{erro}</ErroTexto> : null}
      <Botao onPress={handleCadastro}>
        <BotaoTexto>Cadastrar</BotaoTexto>
      </Botao>
    </Container>
  );
};

export default Cadastro;
