import React, {Component} from "react";
import {Text, View, StyleSheet, TouchableOpacity} from "react-native";
import {RFValue} from "react-native-responsive-fontsize";
import firebase from "firebase";

export default class HistoryCard extends Component {
    constructor(props){
        super(props);
        this.state = {
           history_id: this.props.history.key,
           history_data: this.props.history.value 
        }
    }

    render(){
        let history = this.state.history_data;
        let activities = {
            option_1: "Shelve Returned Materials",
            option_2: "Tutoring",
            option_3: "Setting up for Activities",
            option_4: "Assist Patrons with Computers",
            option_5: "Inventory Assisting",
            option_6: "Sort and File Cards",
            option_7: "Answering Phone Calls"
        };
        return (
            <TouchableOpacity style = {styles.container}>
                <View style = {styles.cardContainer}>
                    <Text style = {styles.date}>{history.date}</Text>
                    <Text style = {styles.activity}>{activities[history.preview_option]}</Text>
                    <Text style = {styles.numberOfHours}>Number of Hours: {history.numberOfHours}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "green"
    },
    cardContainer: {
        margin: RFValue(13),
        borderRadius: RFValue(20)
    },
    date: {
        paddingLeft: RFValue(20),
        justifyContent: "center"
    },
    activity: {
        fontSize: RFValue(18),
        justifyContent: "center"
    },
    numberOfHours: {
        marginTop: RFValue(5),
        fontSize: RFValue(15)
    }
})