import React, { Component } from 'react';
import logo from '../logo_seegma.png';
import Input from './input';
import { Text, View, Image, TextInput, Button } from 'react-native';
import { authentification } from './API';

/*
PROPS: onSignIn(login,password) : function d'authentification
       
RETURN: Module de login

*/
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: "jujubeberhot",
            login: "juju_beber",
            value:'ed'
        }
        this.handlePassword = this.handlePassword.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleSignin(login, password) {
        authentification(login, password)
            .then(response => {
                if (typeof response === "string") {

                    this.setState({ token: response });
                    this.props.setToken(response);
                    this.props.setSignIn(true);

                }
            });
    }

    handlePassword(text) {
        this.setState({ password: text });
    }

    handleLogin(text) {
        this.setState({ login: text });
    }

    render() {


        return (
            <View>
                <Image source={logo} alt="seegma_logo"></Image>
                <Input type={"text"} required={true} readonly={false} value={this.state.login} onChange={this.handleLogin} placeHolder={"Login"}></Input>
                <Input type={"password"} required={true} readonly={false} value={this.state.password} onChange={this.handlePassword} placeHolder={"Password"}></Input>
                <Button onPress={() => this.handleSignin(this.state.login, this.state.password)} title={"Sign-In"} />
                
            </View>
        );
    }
}
export default Login;