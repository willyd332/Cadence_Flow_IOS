import React, {Component} from 'react';
import {View, Text, Button, TouchableOpacity, Alert, StyleSheet} from 'react-native';


export default class ConnectionActions extends Component {


  deleteAlert = () => {
    Alert.alert(
      "Delete",
      "Are you sure you want to delete this connection?",
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
        {text: 'Yes', onPress: this.deleteConnection},
      ]
      );
  }

  deleteConnection = () => {
    this.props.deleteItem(this.props.connectionData);
    this.props.navigation.goBack();
  }

  markAsContacted = () => {
    this.props.markAsContacted(this.props.connectionData);
  }

  render() {
    return (
      <View style={this.props.boxStyle}>

        <TouchableOpacity
        onPress={this.deleteAlert}
        style={styles.actionDelete}>
          <Text
          style={styles.actionText}>
            Delete Connection
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
        onPress={this.markAsContacted}
        style={styles.actionContact}>
          <Text
          style={styles.actionText}>
            Mark As Contacted
          </Text>
        </TouchableOpacity>

      </View>
    );
  }
}


const styles = StyleSheet.create({

  actionDelete: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "red",
    borderRadius: 3,
    margin: 5,
    alignItems: "center"
  },

  actionContact: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "blue",
    borderRadius: 3,
    margin: 5,
    alignItems: "center"
  },

  actionText: {
    flex: 1,
    alignContent: "center",
    alignSelf: "center",
    textAlign: "center",
    color: "white",
    height: 25,
    marginTop: 10,
    width: "30%",
    fontFamily: "Lora-Regular"
  },

  });
