import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

import Nav from './component/nav'
import { NavigationContainer,DrawerActions } from '@react-navigation/native';
export default function App() {

  const [isLoggin, setLoggin] = useState(false);
  const [token, setToken] = useState(undefined);

  return (
    <PaperProvider>
    <NavigationContainer>
    <Nav isSignin={isLoggin} setToken={setToken} token={token} setSignIn={setLoggin}></Nav>
    </NavigationContainer>
    </PaperProvider>
  );
}


