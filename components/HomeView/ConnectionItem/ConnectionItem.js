import React, {Component} from 'react';
import {View, Text, Button, TouchableOpacity, StyleSheet} from 'react-native';

// Components
import ConnectionInfo from './ConnectionInfo.js';
import LastContacted from '../../LastContacted.js';

export default class ConnectionItem extends Component {
  constructor(props){
    super(props);

  }



  render() {
    return (
      <TouchableOpacity
      style={this.props.style}
      onPress={() => this.props.navigation.navigate('ConnectionView', {
        connectionData: this.props.connectionData,
        editConnections: this.props.editConnections,
        deleteItem: this.props.deleteItem,
        markAsContacted: this.props.markAsContacted
        })}
      >

        <ConnectionInfo
        style={styles.connectionInfo}
        connectionData={this.props.connectionData} />

        <View style={styles.lastContactedView}>
        <LastContacted
        connectionData={this.props.connectionData} />
        </View>


      </TouchableOpacity>
    );
  }
}


const styles = StyleSheet.create({

  connectionInfo: {
    flex: 4,
    alignSelf: "flex-start",
    alignItems: "center",
    borderRightWidth: 1,
    borderRightColor: "skyblue",
  },
  
  lastContactedView: {
    flex: 1,
    alignSelf: "center",
  },

  });
