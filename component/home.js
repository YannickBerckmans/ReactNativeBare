import React, { Component } from 'react';

import { Platform, Text, View, Image, Button, Vibration, StyleSheet } from 'react-native';
import Header from './header';
import { getInstallations } from './API';
import DropDown from './DropDown';
import Display from './Display';

/*
PROPS: other.token : token d'authentification pour les call api
      

       
RETURN: un graphique contenant toutes les infos
*/

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            installationsDic: {},
            installation: "default",
            device: "default",
            response: new Map(),
            isLoading: true,
            devices: {},
            set: false,
            
        };

        this.handleLoading = this.handleLoading.bind(this);
        this.handleDevice = this.handleDevice.bind(this);
        this.handleInstallation = this.handleInstallation.bind(this);
        this.handleInstallationDic = this.handleInstallationDic.bind(this);
    }

    componentDidMount() {
        this.setState({ response: getInstallations(this.handleLoading, this.handleInstallationDic, this.props.other.token) });


    }

    handleInstallationDic(installDic) {
        this.setState({ installationsDic: installDic });
    }

    handleLoading() {
        this.setState({ isLoading: false });

    }

    handleSet(d) {
        this.setState({ set: d });
    }

    handleInstallation(install) {

        this.setState({
            installation: install,
            set: false,
            device: "default"
        });
        this.handleDevice("default");


    }

    handleDevice(dev) {
        this.setState({ device: dev });
        if (Object.keys(this.state.devices).length !== 0 && (this.state.device !== "default" || this.state.installation !== "default")) {
            this.setState({ set: true });
        }

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.installation !== this.state.installation) {
            this.devDic = {}

            if (this.state.installation !== "default") {

                let devList = this.state.response.get(this.state.installation);
                this.handleSet(true)
                for (let dev in devList) {
                    this.devDic[devList[dev]["id"]] = devList[dev]["description"]
                }
                this.setState({ devices: this.devDic })
            }

            if (Object.keys(this.devDic).length === 0) {
                this.handleSet(false)
            }
        }
    }


    render() {

        return (
            <View>
                <Header />

                <View>
                    
                    <View><DropDown optionDic={this.state.installationsDic} onSelect={this.handleInstallation} select={this.state.installation}></DropDown></View>

                    <View>{this.state.set && <DropDown optionDic={this.state.devices} onSelect={this.handleDevice} select={this.state.device}></DropDown>}</View>
                </View>
                {this.state.device !== "default" && <Display device={this.state.device} token={this.props.other.token}></Display>}
            </View>
        )


    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },

    header: {
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center",
        paddingBottom: 10
    },

    chartContainer: {
        height: 200,
        width: 300,
        borderColor: "#000",
        borderWidth: 1
    }
});
export default Home;