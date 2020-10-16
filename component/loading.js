import logo from '../logo_seegma.png';
import React from 'react';
import styled, { keyframes } from 'styled-components/native';
import { Text, View, Image, StyleSheet} from 'react-native';


export default function Loading(){
    
    return(
        <View>
            
            <Text>sss</Text>
            <Image source={logo} alt="seegma_logo"/>
            
        </View>
    )
}
const styles = StyleSheet.create({
    
        container: {
            flex: 1,
            padding: 24,
            backgroundColor: '#fff',
          },
    
    bigBlue: {
      color: 'blue',
      fontWeight: 'bold',
      fontSize: 30,
    },
    red: {
      color: 'red',
    },
  });