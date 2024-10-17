import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as S from "../styles/LoginStyles"; 
export default function InputContainer({ value, onChangeText, icone, placeholder, secureTextEntry }) {
  return (
    <S.InputContainer>
      <Icon name={icone} size={20} color="#888" />
      <S.Input
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </S.InputContainer>
  );
}
