import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './components/Login'; 
import Home from './components/Home'; 
import Lobby from './components/Lobby';
import Chat from './components/Chat'; // Importando a tela de Chat

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{ title: 'Home', headerShown: false }} 
        />
        <Stack.Screen 
          name="Lobby" 
          component={Lobby} 
          options={{ title: 'Lobby', headerShown: true }} 
        />
        <Stack.Screen 
          name="Chat" 
          component={Chat} // Adicionando a tela de Chat
          options={{ title: 'Chat', headerShown: true }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
