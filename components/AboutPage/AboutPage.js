import React, {Component} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';



export default class AboutPage extends Component {
  render() {
    return (
      <View style={styles.mainView}>
        <Text>About Page</Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({

  mainView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#ecf0f1',
  }

  });
