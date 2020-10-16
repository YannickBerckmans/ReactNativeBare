import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Chart from './Chart';
import DateSwitch from './DateSwitch';
import { postDeviceDayShow, postDeviceMonthShow } from './API';
import RangeSlider from 'rn-range-slider';

class Display extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            statDay: [],
            date: new Date().toISOString().split('T')[0],
            whichType: "date",
            rangeLow: 0,
            rangeHigh:24,
        };
        this.handleDate = this.handleDate.bind(this);
        this.handleWhichType = this.handleWhichType.bind(this);
        this.handleDateAction = this.handleDateAction.bind(this);
    }
    componentDidUpdate(prevprops, prevstate) {
        if (this.state.whichType === "month" && this.state.whichType !== prevstate.whichType) {
            let date = new Date()
            let month = date.getUTCFullYear() + (date.getMonth() < 10 ? "-0" : "-") + (date.getMonth() + 1);
            this.setState({ date: month });
        }

        if (this.state.whichType === "date" && this.state.whichType !== prevstate.whichType) {
            let date = new Date().toISOString().split('T')[0];
            this.setState({ date: date });
        }

        if (prevprops.device !== this.props.device || prevstate.date !== this.state.date) {
            this.dateTypecCondition()
        }

    }
    componentDidMount() {
        if (this.props.device !== undefined) {
            this.dateTypecCondition()
        }
    }

    //others
    updateDay() {
        postDeviceDayShow(this.props.device, this.state.date, this.props.token)
            .then(result => this.handleStat(result))
            .then(this.setState({ isLoading: false }));
    }

    updateMonth() {
        postDeviceMonthShow(this.props.device, this.state.date, this.props.token)
            .then(result => this.handleStat(result))
            .then(this.setState({ isLoading: false }));
    }

    dateTypecCondition() {
        if (this.state.whichType === "date") {
            this.updateDay();
        }
        else if (this.state.whichType === "month") {
            this.updateMonth();
        }
    }
    handleDate(newDate) {
        this.setState({ date: newDate });
    }

    handleWhichType(type) {
        this.setState({ whichType: type });
    }

    handleStat(result) {
        this.setState({ statDay: result });
    }

    handleDateAction(operation) {
        let date = new Date(this.state.date)


        if (this.state.whichType === "month") {
            (operation === "addition" ? date.setMonth(date.getMonth() + 1) : date.setMonth(date.getMonth() - 1));
            this.setState({ date: date.toISOString().split('T')[0].match(/(^[0-9 -]{5})\w+/)[0] })
        }

        if (this.state.whichType === "date") {
            (operation === "addition" ? date.setDate(date.getDate() + 1) : date.setDate(date.getDate() - 1));
            this.setState({ date: date.toISOString().split('T')[0] })
        }
    }

    render() {
        
        return (
            <View>
                <DateSwitch date={this.state.date}
                    onChangeDate={this.handleDate}
                    type={this.state.whichType}
                    onChangeType={this.handleWhichType}
                    action={this.handleDateAction} />
                    
                <Chart data={this.state.statDay} yTitle={"Consumption"} xTitle={this.state.whichType} domainMin={this.state.rangeLow} domainMax={this.state.rangeHigh}></Chart>
                
            </View>
        );
    }
}

export default Display;
/*
<RangeSlider
                    style={{ width: 160, height: 80,}}
                    gravity={'center'}
                    min={0}
                    max={24}
                    step={1}
                    selectionColor="#3df"
                    blankColor="#f618"
                    onValueChanged={(low, high, fromUser) => {
                        this.setState({ rangeLow: low, rangeHigh: high })
                    }} /> */