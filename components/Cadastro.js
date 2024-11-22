import React, { useState, useEffect } from 'react';
import { Alert, Animated } from 'react-native';
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from 'firebase/auth';
import { auth, db } from '../databases/Firebase'; 
import { useNavigation } from '@react-navigation/native';
import { Container, Titulo, Input, Botao, BotaoTexto, Texto, Icone, InputContainer } from '../styles/CadastroStyles';
import { doc, setDoc } from 'firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialIcons';  

const Cadastro = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmSenha, setConfirmarSenha] = useState('');
  const [nickname, setNickname] = useState('');
  const [erro, setErro] = useState('');
  const [senhaVisivel, setSenhaVisivel] = useState(false);  
  const [confirmarsenhaVisivel, setConfirmarSenhaVisivel] = useState(false);  
  const [fadeAnim] = useState(new Animated.Value(0)); 
  const navigation = useNavigation();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleCadastro = async () => {
    
    if (!email || !senha || !confirmSenha || !nickname) {
      setErro('Preencha todos os campos');
      return;
    }

    if (senha !== confirmSenha) {
      setErro('As senhas não coincidem');
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
    <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
      <Container>
        <Titulo>Cadastro</Titulo>

        <InputContainer>
          <Input
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </InputContainer>

        <InputContainer>
          <Input
            placeholder="Senha"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry={!senhaVisivel}
          />
          <Icone onPress={() => setSenhaVisivel(!senhaVisivel)}>
            <Icon name={senhaVisivel ? 'visibility-off' : 'visibility'} size={24} color="rgb(255, 255, 255)" />
          </Icone>
        </InputContainer>

        <InputContainer>
          <Input
            placeholder="Confirmar Senha"
            value={confirmSenha}
            onChangeText={setConfirmarSenha}
            secureTextEntry={!confirmarsenhaVisivel}
          />
          <Icone onPress={() => setConfirmarSenhaVisivel(!confirmarsenhaVisivel)}>
            <Icon name={confirmarsenhaVisivel ? 'visibility-off' : 'visibility'} size={24} color="rgb(255, 255, 255)" />
          </Icone>
        </InputContainer>

        <InputContainer>
          <Input
            placeholder="Nickname"
            value={nickname}
            onChangeText={setNickname}
          />
        </InputContainer>

        {erro ? <Texto>{erro}</Texto> : null}

        <Botao onPress={handleCadastro}>
          <BotaoTexto>Cadastrar</BotaoTexto>
        </Botao>
      </Container>
    </Animated.View>
  );
};

export default Cadastro;
