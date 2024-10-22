import styled from 'styled-components/native';
import { Animated } from 'react-native';

export const ToastContainer = styled.View`
  position: absolute;
  top: 20px; 
  right: 20px; 
  background-color: ${({ type }) => (type === 'error' ? 'rgba(255, 0, 0, 0.8)' : 'rgb(60, 179, 113)')}; 
  padding: 10px;
  border-radius: 5px;
  z-index: 1000;
`;

export const Texto = styled.Text`
  color: white;
  font-size: 16px;
`;

export const Timer = styled(Animated.View)`
  height: 4px; 
  background-color: rgba(255, 255, 255, 0.7); 
  border-radius: 2px; 
  position: absolute;
  bottom: 0; 
`;
