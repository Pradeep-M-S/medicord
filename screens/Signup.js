import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import { RadioButton } from 'react-native-paper';
import * as firebase from "firebase"

const SignupScreen = ({ navigation }) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [userType, setUserType] = useState("")
    const [studentEmailID, setStudentEmailID] = useState("")
    const [parentEmailID, setParentEmailID] = useState("")
    const [phonenNum, setPhoneNum] = useState()
    const signUpUser = () => {
        if (name === "" || email === "" || password === "" || confirmPassword === "") {
            alert("Please Enter all the Required Fields");
        } else {
            if (userType === "parent" && studentEmailID === "") {
                alert("Please Enter the Student's Email ID");
            } else if (userType === "student" && parentEmailID === "") {
                alert("Please Enter the Parent's Email ID")
            }
            else {
                if (password === confirmPassword) {
                    firebase.auth().createUserWithEmailAndPassword(email, password).then(cred => {
                        return firebase.firestore().collection('users').doc(email).set({
                            type: userType,
                            userName: name,
                            studentEmailID: studentEmailID,
                            parentEmailID: parentEmailID,
                            parentPhoneNum: parentPhoneNum
                        })
                    }).then(() => {
                        alert("You have signed up successfully")
                        navigation.navigate("Login")
                    }).catch(err => {
                        alert("Email ID already in Use");
                    })
                } else {
                    alert("Password's doesn't match")
                }
            }
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Create an account</Text>

            <FormInput
                labelValue={name}
                onChangeText={(userName) => setName(userName)}
                placeholderText="Name"
                iconType="smileo" />
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
            {userType === "parent" &&
                <FormInput
                    labelValue={studentEmailID}
                    onChangeText={(studentEmail) => setStudentEmailID(studentEmail)}
                    placeholderText="Enter Student's Email ID"
                    iconType="google"
                />
            }
            {userType === "student" &&
                <>
                    <FormInput
                        labelValue={parentEmailID}
                        onChangeText={(parentEmail) => setParentEmailID(parentEmail)}
                        placeholderText="Enter Parents's Email ID"
                        iconType="google"
                    />
                    <FormInput
                        labelValue={phonenNum}
                        onChangeText={(num) => setPhoneNum(num)}
                        placeholderText="Enter Parents's Phone Number"
                        iconType="contacts"
                    />
                </>
            }
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
        </View >
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