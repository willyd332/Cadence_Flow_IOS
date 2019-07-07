import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';


export default class lastContacted extends Component {
  constructor(props){
    super(props);

    this.state = {
      color: "white"
    }
  }

  componentDidUpdate = async () => {
    await this.assignColors();
  }
  componentWillMount = async () => {
    await this.assignColors();
  }

  assignColors = async () => {

    const connection = this.props.connectionData

        if (connection.daysSince >= connection.urgency){
          if (this.state.color !== "#DE1738"){
          this.setState({
            color:"#DE1738"
            });
          }
        } else if (connection.daysSince >= Math.floor(connection.urgency / 2)){
          if (this.state.color !== "#FFC300"){
          this.setState({
            color:"#FFC300"
            });
          }
        } else {
          if (this.state.color !== "#3CBA54"){
          this.setState({
            color:"#3CBA54"
            });
          }
        }
  }

  render() {

    return (

        <View style={{...styles.generalView, backgroundColor: this.state.color}}>

            <Text
            style={styles.numberText}>
            {this.props.connectionData.daysSince}
            </Text>

        </View>

    );
  }
}


const styles = StyleSheet.create({

  generalView: {
    padding: 0.25,
    backgroundColor: "transparent",
    width: 40,
    height: 40,
    borderRadius: 5,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 6,
      },
    shadowOpacity: 0.58,
    shadowRadius: 4.00,
    elevation: 2,
    },

  numberText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Lora-Bold"

  }

  });
