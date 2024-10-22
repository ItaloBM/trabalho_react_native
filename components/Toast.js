
import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { ToastContainer, Texto, Timer } from '../styles/ToastStyles';

const Toast = ({ message, visible, onClose, type }) => {
  const progressAnim = useRef(new Animated.Value(1)).current; 

  useEffect(() => {
    if (visible) {
      progressAnim.setValue(1); 

      Animated.timing(progressAnim, {
        toValue: 0, 
        duration: 5000, 
        useNativeDriver: false,
      }).start(() => {
        onClose(); 
      });
    }
  }, [visible, onClose, progressAnim]);

  if (!visible) return null;

  const widthInterpolate = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'], 
  });

  return (
    <ToastContainer type={type}>
      <Texto>{message}</Texto>
      <Timer style={{ width: widthInterpolate }} />
    </ToastContainer>
  );
};

export default Toast;
