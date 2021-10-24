import React, {Component} from "react";
import {Text, View, StyleSheet, TextInput, Button, Alert, ScrollView} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import {RFValue} from "react-native-responsive-fontsize";
import firebase from "firebase";

export default class AddVolunteerHours extends Component {
    constructor(props){
        super(props);
        this.state = {
            dropdownHeight: 40,
            previewOption: "Shelving Books",
            totalNumberOfHours: null
        }
    }

    async addHours(){
        if(
            this.state.numberOfHours &&
            this.state.activity 
        ) {
            let volunteerData = {
                volunteer_uid: firebase.auth().currentUser.uid,
                preview_option: this.state.previewOption,
                numberOfHours: this.state.numberOfHours,
                activity: this.state.activity,
                activityDate: new Date()
            };
            for(var total; total < 1000; total = total + this.state.numberOfHours){
              this.setState({totalNumberOfHours: total});
            }
            await firebase
                .database()
                .ref("/volunteerHistory/" + firebase.auth().currentUser.uid)
                .set(volunteerData)
                .then(function(snapshot){});
            this.props.setUpdateToTrue();
            // this.setState({totalNumberOfHours: (this.state.totalNumberOfHours += this.state.numberOfHours)})
            this.props.navigation.navigate("Home");
        } else {
            Alert.alert(
                "All fields are required.",
                [{text: "OK", onPress: () => console.log("OK pressed.")}],
                {cancelable: false}
            )
        }
    }

    render(){
        let preview_options = {
            option_1: "Shelve Returned Materials",
            option_2: "Tutoring",
            option_3: "Setting up for Activities",
            option_4: "Assist Patrons with Computers",
            option_5: "Inventory Assisting",
            option_6: "Sort and File Cards",
            option_7: "Answering Phone Calls"
        }
        return (
            <View style = {styles.container}>
               <Text style = {styles.appTitle}>Volunteer Hours Tracker</Text>
               <Text style = {styles.screenTitle}>Add Volunteer Hours</Text>
               <View style = {styles.fieldsContainer}>
                   <Text>Your total hours: {this.state.totalNumberOfHours}</Text>
                    <ScrollView>
                        <View style = {{marginHorizontal: RFValue(10)}}>
                            <TextInput
                                onChangeText = {numberOfHours => this.setState({numberOfHours})}
                                placeholder = {"Number of hours (numbers only!)"}
                                placeholderTextColor = "gray"
                                style = {styles.textInput}
                            />
                        </View>
                        <View style = {{height: RFValue(this.state.dropdownHeight)}}>
                            <DropDownPicker
                                items = {[
                                    {label: "Shelve Returned Materials", value: "option_1"},
                                    {label: "Tutoring", value: "option_2"},
                                    {label: "Setting up for Activities", value: "option_3"},
                                    {label: "Assist Patrons with Computers", value: "option_4"},
                                    {label: "Inventory Assisting", value: "option_5"},
                                    {label: "Sort and File Cards", value: "option_6"},
                                    {label: "Answering Phone Calls", value: "option_7"}
                                ]}
                                defaultValue = {this.state.previewOption}
                                containerStyle = {{
                                    height: 40,
                                    borderRadius: RFValue(20),
                                    marginBottom: RFValue(20),
                                    marginHorizontal: RFValue(10)
                                }}
                                onOpen = {() => {
                                    this.setState({dropdownHeight: 170});
                                }}
                                onClose = {() => {
                                    this.setState({dropdownHeight: 40})
                                }}
                                style = {{backgroundColor: "transparent"}}
                                itemStyle = {{
                                    justifyContent: "flex-start"
                                }}
                                dropDownStyle = {{
                                    backgroundColor: "white"
                                }}
                                labelStyle = {{
                                    color: "black"
                                }}
                                arrowStyle = {{
                                    color: "black"
                                }}
                                onChangeItem = {item => 
                                    this.setState({activity: item.value})
                                }
                            >
                            </DropDownPicker>
                        </View>
                        <Button 
                                onPress = {() => this.addHours()}
                                title = "Submit"
                                color = "#C1E7E3"
                                style = {styles.submitButton}
                            />
                    </ScrollView>
               </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F1AE"
    },
    appTitle: {
        flex: 0.7,
        justifyContent: "center",
        color: "black",
        fontSize: RFValue(28)
    },
    screenTitle: {
        flex: 0.7,
        justifyContent: "center",
        color: "black",
        fontSize: RFValue(20)
    },
    fieldsContainer: {
        flex: 0.85
    },
    textInput:{
      height: RFValue(40),
      borderColor: "black",
      borderWidth: RFValue(1),
      borderRadius: RFValue(10),
      paddingLeft: RFValue(10)
    },
    submitButton: {
      marginTop: RFValue(20),
      justifyContent: "center",
      alignItems: "center"
    }
})