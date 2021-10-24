import React, {Component} from "react";
import {Text, View, StyleSheet, Image, Button} from "react-native";
import {RFValue} from "react-native-responsive-fontsize";
import AddVolunteerHours from "./AddVolunteerHours";
import firebase from "firebase";

export default class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: "",
            profile_image: ""
        }
    }

    componentDidMount(){
        this.fetchUser();
    }

    async fetchUser(){
        let name, image;
        firebase
            .database()
            .ref("/users/" + firebase.auth().currentUser.uid)
            .on("value", function(snapshot){
                name = `${snapshot.val().first_name} ${snapshot.val().last_name}`;
                image = snapshot.val().profile_image;
            });
            this.setState({
                name: name,
                profile_image: image
            })
    }

    render(){
        return (
            <View style = {styles.container}>
                <Text style = {styles.appTitle}>Volunteer Hours Tracker</Text>
                <View style = {styles.screenContainer}>
                    <View style = {styles.profileContainer}>
                        <Image
                            source = {{uri: this.state.profile_image}}
                            style = {styles.profileImage}
                        >
                        </Image>
                        <Text style = {styles.nameText}>{this.state.name}</Text>
                        <Button style = {{backgroundColor: "#C1E7E3"}} title = "+ Add Volunteer Hours" onPress = {() => {this.props.navigation.navigate("AddVolunteerHours")}}></Button>
                    </View>

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5E1FD"
    },
    appTitle: {
        flex: 0.7,
        justifyContent: "center",
        alignItems: "center",
        color: "black",
        fontSize: RFValue(28)
    },
    screenContainer: {
        flex: 0.85
    },
    profileContainer: {
        flex: 0.85,
        justifyContent: "center",
        alignItems: "center"
    },
    profileImage: {
        width: RFValue(140),
        height: RFValue(140),
        borderRadius: RFValue(70)
    },
    nameText: {
        color: "black",
        fontSize: RFValue(40),
        marginTop: RFValue(10)
    }
})