import React, { Component } from 'react';

import { Platform, Text, View, Image, Button, Vibration, StyleSheet } from 'react-native';
import Header from './header';
import { getInstallations } from './API';
import DropDown from './DropDown';
import Display from './Display';
import FusionCharts from "react-native-fusioncharts";
import {
    SlideAreaChart,
    SlideBarChart,
    SlideBarChartProps,
    SlideAreaChartProps,
    YAxisProps,
    XAxisProps,
    XAxisLabelAlignment,
    YAxisLabelAlignment,
    CursorProps,
    ToolTipProps,
    ToolTipTextRenderersInput,
    GradientProps,

} from 'react-native-slide-charts'

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
            set: false
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


    handleZoom(domain) {
        this.setState({ selectedDomain: domain });
    }

    handleBrush(domain) {
        this.setState({ zoomDomain: domain });
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
        const chartData = [
            { label: new Date(2018, 11, 26, 0, 0, 0, 0), value: 5 },
            { label: new Date(2018, 11, 26, 1, 0, 0, 0), value: 6 },
            { label: new Date(2018, 11, 26, 2, 0, 0, 0), value: 11 },
            { label: new Date(2018, 11, 26, 3, 0, 0, 0), value: 50 },
            { label: new Date(2018, 11, 26, 4, 0, 0, 0), value: 3 },
            { label: new Date(2018, 11, 26, 5, 0, 0, 0), value: 34 },
            { label: new Date(2018, 11, 26, 6, 0, 0, 0), value: 5 },
            { label: new Date(2018, 11, 26, 7, 0, 0, 0), value: 6 },
            { label: new Date(2018, 11, 26, 8, 0, 0, 0), value: 11 },
            { label: new Date(2018, 11, 26, 9, 0, 0, 0), value: 50 },
            { label: new Date(2018, 11, 26, 10, 0, 0, 0), value: 3 },
            { label: new Date(2018, 11, 26, 11, 0, 0, 0), value: 34 },
            { label: new Date(2018, 11, 26, 12, 0, 0, 0), value: 11 }
        ];


        //console.log(this.state)

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

               // <Button onPress={() => this.props.navigation.navigate('Loading')} title={"ddd"}></Button>
/*

<Text>{JSON.stringify(this.state.devices)}</Text>
                <Text>{this.props.other.token}</Text>
<View style={styles.chartContainer}>
                        <FusionCharts
                            type={this.states.type}
                            width={this.states.width}
                            height={this.states.height}
                            dataFormat={this.states.dataFormat}
                            dataSource={this.states.dataSource}
                            libraryPath={this.libraryPath} // set the libraryPath property
                        />
                    </View>
                    
                            this.states = {
            type: "column2d", // The chart type
            width: "400", // Width of the chart
            height: "200", // Height of the chart
            dataFormat: "json", // Data type
            dataSource: {
                // Chart Configuration
                chart: {
                    exportEnabled: "1",
                    exportShowMenuItem: true,
                    exportAction: 'download',
                    exportFormats: "PNG=Export as High Quality Image|PDF=Export as Printable Document|XLS=Export Chart Data|CSV=Export Chart Data as csv",
                    caption: "Countries With Most Oil Reserves [2017-18]", //Set the chart caption
                    subCaption: "In MMbbl = One Million barrels", //Set the chart subcaption
                    xAxisName: "Country", //Set the x-axis name
                    yAxisName: "Reserves (MMbbl)", //Set the y-axis name
                    numberSuffix: "K",
                    theme: "zune, ocean" //Set the theme for your chart
                },
                // Chart Data - from step 2
                data: chartData
            }
        };

        this.libraryPath = Platform.select({
            // Specify fusioncharts.html file location
            android: {
                uri: "file:///android_asset/fusioncharts.html"
            },

        });
                    
                    
                    
                    */


                    