import React, {Component} from "react";
import {Text, View, StyleSheet} from "react-native";
import firebase from "firebase";

export default class Loading extends Component {
    componentDidMount(){
        this.checkIfLoggedIn();
    }

    checkIfLoggedIn = () => {
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                this.props.navigation.navigate("Dashboard");
            } else {
                this.props.navigation.navigate("LogIn");
            }
        })
    }

    render(){
        return (
            <View style = {styles.container}>
                <Text>Loading...</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})