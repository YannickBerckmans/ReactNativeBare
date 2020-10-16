import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { VictoryBar, Bar, VictoryChart, VictoryTheme, VictoryZoomContainer, VictoryBrushContainer, VictoryTooltip, VictoryContainer, VictoryLabel, VictoryAxis } from "victory-native";

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  handleZoom(domain) {
    this.setState({ selectedDomain: domain });
  }

  handleBrush(domain) {
    this.setState({ zoomDomain: domain });
  }


  render() {

    const datas = [
      { quarter: 1, earnings: 13 },
      { quarter: 1.5, earnings: 15 },
      { quarter: 2, earnings: 16 },
      { quarter: 3, earnings: 14 },
      { quarter: 4, earnings: 19 }
    ];
    this.props.data.forEach((mi) => mi.y)
    let michel = [];
    this.props.data.forEach((mi) => michel.push(mi.y + 'kwh'));


    return (
      <View >

        
        <VictoryContainer>
          <VictoryChart width={400} minDomain={{ x: this.props.domainMin}} maxDomain={{ x: this.props.domainMax}} domainPadding={{ x: [10, 10], y: [0, 20] }} theme={VictoryTheme.material}
            
            
            >
            <VictoryAxis fixLabelOverlap={true} crossAxis label={this.props.xTitle} axisLabelComponent={<VictoryLabel dy={20} />} />
            <VictoryAxis dependentAxis crossAxis label={this.props.yTitle} axisLabelComponent={<VictoryLabel dy={-20} />} />

            <VictoryBar barRatio={1}
              data={this.props.data} x="x" y="y"

              labels={michel}
              labelComponent={
                <VictoryTooltip
                center={{ x: 225, y: 30 }}
                pointerOrientation="bottom"
                flyoutWidth={150}
                flyoutHeight={50}
                pointerWidth={150}
                cornerRadius={0}
                />
              }
              style={{ data: { fill: "#66b5de", stroke: "black", strokeWidth: 2 } }}
              
            />
          </VictoryChart>
          </VictoryContainer>

      </View>
    );
  }
}

export default Chart;

