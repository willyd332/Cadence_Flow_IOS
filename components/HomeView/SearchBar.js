import React, {Component} from 'react';
import {View, TextInput, Button, StyleSheet} from 'react-native';


export default class SearchBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchString: "",
    }
  }

  search = async (value) => {
    if (this.props.searchConnections.length === 0 && this.state.searchString.length !== 0 && value.length >= this.state.searchString.length){
    } else {
    await this.setState({
      searchString: value
      });
    this.props.searchForString(this.state.searchString);
    }
  }

  render() {
    return (
      <View style={this.props.style}>
        <TextInput
        style={styles.searchText}
        placeholder="Search..."
        value={this.state.searchString}
        onChangeText={(value)=>{this.search(value)}}>
        </TextInput>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  searchText: {
    marginLeft: "5%",
    width: "96%",
    backgroundColor: "#CED0CE",
    paddingLeft: 10,
    borderRadius: 5,
  }

  });
