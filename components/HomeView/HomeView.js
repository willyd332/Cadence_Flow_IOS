import React, {Component} from 'react';
import {View, Text, Button, FlatList, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Swipeout from 'react-native-swipeout';
import { BACKEND_URL } from 'react-native-dotenv';

// Components
import SearchBar from './SearchBar.js';
import AddConnection from './AddConnection.js';
import ConnectionList from './ConnectionList.js';
import ItemSeperator from '../ItemSeperator.js';

export default class HomeView extends Component {
  constructor() {
    super();
    this.state = {
      connections: [],
      searchConnections: [],
      searching: false
    }
  }


  componentWillMount() {
    this.findConnections();
  }


  deleteItem = async (item) => {
    try {
      const deletedItem = await fetch(`${BACKEND_URL}/connection/${item._id}`, {
        method: "delete",
        credentials: "include",
      });
      if (deletedItem) {
        const deletedItemJSON = await deletedItem.json();
        if (deletedItemJSON.data) {
          this.editConnections(deletedItemJSON.data, false, true)
        } else {
          console.error("failed to delete -- status:" + deletedItemJSON.status);
        }
      } else {
        console.error("failed to delete");
      }
    } catch (err) {
      console.error("failed to delete " + err);
    }
  }


  markAsContacted = async (item) => {

    const newContactDate = new Date().getTime();
    item.lastContacted = newContactDate;
    try {
      const updatedItem = await fetch(`${BACKEND_URL}/connection/${item._id}`, {
        method: "put",
        credentials: "include",
        body: JSON.stringify(item),
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (updatedItem) {
        const updatedItemJSON = await updatedItem.json();
        if (updatedItemJSON.data) {
          this.editConnections(updatedItemJSON.data);
        } else {
          console.error("failed to update -- status:" + updatedItemJSON.status);
        }
      } else {
        console.error("failed to update");
      }
    } catch (err) {
      console.error("failed to update " + err);
    }

  }


  editConnections = async (input, newCon = false, deleteCon = false) => {
    if (deleteCon) {
      const editedConnections = this.state.connections.filter((connection) => {
        if (connection._id != input._id) {
          return true;
        }
      });
      this.setState({
        connections: editedConnections
      });
    } else {

      const editedConnections = this.state.connections.map((connection) => {
        if (connection._id == input._id) {
          return input;
        } else {
          return connection;
        }
      });
      if (newCon) {
        editedConnections.push(input);
      }
      const sortedConnections = await this.sortData(editedConnections);
      this.setState({
        connections: sortedConnections
      });
    }
  }


  findConnections = async () => {
    try {
      userData = this.props.navigation.getParam("userData");
      const allConnections = await fetch(`${BACKEND_URL}/connection`);
      if (allConnections) {
        const allConnectionsJSON = await allConnections.json();
        if (allConnectionsJSON.data) {
          const allUserConnections = allConnectionsJSON.data;
          const sortedConnections = await this.sortData(allUserConnections);
          this.setState({
            connections: sortedConnections
          });
        } else {
          console.error("couldnt find em! " + allConnectionsJSON.status);
        }
      } else {
        console.error("couldnt find em! --- !allConnections");
      }
    } catch (err) {
      console.error("couldnt find em! " + err);
    }
  }


  sortData = async (connections) => {

    // Adding daysSince to connections
    connections = connections.map((connection)=> {
      if (!connection.daysSince){
        const oneDay         = 1000*60*60*24;
        let lastDay          = connection.lastContacted;
        let today            = new Date().getTime();
        today                = parseInt(today);
        lastDay              = parseInt(lastDay);
        const daysSince      = Math.round((today-lastDay)/oneDay);
        connection.daysSince = daysSince;
      }
      return connection;
    });

    // Defining helpful variables
    const connectionsBeingSorted = [];
    let reds   = 0;
    let yellows   = 0;
    let greens = 0;

    // Insert into new array by color and urgency
    const insertByColorAndUrgency = (connection) => {
      if (connection.daysSince >= connection.urgency) {
          connectionsBeingSorted.unshift(connection);
          reds++
      } else if (connection.daysSince >= Math.floor(connection.urgency / 2)) {
        connectionsBeingSorted.splice(reds + yellows, 0, connection);
        yellows++;
      } else {
        connectionsBeingSorted.splice(reds + yellows + greens, 0, connection);
        greens++;
      }
    }

    // Actually calling the function
    connections.forEach((connection) => {
      insertByColorAndUrgency(connection);
    });

    // Organizing that by days since
      let loopFloor;
      let loopCeiling = 0;

      const sortByDaysSince = (color) => {
        let insertPoint;
        let loopFloor;
        let loopCeiling
        if (color == 1){
          loopFloor = 0;
          loopCeiling = reds;
          section = reds;
        } else if (color == 2){
          loopFloor = reds;
          loopCeiling = reds + yellows;
          section = yellows;
        } else {
          loopFloor = reds + yellows;
          loopCeiling = reds + yellows + greens;
          section = greens;
        }

        // Inserts each connection by daysSince
          if (section > 1) {
            i = loopFloor + 1;
            while (i < loopCeiling) {
              x = i;
              while (x > loopFloor && connectionsBeingSorted[x].daysSince > connectionsBeingSorted[x - 1].daysSince) {
                temp = connectionsBeingSorted[x - 1];
                connectionsBeingSorted[x - 1] = connectionsBeingSorted[x];
                connectionsBeingSorted[x] = temp;
                x--;
              }
              i++;
            }
          }
        }

    // Actually calling the function for each color
      for (let color = 1; color <= 3; color++){
          sortByDaysSince(color);
      }

    return connectionsBeingSorted;
  }


  searchForString = async (string) => {
    if (string.length > 0) {
      const filtered = [];
      this.state.connections.forEach((connection) => {
        if (string.length <= connection.name.length){
        for (let i = 0; i < string.length; i++) {
          if (string[i].toLowerCase() !== connection.name[i].toLowerCase()) {
            break
          } else if (i === string.length - 1) {
            filtered.push(connection);
          }
        }
      }
      });
      const sorted = await this.sortData(filtered);
      this.setState({
        searching: true,
        searchConnections: sorted,
      });
    } else {
      this.setState({
        searching: false,
        searchConnections: [],
      });

    }

  }


  render() {
    return (


      <View style={styles.mainView}>

      <View style={{flex: 1}}>
      </View>

        <SearchBar
        style={styles.searchBar}
        searchForString={this.searchForString}
        searchConnections={this.state.searchConnections}/>

        <View style={{flex: 1}}>
        </View>

        <AddConnection
        style={styles.addConnection}
        editConnections={this.editConnections}
        navigation={this.props.navigation}
        markAsContacted={this.markAsContacted}
        deleteItem={this.deleteItem} />

        <View style={{flex: 1}}>
        </View>

        <View style={styles.listView}>

        {this.state.searching ? (

          <ConnectionList
          deleteItem={this.deleteItem}
          connections={this.state.searchConnections}
          markAsContacted={this.markAsContacted}
          editConnections={this.editConnections}
          navigation={this.props.navigation}/>
          ) : (
          <ConnectionList
          deleteItem={this.deleteItem}
          connections={this.state.connections}
          markAsContacted={this.markAsContacted}
          editConnections={this.editConnections}
          navigation={this.props.navigation}/>
          )}

        </View>

     </View>
    );
  }
}


const styles = StyleSheet.create({

  mainView: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: '#ecf0f1'
    },

  searchBar: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignSelf: "center",
    },

  addConnection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "skyblue",
    width: "60%",
    borderRadius: 10,
    margin: 10,
    marginLeft: "20%",
    padding: 10,
    shadowColor: "skyblue",
    shadowOffset: {
       width: 4,
       height: 4,
      },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 10,
    },

  listView: {
    flex: 15,
    },

  });
