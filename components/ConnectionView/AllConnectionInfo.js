import React, {Component} from 'react';
import {View, TextInput, Text, Button, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import DismissKeyboard from 'dismissKeyboard';


// Components
import ItemSeperator from '../ItemSeperator.js'
import LastContacted from '../LastContacted.js'


export default class AllConnectionInfo extends Component {
  constructor(props){
    super(props);
  }


  handleChange = (value, name) => {
  this.props.setBigState({
    [name]: value,
    changed: true
    });
  }


  render() {
    return (

      <TouchableWithoutFeedback onPress={()=>{DismissKeyboard()}}>
      <View style={this.props.boxStyle}>

        <TextInput
        textContentType="name"
        returnKeyType="next"
        style={styles.nameTextInput}
        value={this.props.connectionData.name}
        maxLength={100}
        onChangeText={(e)=>{this.handleChange(e, "name")}} >
        </TextInput>

            <ItemSeperator />

        <Text
        style={styles.generalText}
        >cell</Text>
        <TextInput
        textContentType="telephoneNumber"
        returnKeyType="next"
        style={styles.generalTextInput}
        value={this.props.connectionData.cellphone}
        maxLength={25}
        autoCompleteType="tel"
        onChangeText={(e)=>{this.handleChange(e, "cellphone")}} >
        </TextInput>

          <ItemSeperator />

        <Text
        style={styles.generalText}
        >workphone</Text>
        <TextInput
        textContentType="telephoneNumber"
        returnKeyType="next"
        maxLength={25}
        style={styles.generalTextInput}
        value={this.props.connectionData.workphone}
        autoCompleteType="tel"
        onChangeText={(e)=>{this.handleChange(e, "workphone")}} >
        </TextInput>

          <ItemSeperator />

        <Text
        style={styles.generalText}
        >company</Text>
        <TextInput
        textContentType="organizationName"
        returnKeyType="next"
        style={styles.generalTextInput}
        maxLength={100}
        value={this.props.connectionData.company}
        onChangeText={(e)=>{this.handleChange(e, "company")}} >
        </TextInput>

          <ItemSeperator />

        <Text
        style={styles.generalText}
        >email</Text>
        <TextInput
        textContentType="emailAddress"
        returnKeyType="next"
        maxLength={100}
        style={styles.generalTextInput}
        value={this.props.connectionData.email}
        autoCompleteType="email"
        onChangeText={(e)=>{this.handleChange(e, "email")}} >
        </TextInput>

          <ItemSeperator />

        <Text
        style={styles.generalText}
        >address</Text>
        <TextInput
        textContentType="streetAddressLine1"
        returnKeyType="next"
        maxLength={100}
        style={styles.generalTextInput}
        value={this.props.connectionData.address}
        onChangeText={(e)=>{this.handleChange(e, "address")}} >
        </TextInput>

          <ItemSeperator />

        <Text
        style={styles.generalText}
        >birthday</Text>
        <TextInput
        returnKeyType="next"
        maxLength={50}
        style={styles.generalTextInput}
        value={this.props.connectionData.birthday}
        onChangeText={(e)=>{this.handleChange(e, "birthday")}} >
        </TextInput>

          <ItemSeperator />

        <Text
        style={styles.generalText}
        >Notes</Text>
        <TextInput
        textContentType="none"
        textBreakStrategy="highQuality"
        returnKeyType="next"
        style={styles.noteTextInput}
        value={this.props.connectionData.notes}
        multiline = {true}
        onChangeText={(e)=>{this.handleChange(e, "notes")}} >
        </TextInput>

          <ItemSeperator />

      </View>
      </TouchableWithoutFeedback>
    );
  }
}


const styles = StyleSheet.create({

  generalTextInput: {
    flex: 1,
    padding: 0.25,
	  width: "90%",
	  backgroundColor: "transparent",
    marginLeft: "5%",
    fontFamily: "Lora-Regular"
    },

  noteTextInput: {
    flex: 4,
    padding: 0.25,
    width: "90%",
    backgroundColor: "transparent",
    marginLeft: "5%",
    fontFamily: "Lora-Regular"
    },

  generalText: {
    marginLeft: "5%",
    shadowColor: "#000",
    fontFamily: "Lora-Italic",
    shadowOffset: {
	    width: 0,
	    height: -2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },

  nameTextInput: {
    flex: 3,
    alignSelf: "center",
    textAlign: "center",
    padding: 0.25,
	  width: "90%",
    marginLeft: "5%",
	  backgroundColor: "transparent",
    fontSize: 25,
    fontFamily: "Lora-Bold"
    },



  });
