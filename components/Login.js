import React, { useState, useEffect } from 'react';
import * as S from '../styles/LoginStyles'; 
import InputContainer from './InputContainer';
import firebase from '../databases/Firebase';

export default function TelaLogin({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [mensagem, setMensagem] = useState("");

  const tentarLogin = () => {
    setMensagem('');

    if (!email || !senha) {
      setMensagem("Por favor, preencha todos os campos.");
      return;
    }

    setCarregando(true);
    
    firebase.auth().signInWithEmailAndPassword(email, senha)
      .then(usuario => {
        setMensagem('Login realizado com sucesso!');

        setTimeout(() => {
          navigation.navigate("Home"); 
          setMensagem(''); 
        }, 1000); 
      })
      .catch(erro => {
        const mensagemErro = obterMensagemPorCodigoDeErro(erro.code);
        setMensagem(mensagemErro);
        
      })
      .finally(() => {
        setCarregando(false); 
      });
  };

  const obterMensagemPorCodigoDeErro = (codigoErro) => {
    switch (codigoErro) {
      case 'auth/invalid-email':
        return 'E-mail/Senha incorretos';
      default:
        return 'Erro na autenticação';
    }
  };

  const irParaCriarConta = () => {
    navigation.navigate("Cadastro"); 
  };

  return (
    <S.Container>
      <S.Titulo>Login</S.Titulo>
      <InputContainer
        icone="envelope"
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
      />
      <InputContainer
        icone="lock"
        placeholder="**********"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />
      <S.BotaoEntrarContainer onPress={tentarLogin} disabled={carregando}>
        <S.BotaoEntrarTexto>Entrar</S.BotaoEntrarTexto>
      </S.BotaoEntrarContainer>
      {mensagem ? <S.ErroTexto>{mensagem}</S.ErroTexto> : null}

      {/* Botão para criar conta */}
      <S.BotaoCriarContaContainer onPress={irParaCriarConta}>
        <S.BotaoCriarContaTexto>Criar Conta</S.BotaoCriarContaTexto>
      </S.BotaoCriarContaContainer>
    </S.Container>
  );
}
