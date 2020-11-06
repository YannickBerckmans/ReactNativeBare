import React, { Component, useState, useCallback } from 'react';
import { View, Text, Button, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';        
import { Headline } from 'react-native-paper';
import MonthPicker from 'react-native-month-year-picker';
import RadioButton from './RadioButton';

/*
PROPS: onChangeDate : Methode demandant la nouvelle date
      action : methode demandant "soustraction" ou "addittion" a faire sur la date
      date : date actuelle
      index : index du radio buttons
      changeIndesx :  methode pour le changement d'index du radio buttons
       
RETURN: un graphique contenant toutes les infos
*/

export default function DateSwitch(props){

    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const [date, setDate] = useState(new Date());
    const [shows, setShows] = useState(false);

    const onChange = (event, selectedDate) => {
      const currentDate = new Date(selectedDate);
      setShow(Platform.OS === 'ios');
      props.onChangeDate(currentDate.toISOString().split('T')[0]);
     
    };
  
    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };
  
    const showDatepicker = () => {
      showMode('date');
    };
    const showPicker = useCallback((value) => setShow(value), []);
    const onValueChange = useCallback(
      (event, newDate) => {
        console.log(newDate)
        const selectedDate = new Date(newDate);
        selectedDate.setMonth(selectedDate.getMonth() + 1)
        
        showPicker(false);
        setDate(selectedDate);
        props.onChangeDate(selectedDate.toISOString().split('T')[0].match(/(^[0-9 -]{5})\w+/)[0])
      },
      [date, showPicker],
    );  

  
    return (
      
      <View>
          <RadioButton labels={['Day','Month']} indexs={props.index} onChanges={props.changeIndex}></RadioButton>
        <View style={{flex: 1, flexDirection: 'row', alignSelf: 'center',}}>
          <View style={{ height: 50}}>
          <Button onPress={() => props.action("soustraction")} title="-"/>
          </View>
          <View style={{ height: 50}}>
          <Button onPress={showDatepicker} title={props.date} />
          </View>
          <View style={{ height: 50}}>
          <Button onPress={() => props.action("addition")} title="+"/>
          </View>
        </View>
        
        {(show && props.index === 0 )&& (
          <DateTimePicker
            testID="dateTimePicker"
            value={new Date(props.date)}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
         {(show && props.index === 1) && (
        <MonthPicker
          onChange={onValueChange}
          minimumDate={new Date(2010)}
          maximumDate={new Date(2025, 5)}
          value={new Date()}

        />
      )}
      </View>
    );
}

