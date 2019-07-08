import React, {Component} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import { BACKEND_URL } from 'react-native-dotenv';


// Components
import AllConnectionInfo from './AllConnectionInfo.js';
import ConnectionActions from './ConnectionActions.js';
import UrgencySelection from './UrgencySelection.js';


export default class ConnectionView extends Component {
  constructor(props){
    super(props);
    data = this.props.navigation.getParam('connectionData');
    this.data = data;
    this.state = {
      _id: data._id,
      tags: data.tags,
      name: data.name,
      company: data.company,
      cellphone: data.cellphone,
      workphone: data.workphone,
      email: data.email,
      address: data.address,
      birthday: data.birthday,
      notes: data.notes,
      urgency: data.urgency,
      lastContacted: data.lastContacted,
      changed: false,
      daysSince: data.daysSince
    }
  }

    handleLowerLevelChange = (change) => {
      this.setState(change);
    }

    componentWillUnmount = async () => {

      if (this.state.changed){
      try{
        const updatedEntry = await fetch(`${BACKEND_URL}/connection/${this.data._id}`, {
          method: "put",
          credentials: "include",
          body: JSON.stringify(this.state),
          headers: {
            "Content-Type": "application/json"
          }
          });
        if (updatedEntry) {
          const updatedEntryJSON = await updatedEntry.json();
          if (updatedEntryJSON.data){
            const editConnections = this.props.navigation.getParam('editConnections');
            editConnections(updatedEntryJSON.data);
          } else {
            console.warn("server failed to send data " + updatedEntryJSON.status + " If you just deleted a connection then this is expected and will be fixed");
          }
        } else {
          console.error("Failed to recieve response");
        }
      }catch(err){
        console.error("failed to update entry " + err);
      }
    }
    }


  render() {
    return (
      <View style={styles.connectionViewBox}>

        <AllConnectionInfo
        boxStyle={styles.connectionInfoBox}
        setBigState={this.handleLowerLevelChange}
        connectionData={this.state} />

        <UrgencySelection
        boxStyle={styles.UrgencySelectionBox}
        setBigState={this.handleLowerLevelChange}
        connectionData={this.state} />

        <ConnectionActions
        boxStyle={styles.connectionActionsBox}
        setBigState={this.handleLowerLevelChange}
        connectionData={this.state}
        navigation={this.props.navigation}
        deleteItem={this.props.navigation.getParam("deleteItem")}
        markAsContacted={this.props.navigation.getParam("markAsContacted")} />

      </View>
    );
  }
}



const styles = StyleSheet.create({

  connectionViewBox: {
    borderWidth: 1,
    borderColor: "skyblue",
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: '#ecf0f1'
    },

  connectionInfoBox: {
    flex: 16,
    marginTop: 10,
  },

  UrgencySelectionBox: {
    flex: 4,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: {
	     width: 0,
	     height: 12,
      },
    shadowOpacity: 0.58,
    shadowRadius: 8.00,
    elevation: 24,
  },

  connectionActionsBox: {
    flex: 2,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }


  });
