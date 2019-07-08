import React, {Component} from 'react';
import { View, Text, StyleSheet, TextInput, Button, Image, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { BACKEND_URL } from 'react-native-dotenv';
import DismissKeyboard from 'dismissKeyboard';


export default class AuthView extends Component {
  constructor(){
    super();

    this.state = {
      password: "",
      passwordConfirm: "",
      username: "",
      register: false,
      regError: false,
      logError: false,
    }

  }

  componentWillMount(){
    this.checkForUser();
  }


  login = async () => {
    if (this.state.username.length > 0 && this.state.password.length > 0){
    try{
    const user = await fetch(`${BACKEND_URL}/auth/login`, {
      method: "post",
      body: JSON.stringify({
        username: this.state.username.toLowerCase(),
        password: this.state.password,
        id: ""
      }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
      });
      if (user){
        userJSON = await user.json();
        if (userJSON.status == "500" || !userJSON.data){
          this.setState({logError: "User Not Found"});
        }else{
          await AsyncStorage.setItem("username", userJSON.data.username);
          await AsyncStorage.setItem("userId", userJSON.data._id);
          const storedUsername = await AsyncStorage.getItem("username");
          const storedId       = await AsyncStorage.getItem("userId");
          const storedData = {
            username: storedUsername,
            id: storedId
          }
          this.props.navigation.navigate("Home", {userData: storedData});
        }
      } else {
        this.setState({logError: "User Not Found"});
      }
    }catch(err){
      console.error("Login Failed!!! " + err);
      throw err;
    }
    }
  }


  register = async () => {
    if (this.state.username.length > 0 && this.state.password.length > 0 && this.state.password === this.state.passwordConfirm){
    try{
      let registeredUser = await fetch(`${BACKEND_URL}/auth/register`, {
        method: "post",
        body: JSON.stringify({
          username: this.state.username.toLowerCase(),
          password: this.state.password,
          id: ""
        }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
        });
        if (registeredUser){
          registeredUserJSON = await registeredUser.json();
          if (registeredUserJSON.status == "500" || !registeredUserJSON.data){
            this.setState({regError: "User Already Exists"});
          } else {
            await AsyncStorage.setItem("username", registeredUserJSON.data.username);
            await AsyncStorage.setItem("userId", registeredUserJSON.data._id);
            const storedUsername = await AsyncStorage.getItem("username");
            const storedId = await AsyncStorage.getItem("userId");
            const storedData = {
              username: storedUsername,
              id: storedId
            }
            this.props.navigation.navigate("Home", {userData: storedData});
          }

        } else {
          this.setState({regError: "User Already Exists"});
        }
    }catch(err){
      console.error("Register Failed!!! " + err);
    }
    } else {
      this.setState({regError: "Passwords Do Not Match"});
    }
  }


  checkForUser = async () => {
    try{
      const storedUsername = await AsyncStorage.getItem("username");
      const storedId = await AsyncStorage.getItem("userId");
      const storedData = {
        username: storedUsername,
        id: storedId
      }
      if (storedData.username && storedData.id){
        const user = await fetch(`${BACKEND_URL}/auth/login`, {
          method: "post",
          body: JSON.stringify({
            username: storedData.username.toLowerCase(),
              password: '',
              id: storedData.id,
            }),
            credentials: "include",
              headers: {
                "Content-Type": "application/json"
              }
            });
            if (user) {
              const userJSON = await user.json();
              if (userJSON.data) {
                this.props.navigation.navigate("Home", {
                  userData: storedData
                });
              }
            }
            }
    }catch(err){
      console.error("Checking For User Failed!!! " + err);
    }
  }


  render() {
    return (
      <TouchableWithoutFeedback onPress={()=>{DismissKeyboard()}}>
      <View style={styles.container}>

      { !this.state.register &&
      <View style={styles.container}>

      <Image
      source={require('./basicLogo.png')}
      style={styles.logo}/>

        <View style={{marginTop: 150,flex: 1, alignItems: 'center',justifyContent: 'flex-start'}}>
              <TextInput
                value={this.state.username}
                onChangeText={(username) => this.setState({ username })}
                placeholder={'Username'}
                style={styles.input}
              ></TextInput>

              <TextInput
                value={this.state.password}
                onChangeText={(password) => this.setState({ password })}
                placeholder={'Password'}
                secureTextEntry={true}
                style={styles.input}
              ></TextInput>

              {this.state.logError && <Text>{this.state.logError}</Text> }
              <TouchableOpacity
                style={styles.loginButton}
                onPress={(e)=>{this.login(e)}}
              >
                <Text
                style={styles.loginButtonText}>
                Login
                </Text>
              </TouchableOpacity>
              <Button
                title={'Create A New Account?'}
                style={styles.input}
                onPress={(e)=>{this.setState({
                  register:true,
                  password: "",
                  username: "",
                  passwordConfirm: ""
                  })}}
              />
            </View>

              <Image
              source={require('./basicLogo.png')}
              style={styles.logo}/>

      </View>
    }

    {this.state.register &&
      <View style={styles.container}>

      <Image
      source={require('./basicLogo.png')}
      style={styles.logo}/>

              <TextInput
                value={this.state.username}
                onChangeText={(username) => this.setState({ username })}
                placeholder={'Username'}
                style={styles.input}
              ></TextInput>

              <TextInput
                value={this.state.password}
                onChangeText={(password) => this.setState({ password })}
                placeholder={'Password'}
                secureTextEntry={true}
                style={styles.input}
              ></TextInput>

              <TextInput
                value={this.state.passwordConfirm}
                onChangeText={(passwordConfirm) => this.setState({ passwordConfirm })}
                placeholder={'Confirm Password'}
                secureTextEntry={true}
                style={styles.input}
              ></TextInput>

              {this.state.regError && <Text>{this.state.regError}</Text> }
              <TouchableOpacity
                style={styles.loginButton}
                onPress={(e)=>{this.register(e)}}
              >
                <Text
                style={styles.loginButtonText}>
                Register
                </Text>
              </TouchableOpacity>
              <Button
                title={'Already Have An Account?'}
                style={styles.input}
                onPress={(e)=>{this.setState({
                  register:false,
                  password: "",
                  username: "",
                  passwordConfirm: ""
                  })}}
              />

      </View>
    }
      </View>
      </TouchableWithoutFeedback>

    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#AACFD0',
  },

  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 8,
    marginTop: 2,
    color: "black",
    borderRadius: 6
  },

  loginButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
    marginTop: 2,
    borderRadius: 6
  },
  loginButtonText: {
    flex: 1,
    textAlign: "center",
    width: "100%",
    color: "white",
    fontWeight: "bold"
  },

  logo: {
    width: 400,
    height: 400,
    marginTop: 50,
    marginBottom: -30,
  }

});
