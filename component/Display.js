import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Chart from './Chart';
import DateSwitch from './DateSwitch';
import { postDeviceDayShow, postDeviceMonthShow } from './API';

/*
PROPS: device : Appareil choisi qui doit etre affiché
       token : token d'authentification pour les call api

       
RETURN: un graphique contenant toutes les infos
*/


class Display extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            statDay: [],
            date: new Date().toISOString().split('T')[0],
            whichType: "date",
            types:["date","month"],
            rangeLow: 0,
            rangeHigh:24,
            index:0,
        };
        this.handleDate = this.handleDate.bind(this);
        this.handleWhichType = this.handleWhichType.bind(this);
        this.handleDateAction = this.handleDateAction.bind(this);
        this.handleIndex = this.handleIndex.bind(this);
    }

    //cycle de vie
    componentDidUpdate(prevprops, prevstate) {
        if (this.state.whichType === "month" && this.state.whichType !== prevstate.whichType) {
            let date = new Date()
            let month = date.getUTCFullYear() + (date.getMonth() < 9 ? "-0" : "-") + (date.getMonth() + 1);
            this.setState({ date: month });
            
        }

        if (this.state.whichType === "date" && this.state.whichType !== prevstate.whichType) {
            let date = new Date().toISOString().split('T')[0];
            this.setState({ date: date });
        }

        if (prevprops.device !== this.props.device || prevstate.date !== this.state.date) {
            this.dateTypecCondition()
            console.log()
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
            .then(result => {this.handleStat(result);})
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
    handleIndex(id){
        this.setState({index : id})
        this.handleWhichType(this.state.types[id])
        
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
        if(this.state.whichType == "date"){
            this.formats = [{"format": "%Y-%-m-%-d/%-Ih%-M", "name": "Time", "type": "date"}, {"name": "Electricity", "type": "number"}]
        }else{
            this.formats = [{"format": "%Y-%-m-%-d", "name": "Time", "type": "date"}, {"name": "Electricity", "type": "number"}]
        }
        
        return (
            <View style={{flex: 2, flexDirection: 'column',justifyContent:'space-between'}}>
                <View style={{ height: 50}}>
                <DateSwitch date={this.state.date}
                    onChangeDate={this.handleDate}
                    type={this.state.whichType}
                    onChangeType={this.handleWhichType}
                    action={this.handleDateAction}
                    index={this.state.index}
                    changeIndex={this.handleIndex} />
                </View>
                <View style={{ height:800, }} >
                {!this.state.isLoading && <Chart yValue={this.formats[1].name} subcaption={this.formats[1].name} unit={"Kwh"} data={this.state.statDay} yTitle={"Consumption"} xTitle={this.state.whichType} format={this.formats} ></Chart>}
                </View>
            </View>
        );
    }
}

export default Display;