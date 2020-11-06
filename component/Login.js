import React, { Component } from 'react';
import logo from '../logo_seegma.png';
import Input from './input';
import { Text, View, Image, TextInput, Button } from 'react-native';
import { authentification } from './API';
import ErrorDisp from './errorDisp';

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
            value:'ed',
            disp : false,
            titleEr :"Alerte",
            textEr : "",

        }
        this.handlePassword = this.handlePassword.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleError = this.handleError.bind(this);
    }

    handleSignin(login, password) {
        authentification(login, password)
            .then(response => {
                
                if (response["success"] === 0) {
                    this.setState({disp:true, titleEr:"Alerte", textEr: response["explanation"] })

                }
                else {
                    let token = response["data"]["access_tokens"][0];
                    this.setState({ token: token });
                    this.props.setToken(token);
                    this.props.setSignIn(true);
                }
                
            });
    }

    handleError(bool){
        this.setState({disp : bool});
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
                <ErrorDisp title={this.state.titleEr} text={this.state.textEr} disp={this.state.disp} onChange={this.handleError}/>
                

            </View>
        );
    }
}
export default Login;