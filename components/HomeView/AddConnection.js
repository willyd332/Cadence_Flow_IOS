import React, {Component} from 'react';
import {View, Text, Button, TouchableOpacity, StyleSheet} from 'react-native';
import { BACKEND_URL } from 'react-native-dotenv';

export default class ConnectionItem extends Component {

  createConnection = async () => {
    try{
    const newConnection = await fetch(`${BACKEND_URL}/connection`, {
      method: "post",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
      });
    if (newConnection){
    const newConnectionJSON = await newConnection.json();
    if (newConnectionJSON.data){
    this.props.editConnections(newConnectionJSON.data, true);
    this.props.navigation.navigate('ConnectionView', {
      connectionData: newConnectionJSON.data,
      editConnections: this.props.editConnections,
      deleteItem: this.props.deleteItem,
      markAsContacted: this.props.markAsContacted
      });
    } else {
      console.error("failed to create " + newConnectionJSON.status)
    }
    } else {
      console.error("failed to create ---- !newConnection")
    }
    }catch(err){
      console.error("Creation of entry failed " + err);
    }
  }



  render() {
    return (
      <TouchableOpacity
      onPress={this.createConnection}
      style={this.props.style}
      >

        <Text
        style={styles.generalText}>
        Add Connection
        </Text>

      </TouchableOpacity>
    );
  }
}


const styles = StyleSheet.create({

  generalText: {
    textAlign: "center",
    fontFamily: "Lora-Regular"
  },

  });
