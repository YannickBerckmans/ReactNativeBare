import React, { Component } from 'react';


import Login from './Login';
import Home from './home';

import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';


/*
PROPS: onRedirection : fonction de redirection pour un button
       toDisconnect : fonction de deconnexion
       
RETURN: Navigation via le drawer
*/


class Nav extends Component {
    constructor(props) {
        super(props);
    }



    render() {
        const Drawer = createDrawerNavigator();
        if (this.props.isSignin) {

            return (
                
                <Drawer.Navigator initialRouteName="Home"
                    drawerContent={props =>
                        <DrawerContentScrollView {...props}>
                            <DrawerItemList {...props} />
                            <DrawerItem
                                label="Disconnect"
                                onPress={() => { this.props.setToken(undefined); this.props.setSignIn(false); }}
                            />

                        </DrawerContentScrollView>}>
                    <Drawer.Screen name="Home" >{props => <Home {...props} other={this.props}></Home>}</Drawer.Screen>
                    
                </Drawer.Navigator>

            );

        } else {
            return (
                <Login setToken={this.props.setToken} setSignIn={this.props.setSignIn}></Login>
            );
        }
    }
}
export default Nav;