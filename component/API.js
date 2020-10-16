
import {   createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem, } from '@react-navigation/drawer';
var url = "https://www.seegma.be/api/v1/"
import React, { Component } from 'react';
export function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Disconnect"
          
        />
      </DrawerContentScrollView>
    );
  }

export function getInstallations(load, instalList, token) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    const installations = new Map();
    let installList = {};
    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    // Simple GET request using fetch
    fetch(url + "installations", requestOptions)
        .then(response => response.text())
        .then(result => JSON.parse(result))
        .then(json => {
            for (let key in json["data"]) {
                let installName = json["data"][key]["name"];
                installList[installName] = installName;
                let devices = [];
                for (let install in json["data"][key]["monitoring_systems"]["data"]) {

                    for (let device in json["data"][key]["monitoring_systems"]["data"][install]["devices"]["data"]) {
                        devices.push(json["data"][key]["monitoring_systems"]["data"][install]["devices"]["data"][device]);
                    }
                }
                installations.set(installName, devices)
            }
        })//make a map of the installations with their id
        .then(() => { load(); instalList(installList); })
        .catch(error => console.log('error', error));

    return installations;
}

export async function postDeviceDayShow(deviceId, date, token) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    var formdata = new FormData();
    formdata.append("timeframe", date);
    let statDay = [];
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };
    //console.log(url + "devices/"+ deviceId +"/day/show")
    await fetch(url + "devices/" + deviceId + "/day/show", requestOptions)
        .then(response => response.text())
        .then(result => { statDay = JSON.parse(result); })
        .catch(error => console.log('error', error));

    return statDay;
}

export async function postDeviceMonthShow(deviceId, date,token) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    var formdata = new FormData();
    formdata.append("timeframe", date);
    let statMonth = [];
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    await fetch(url + "devices/" + deviceId + "/month/show", requestOptions)
        .then(response => response.text())
        .then(result => { statMonth = JSON.parse(result); })
        .catch(error => console.log('error', error));

    return statMonth;
}

export async function authentification(login,password) {

    var formdata = new FormData();
    formdata.append("email", login);
    formdata.append("password", password);

    
    let data = {};

    await fetch(url + "customers/login", {
        method: 'POST',
        body: formdata,

    }).then(response => response.text())
        .then(result => data = JSON.parse(result))
        .catch(error => console.log('error', error));
    
    if (data["success"] === 0) {
        return false
    }
    else {
        let token = data["data"]["access_tokens"][0];
        return token
    }


}



