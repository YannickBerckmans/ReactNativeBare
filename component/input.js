import React, { Component, Fragment, } from 'react';
import { TextInput } from 'react-native-paper';



/*
PROPS: onChange : function qui change le state correspondant a l'input
       type : type d'input (text,...)
       value : valeur du champ soit le state correpondant
       placeHolder : valeur dans le champs indiquant la signification de l'input
       required : true or false
       readonly : true or false
       
RETURN: un input controlé
*/


class Input extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.onChange(event)
    }

    

    render() {
        
        return (
            
            <TextInput
                readOnly={this.props.readonly}
                value={this.props.value}
                onChangeText={text => this.handleChange(text)}
                required={this.props.required}
                placeholder={this.props.placeHolder}
                size={this.props.size}
                secureTextEntry={this.props.type === 'password'}
                 />
                
            
        );
    }
}
export default Input;