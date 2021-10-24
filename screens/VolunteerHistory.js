import React, {Component} from "react";
import {Text, View, StyleSheet} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import firebase from "firebase";
import { RFValue } from "react-native-responsive-fontsize";
import HistoryCard from "./HistoryCard";

export default class VolunteerHistory extends Component {
    constructor(props){
        super(props);
        this.state = {
            history: []
        }
    }

    componentDidMount(){
        this.fetchHours();
    }

    fetchHours = () => {
        firebase
            .database()
            .ref("/volunteerHistory/" + firebase.auth().currentUser.uid)
            .on(
                "value",
                snapshot => {
                    let history = [];
                    if(snapshot.val()){
                        Object.keys(snapshot.val()).forEach(function (key) {
                            history.push({
                                key: key,
                                value: snapshot.val()[key]
                            })
                        })
                    }
                    this.setState({history: history})
                },
                function(errorObject){
                    console.log("The read failed: " + errorObject.code);
                }
            )
    }

    renderItem = ({item: history}) => {
        return <HistoryCard history = {history} />
    }
    keyExtractor = (item, index) => index.toString();

    render(){
        return (
            <View style = {styles.container}>
              {!this.state.history[0] ? (
                  <View style = {styles.noHistory}>
                      <Text>It seems like you haven't entered any volunteer hours. Volunteer and enter your hours to see history here!</Text>
                  </View>
              ) : (
                  <View style = {styles.cardContainer}>
                      <FlatList
                        keyExtractor = {this.keyExtractor}
                        data = {this.state.history}
                        renderItem = {this.renderItem}
                      />
                  </View>
              )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#AECBD6"
    },
    noHistory: {
        flex: 0.85,
        justifyContent: "center",
        alignItems: "center",
        fontSize: RFValue(40),
        color: "black"
    },
    cardContainer: {
        flex: 0.85
    }
})