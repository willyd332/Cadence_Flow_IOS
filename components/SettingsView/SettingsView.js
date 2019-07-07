import React, {Component} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { BACKEND_URL } from 'react-native-dotenv';


export default class SettingsView extends Component {


  logout = async () => {
    try{
      await fetch(`${BACKEND_URL}/auth/logout`);
      // const loggedOutJSON = await loggedOut.json();
      // if (loggedOutJSON.status == "200"){
        await AsyncStorage.removeItem("username");
        await AsyncStorage.removeItem("userId");
        this.props.navigation.navigate("AuthView");
      // }
    }catch(err){
      console.error(err)
    }
  }


  render() {
    return (
      <View style={styles.mainView}>
        <Button title="LOGOUT" onPress={this.logout}> LOGOUT </Button>
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
