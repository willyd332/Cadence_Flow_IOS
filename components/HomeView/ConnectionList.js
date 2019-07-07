import React, {Component} from 'react';
import {View, Text, Button, FlatList, StyleSheet} from 'react-native';
import Swipeout from 'react-native-swipeout';


// Components
import ConnectionItem from './ConnectionItem/ConnectionItem.js';
import ItemSeperator from '../ItemSeperator.js'


export default class ConnectionList extends Component {
  render() {
    return (
      <FlatList
      style={styles.list}
      data={this.props.connections}
      renderItem={({item, index}) => {

        return(

          <View>
            <ItemSeperator list={true} />
            <Swipeout
              autoClose={true}
              left={[{

                  text: 'Delete',
                  color: "white",
                  backgroundColor: "red",

                  type: "delete",
                  onPress: () => {
                    this.props.deleteItem(item);
                  }
                }]}
              right={[{

                  text: 'Contact',
                  color: "white",
                  backgroundColor: "blue",

                  autoClose: true,
                  onPress: () => {
                    this.props.markAsContacted(item);
                    }
                }]} >


                  <ConnectionItem style={styles.listItem}
                  connectionData={item}
                  editConnections={this.props.editConnections}
                  navigation={this.props.navigation}
                  deleteItem={this.props.deleteItem}
                  markAsContacted={this.props.markAsContacted} />



              </Swipeout>

              <ItemSeperator list={true} />

              </View>

          );

      }}
      keyExtractor={item => item._id} >

      </FlatList>
    );
  }
}

const styles = StyleSheet.create({

  list: {
    flex: 1,
    },

  listItem: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
    margin: 1,
    width: "95%",
    marginLeft: "5%",
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 5,
    shadowColor: "#33628C",
    shadowOffset: {
	     width: 10,
	     height: 1,
      },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 10,
  }
  });
