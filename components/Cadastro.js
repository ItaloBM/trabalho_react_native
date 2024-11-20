import React, { useState } from 'react';
import { Alert } from 'react-native';
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from 'firebase/auth';
import { auth, db } from '../databases/Firebase'; 
import { useNavigation } from '@react-navigation/native';
import { Container, Titulo, Input, Botao, BotaoTexto, Texto, LogoImage } from '../styles/LoginStyles';
import { doc, setDoc } from 'firebase/firestore'; 

const Cadastro = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmSenha, setConfirmSenha] = useState('');
  const [nickname, setNickname] = useState('');
  const [erro, setErro] = useState('');
  const navigation = useNavigation();

  const handleCadastro = async () => {
    if (senha !== confirmSenha) {
      setErro('As senhas não coincidem');
      return;
    }

    if (!nickname) {
      setErro('Por favor, informe um nickname');
      return;
    }

    try {
      
      const methods = await fetchSignInMethodsForEmail(auth, email);
      if (methods.length > 0) {
        setErro('Este e-mail já está registrado');
        return;
      }

      
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);

      
      const userRef = doc(db, 'usuarios', userCredential.user.uid);
      await setDoc(userRef, {
        nickname: nickname,
        email: email,
        createdAt: new Date(),
      });

      
      navigation.navigate('Login'); 

      Alert.alert('Cadastro realizado com sucesso!');
    } catch (error) {
      setErro('Erro ao realizar cadastro, tente novamente');
      console.error(error.message);
    }
  };

  return (
    <Container>
      <Titulo>Cadastro</Titulo>
      <Input
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <Input
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />
      <Input
        placeholder="Confirmar Senha"
        value={confirmSenha}
        onChangeText={setConfirmSenha}
        secureTextEntry
      />
      <Input
        placeholder="Nickname"
        value={nickname}
        onChangeText={setNickname}
      />
      {erro ? <Texto>{erro}</Texto> : null}
      <Botao onPress={handleCadastro}>
        <BotaoTexto>Cadastrar</BotaoTexto>
      </Botao>
    </Container>
  );
};

export default Cadastro;
