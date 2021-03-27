import React, { useState } from 'react'
import { View, Text, Button, StyleSheet, Image, TouchableOpacity, StatusBar } from "react-native"
import FormButton from "../components/FormButton"
import FormInput from "../components/FormInput"
import firebase from "firebase";
import 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import "firebase/auth"

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    let userType;
    let childName;

    let userName;
    let studentEmailID;
    console.log(navigation)

    const loginUser = () => {
        firebase.auth().signInWithEmailAndPassword(email, password).then((cred) => {
            firebase.firestore().collection('users').doc(email).get().then(doc => {
                console.log(doc.data().type)
                userType = doc.data().type;
                userName = doc.data().userName;
                childName = doc.data().studentName;
                studentEmailID = doc.data().studentEmailID;
                userName = doc.data().userName;
                if (userType === "student") {
                    navigation.navigate("StudentScreen", {
                        userID: cred.user.uid,
                        email: email
                    })
                } else if (userType === "parent") {
                    navigation.navigate("ParentScreen", {
                        email: email,
                        userName: userName,
                        userID: cred.user.uid,
                        studentEmail: studentEmailID,
                    })
                } else if (userType === "warden") {
                    navigation.navigate("WardenScreen")
                }
            }).then(() => {
                setEmail("");
                setPassword("");
            })

            console.log(cred.user.uid);
        }).catch(err => {
            alert("Please verify your credentials");
        })
    }

    return (
        <View style={styles.container}>
            {/* <Image
                source={require('../assets/medical-app.png')}
                style={styles.logo}
            /> */}
            <Text style={styles.text}>Medicord</Text>
            <FormInput
                labelValue={email}
                placeholderText="Email"
                onChangeText={(email) => setEmail(email)}
                iconType="user"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
            />
            <FormInput
                labelValue={password}
                placeholderText="Password"
                onChangeText={(password) => setPassword(password)}
                iconType="lock"
                secureTextEntry={true}
            />

            <FormButton buttonTitle="Sign in"
                onPress={() => {
                    loginUser();
                }}
            />

            <TouchableOpacity style={styles.forgotButton} onPress={() => { }}>
                <Text style={styles.navButtonText}>
                    Forgot Password?
                </Text>
            </TouchableOpacity>

            {/* <SocialButton
                buttonTitle="Sign In with Google"
                btnType="google"
                color="#de4d41"
                bgColor="#f5e7ea"
                onPress={() => { }}
            /> */}

            <TouchableOpacity style={styles.forgotButton} onPress={() => navigation.navigate("Signup")}>
                <Text style={styles.navButtonText}>
                    Don't have an account? Create here
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        paddingTop: 50,
        marginTop: StatusBar.currentHeight,
    },
    logo: {
        height: 150,
        width: 150,
        resizeMode: 'cover',
    },
    text: {
        fontSize: 28,
        marginBottom: 10,
        color: '#051d5f',
    },
    navButton: {
        marginTop: 15,
    },
    forgotButton: {
        marginVertical: 35,
    },
    navButtonText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#2e64e5',
    },
})