import React, { useState, useEffect } from 'react';
import { Alert, Animated } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore'; // Importar funções do Firestore
import { auth, db } from '../databases/Firebase'; // Firebase config
import { useNavigation } from '@react-navigation/native';
import {Container,Titulo,InputContainer,Input,Botao,BotaoTexto,Texto,LogoImagem,Icone,} from '../styles/LoginStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const navigation = useNavigation();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleLogin = () => {
    console.log('Tentando logar com:', email);
    signInWithEmailAndPassword(auth, email, senha)
      .then(async (userCredential) => {
        console.log('Login bem-sucedido');
        
        // Obtendo o usuário autenticado
        const user = userCredential.user;

        // Verificando se o usuário tem dados adicionais no Firestore (como perfil)
        const userRef = doc(db, 'usuarios', user.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          // Usuário encontrado e com dados completos
          Alert.alert('Sucesso', 'Login realizado com sucesso!');
          setErro('');
          navigation.navigate('Home');
        } else {
          // Caso o usuário não tenha dados no Firestore
          Alert.alert('Erro', 'Este usuário não está completamente cadastrado.');
          setErro('Cadastro incompleto');
        }
      })
      .catch(error => {
        console.error('Erro ao logar:', error.message);
        setErro('Email/senha inválidos');
        Alert.alert('Erro', error.message);

        setTimeout(() => {
          setErro('');
        }, 2000);
      });
  };

  return (
    <Container>
      <LogoImagem
        source={{
          uri: 'https://static.vecteezy.com/system/resources/thumbnails/007/698/902/small_2x/geek-gamer-avatar-profile-icon-free-vector.jpg',
        }}
      />
      <Titulo style={{ opacity: fadeAnim }}>
        Bem-vindo de volta, jogador!
      </Titulo>

      <InputContainer>
        <Input
          placeholder="Email"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      </InputContainer>

      <InputContainer>
        <Input
          placeholder="Senha"
          placeholderTextColor="#999"
          secureTextEntry={!senhaVisivel}
          value={senha}
          onChangeText={setSenha}
        />
        <Icone onPress={() => setSenhaVisivel(!senhaVisivel)}>
          <Icon
            name={senhaVisivel ? 'visibility-off' : 'visibility'}
            size={24}
            color="rgb(255, 255, 255)"
          />
        </Icone>
      </InputContainer>

      {erro ? <Texto style={{ color: 'red' }}>{erro}</Texto> : null}

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
