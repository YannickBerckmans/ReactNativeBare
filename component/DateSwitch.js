import React, { Component, useState } from 'react';
import { View, Text, Button, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';        

export default function DateSwitch(props){
    const [date, setDate] = useState(new Date(props.date));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
  
    const onChange = (event, selectedDate) => {
      const currentDate = new Date(selectedDate);
      setShow(Platform.OS === 'ios');
      setDate(currentDate);
      props.onChangeDate(currentDate.toISOString().split('T')[0]);
     
    };
  
    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };
  
    const showDatepicker = () => {
      showMode('date');
    };
  

  
    return (
      <View>
        <View>
          <Button onPress={showDatepicker} title="Show date picker!" />
        </View>

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
      </View>
    );
}

