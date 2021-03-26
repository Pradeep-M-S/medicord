import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import { RadioButton } from 'react-native-paper';
import * as firebase from "firebase"

const SignupScreen = ({ navigation }) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [userType, setUserType] = useState("")
    const signUpUser = () => {
        if (password === confirmPassword) {
            firebase.auth().createUserWithEmailAndPassword(email, password).then(cred => {
                return firebase.firestore().collection('users').doc(cred.user.uid).set({
                    type: userType
                })
            }).then(() => {
                alert("You have signed up successfully")
                navigation.navigate("Login")
            })
        } else {
            alert("Password's doesn't match")
        }
    }
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Create an account</Text>

            <FormInput
                labelValue={email}
                onChangeText={(userEmail) => setEmail(userEmail)}
                placeholderText="Email"
                iconType="user"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
            />

            <FormInput
                labelValue={password}
                onChangeText={(userPassword) => setPassword(userPassword)}
                placeholderText="Password"
                iconType="lock"
                secureTextEntry={true}
            />

            <FormInput
                labelValue={confirmPassword}
                onChangeText={(userPassword) => setConfirmPassword(userPassword)}
                placeholderText="Confirm Password"
                iconType="lock"
                secureTextEntry={true}
            />
            <View style={styles.radioButtonsContainer}>
                <View style={styles.radioButtonAndLabelContainer}>

                    <RadioButton
                        labelValue="parent"
                        value="parent"
                        status={userType === 'parent' ? 'checked' : 'unchecked'}
                        onPress={() => setUserType("parent")}
                    />
                    <Text>
                        Parent
                    </Text>
                </View>
                <View style={styles.radioButtonAndLabelContainer}>

                    <RadioButton
                        value="student"
                        status={userType === 'student' ? 'checked' : 'unchecked'}
                        onPress={() => setUserType("student")}

                    />
                    <Text>
                        Student
                    </Text>
                </View>
                <View style={styles.radioButtonAndLabelContainer}>
                    <RadioButton
                        value="warden"
                        status={userType === 'warden' ? 'checked' : 'unchecked'}
                        onPress={() => setUserType("warden")}

                    />
                    <Text>
                        Warden
                    </Text>
                </View>

            </View>
            <FormButton
                buttonTitle="Sign Up"
                onPress={() => {
                    signUpUser()
                }}
            />

            <View style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}>
                    By registering, you confirm that you accept our{' '}
                </Text>
                <TouchableOpacity onPress={() => { }}>
                    <Text style={[styles.color_textPrivate, { color: '#e88832' }]}>
                        Terms of service
          </Text>
                </TouchableOpacity>
                <Text style={styles.color_textPrivate}> and </Text>
                <Text style={[styles.color_textPrivate, { color: '#e88832' }]}>
                    Privacy Policy
        </Text>
            </View>

            {/* {Platform.OS === 'android' ? (
                <View>
                    <SocialButton
                        buttonTitle="Sign Up with Google"
                        btnType="google"
                        color="#de4d41"
                        backgroundColor="#f5e7ea"
                        onPress={() => { }}
                    />
                </View>
            ) : null} */}

            <TouchableOpacity
                style={styles.navButton}
                onPress={() => navigation.navigate('Login')}>
                <Text style={styles.navButtonText}>Have an account? Sign In</Text>
            </TouchableOpacity>
        </View>
    );
};

export default SignupScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f9fafd',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    text: {
        fontSize: 28,
        marginBottom: 10,
        color: '#051d5f',
    },
    navButton: {
        marginTop: 15,
    },
    navButtonText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#2e64e5',
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 35,
        justifyContent: 'center',
    },
    color_textPrivate: {
        fontSize: 13,
        fontWeight: '400',
        color: 'grey',
    },
    radioButtonAndLabelContainer: {
        display: "flex",
        flexDirection: 'row',
        alignItems: 'center'
    },
    radioButtonsContainer: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'space-between',
        margin: 10
    }
});