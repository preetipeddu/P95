import React, {Component} from "react";
import {Text, View, StyleSheet} from "react-native";
import firebase from "firebase";

export default class LogOut extends Component {
    componentDidMount(){
        firebase.auth().signOut();
    }

    render(){
        return (
            <View style = {styles.container}>
                <Text>Log-out.</Text>
            </View>
        )
    }
}

 const styles = StyleSheet.create({
     container: {
         justifyContent: "center",
         flex: 1,
         alignItems: "center"
     }
 })