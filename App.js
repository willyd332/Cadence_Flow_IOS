import React, {Component} from 'react';
import {Text, View, AppRegistry, Button, Easing, Animated, Container, Image, BlurShadow, Svg, Path} from 'react-native';
import {StackViewTransitionConfigs, createStackNavigator, createAppContainer, createSwitchNavigator, createBottomTabNavigator } from "react-navigation";
import SplashScreen from 'react-native-splash-screen';

// Components
import AboutPage from './components/AboutPage/AboutPage.js'
import ConnectionView from './components/ConnectionView/ConnectionView.js'
import HomeView from './components/HomeView/HomeView.js'
import SettingsView from './components/SettingsView/SettingsView.js'
import AuthView from './components/AuthView/AuthView.js'

// This lets you set specific transitions for each screen
let dynamicModalTransition = (transitionProps, prevTransitionProps) => {
  const isModal = ["SettingsView"/*, "AboutPage"*/].some(
    screenName =>
      screenName === transitionProps.scene.route.routeName ||
      (prevTransitionProps && screenName === prevTransitionProps.scene.route.routeName)
  )
  return StackViewTransitionConfigs.defaultTransitionConfig(
    transitionProps,
    prevTransitionProps,
    isModal
  );
};


const HomeNavigator = createStackNavigator(
  {
  HomeView: {
    screen: HomeView,
    navigationOptions: () => ({
      title: "Home",
    })
    },
  ConnectionView: {
    screen: ConnectionView,
    navigationOptions: () => ({
      title: "Connections",
    })
    },
  },
  {
    initialRouteName: "HomeView",
    headerMode: 'float',
  }
);


// This should create the bottom tab navigator
const MainNavigator = createBottomTabNavigator({
  // Home navigator is basically just the navigation between
  // Home and the connections
  Home: HomeNavigator,

  SettingsView: {
    screen: SettingsView,
    navigationOptions: () => ({
      title: "Settings",
   })
    },
  // AboutPage: {
  //   screen: AboutPage,
  //   navigationOptions: () => ({
  //     title: "About",
  //   })
  //   },
  },
  {
  transitionConfig: dynamicModalTransition,
  initialRouteName: "Home",
  style: { backgroundColor: 'rgba(0, 0, 0, 0)' },
  tabBarOptions: {
  inactiveTintColor: '#b5b5b5',
  showIcon: 'true',
  labelStyle: {
    fontSize: 15,
    fontFamily: "Lora-BoldItalic"
  },
  }
  });



  // This is the general split between auth and Main,
  // When we go to main we will fall into the tab navigation
  const AppNavigator = createSwitchNavigator({
    AuthView: AuthView,
    Home: MainNavigator,
  });





const AppContainer = createAppContainer(AppNavigator);





export default class myApp extends Component {

  componentDidMount(){
    SplashScreen.hide();
  }

  render() {
    return (
      <AppContainer />
    );
  }
}




AppRegistry.registerComponent('myApp', () => myApp);
