
import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Platform } from 'react-native';
import FusionCharts from 'react-native-fusioncharts';

/*
PROPS: data : Json contenant les infos du graphique
       format : format des données contenues dans le JSON
       unit : string de l'unité pour les valeurs
       subcaption : sous titre du graphe
       yValue : link in the schema to the data for y


       
RETURN: un graphique contenant toutes les infos
*/

export default class Chart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: 'timeseries',
      width: '100%',
      height: '100%',
      dataFormat: 'json',
      dataSource: {
        data: null,
        "chart": {
          "theme": "candy"
        },
        caption: {
          text: ' '
        },
        subcaption: {
          text: this.props.subcaption
        },
        yAxis: [
          {
            plot: {
              value: this.props.yValue,
              type: 'column'
            },
            format: {
              prefix: this.props.unit
            },
            title: this.props.yTitle
          }
        ]
      },
      schemaJson: null,
      dataJson: null
    };

    this.libraryPath = Platform.select({
      // Specify fusioncharts.html file location

      android: { uri: 'file:///android_asset/fusioncharts.html' }
    });
  }

  componentDidMount() {
    this.fetchDataAndSchema();
  }

  fetchDataAndSchema() {
    const jsonify = res => res.json();
    
    const dFetch =this.props.data ;
    // This is the remote url to fetch the schema.
    const sFetch = this.props.format//[{"format": "%Y-%-m-%-d/%-Ih%-M", "name": "Time", "type": "date"}, {"name": "Electricity", "type": "number"}]
    console.log(this.props.format)
    /*fetch(
      'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/line-chart-with-time-axis-data.json'
    ).then(jsonify)fetch(
      'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/line-chart-with-time-axis-schema.json'
    ).then(jsonify);*/
    
    Promise.all([dFetch, sFetch]).then(res => {
      //console.log(this.props.data)
      const data = res[0];
      const schema = res[1];


      this.setState({ dataJson: data, schemaJson: schema });
    });
  }

  render() {
    const sFetch = this.props.format
    return (
      <View style={styles.container}>
        <View style={styles.chartContainer}>
          <FusionCharts
            dataJson={this.props.data}
            schemaJson={sFetch}
            type={this.state.type}
            width={this.state.width}
            height={this.state.height}
            dataFormat={this.state.dataFormat}
            dataSource={this.state.dataSource}
            libraryPath={this.libraryPath} // set the libraryPath property
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  heading: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10
  },
  chartContainer: {
    height: 500
  }
});