import React from 'react';
import { Text, View } from 'react-native';
import { NativeRouter, Route, Link, Redirect } from "react-router-native";
import Loading from './loading';
import Login from './Login';
import Home from './home';
import Nav from './nav';




export default function Router(props){
  
      if(props.isSignin){
        
        return (

          <View>
            
                    
                <Nav toDisconnect={props}></Nav>
                <Text>dszkdekd</Text>
            
            <View>
              
            </View>
          </View>


        );
      }else{
        return (

          <View>
            <Route exact path={"/"}><Login setToken={props.setToken} setSignIn={props.setSignIn}></Login></Route>
            <Redirect to="/" />
            <View>
              <Link to="/"><Text>{props.token}</Text></Link>
              
            </View>
          </View>


        );
      }
      

    
  

}

