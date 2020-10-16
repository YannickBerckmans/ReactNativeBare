import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-community/picker';
/*
*
*/
export default class DropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible : true,
    };
    
  }

  

  render() {
    let allOption = [];
    let i = 1;
    for (let option in this.props.optionDic) {
        this.text = option
        allOption.push(<Picker.Item key={i} label={this.props.optionDic[option]} value={option} />);
        i++
    }
    

    return (
      <View>
        

        <Picker
        
        selectedValue={this.props.select}
        style={{ height: 50, width: 200 }}
        
        onValueChange={(itemValue)=>{this.props.onSelect(itemValue)}}
    >
        <Picker.Item key={0} label="Click here" value="default" />
        {allOption}
        </Picker>
        </View>
    );
  }
}
