import * as React from "react";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import Loading from "./screens/Loading";
import LogIn from "./screens/LogIn";
import Dashboard from "./screens/Dashboard";
import firebase from "firebase";
import {firebaseConfig} from "./config";

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const AppSwitchNavigator = createSwitchNavigator({
  Loading: Loading,
  LogIn: LogIn,
  Dashboard: Dashboard
})

const AppNavigator = createAppContainer(AppSwitchNavigator);

export default function App() {
  return (
    <AppNavigator/>
  )
}