import React, {Component} from "react";
import {Text, View, StyleSheet, TouchableOpacity, Image} from "react-native";
import {RFValue} from "react-native-responsive-fontsize";
import firebase from "firebase";
import * as Google from "expo-google-app-auth";

export default class LogIn extends Component {
    isUserEqual = (googleUser, firebaseUser) => {
        if(firebaseUser) {
            var providerData = firebaseUser.providerData;
            for(var i = 0; i < providerData.length; i++){
                if(
                    providerData[i].providerId ===
                    firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
                    providerData[i].uid === googleUser.getBasicProfile().getId()
                ) {
                    return true;
                }
            }
        }
        return false;
    };

    onSignIn = googleUser => {
        var unsubscribe = firebase.auth().onAuthStateChanged(firebaseUser => {
            unsubscribe();
            if(!this.isUserEqual(googleUser, firebaseUser)){
                var credential = firebase.auth.GoogleAuthProvider.credential(
                    googleUser.idToken,
                    googleUser.accessToken
                );
                firebase
                    .auth()
                    .signInWithCredential(credential)
                    .then(function (result) {
                        if(result.additionalUserInfo.isNewUser) {
                            firebase
                                .database()
                                .ref("/users/" + result.user.uid)
                                .set({
                                    gmail: result.user.email,
                                    profile_picture: result.additionalUserInfo.profile.picture,
                                    locale: result.additionalUserInfo.profile.locale,
                                    first_name: result.additionalUserInfo.profile.given_name,
                                    last_name: result.additionalUserInfo.profile.family_name
                                })
                            .then(function (snapshot) {})
                        }
                    })
                    .catch(error => {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        var email = error.email;
                        var credential = error.credential;
                    })
            } else {
                console.log("User already signed-in to Firebase.")
            }
        })
    };

    signInWithGoogleAsync = async () => {
        try {
            const result = await Google.logInAsync({
                behaviour: "web",
                androidClientId: "55786152087-33srfdd2hc1ckppphhv6e89cn2vqr0vj.apps.googleusercontent.com",
                iosClientId: "55786152087-kgk26beubrb727cqjqis30fkr36phsqt.apps.googleusercontent.com",
                scopes: ["profile", "email"]
            });
            if(result.type === "success"){
                this.onSignIn(result);
                return result.accessToken;
            } else {
                return {cancelled: true};
            }
        } catch (e) {
            console.log(e.message);
            return {error: true}
        }
    }

    render(){
        return (
            <View style = {styles.container}>
                <Text style = {styles.appTitleText}>Volunteer Hours Tracker</Text>
                <TouchableOpacity
                    style = {styles.signInButton}
                    onPress = {()=> this.signInWithGoogleAsync()}
                >
                    <Image
                        style = {styles.googleIcon}
                        source = {require("../assets/google_icon.png")}
                    >
                    </Image>
                    <Text>Sign in with Google</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center"
    },
    appTitleText: {
        fontSize: RFValue(35),
        padding: 30,
        marginTop: 30
    },
    signInButton: {
        width: RFValue(250),
        height: RFValue(50),
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        borderRadius: RFValue(30),
        backgroundColor: "#C1E7E3",
        marginTop: 100
    },
    googleIcon: {
        width: RFValue(30),
        height: RFValue(30),
        resizeMode: "contain"
    }
})