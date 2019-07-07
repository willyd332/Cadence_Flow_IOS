import React, {Component} from 'react';
import {View} from 'react-native';



export default class ItemSeperator extends Component {


  render() {
    return (

    <View>
    { this.props.list ? (

      <View style={{
        height: 10,
        width: "95%",
        backgroundColor: "transparent",
        marginLeft: "5%",
    }}>
      </View>
      ) : (
      <View style={{
        height: 1,
        width: "95%",
        backgroundColor: "#CED0CE",
        marginLeft: "5%"

        }}>
      </View>
      )}
    </View>

    );
  }
}
