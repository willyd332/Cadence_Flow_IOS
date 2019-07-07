import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Slider from '@react-native-community/slider';

export default class UrgencySelection extends Component {
  constructor(props){
    super(props)

    this.state = {
      currSliderValue: this.props.connectionData.urgency
    }
  }


  render() {

    return (

    <View style={this.props.boxStyle}>

      <Text style={styles.generalText} >How Often Do You Want To Connect?</Text>

      <View style={styles.urgencyBox}>

        <Text
        style={styles.urgencyText}
        >Every {this.state.currSliderValue} days
        </Text>

        <Slider
          style={styles.sliderStyle}
          minimumValue={1}
          maximumValue={100}
          step={1}
          minimumTrackTintColor="#CB5EB6"
          maximumTrackTintColor="#000000"
          value={this.props.connectionData.urgency}
          onValueChange={(e)=>{
            this.setState({
              currSliderValue: e
              });
            this.props.setBigState({
              urgency: e,
              changed: true
              });
            }}
        />

      </View>
    </View>
    );
  }
}


const styles = StyleSheet.create({

  sliderStyle: {
    width: 300,
    height: 40
  },

  generalText: {
    flex: 1,
    textAlign: "center",
    fontFamily: "Lora-Italic"
    },

  urgencyBox: {
    flex: 3,
    width: "80%",
    marginLeft: "10%",
    justifyContent: "space-around",
    alignItems: "center"
    },

  });
