import React, { Component } from 'react'
import { Text, View } from 'react-native'
import SegmentedControl from '@react-native-community/segmented-control';
export default class RadioButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
        };
    }
    render() {
        return (
            <View>
                <SegmentedControl
                    values={this.props.labels}
                    selectedIndex={this.props.indexs}
                    onChange={(event) => {
                        this.props.onChanges(event.nativeEvent.selectedSegmentIndex);
                    }}
                />
            </View>
        )
    }
}
