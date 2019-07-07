import React, {Component} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';


export default class ConnectionInfo extends Component {
  render() {
    return (

      <View style={this.props.style}>

      <Text
      numberOfLines={1}
      style={styles.nameText}
      >{this.props.connectionData.name}</Text>

      <Text
      numberOfLines={1}
      style={styles.companyText}
      >{this.props.connectionData.company} </Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({

  nameText: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Lora-Bold"
  },

  companyText: {
    fontSize: 15,
    color: "grey",
    paddingLeft: "5%",
    paddingRight: "3%",
    fontFamily: "Lora-Italic"
  }

  });
