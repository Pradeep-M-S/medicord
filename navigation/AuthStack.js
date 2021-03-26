import React, { useState, useEffect } from 'react';
import { createStackNavigator } from "@react-navigation/stack"
import OnBoardingScene from '../screens/OnBoardingScene';
import LoginScreen from '../screens/LoginScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SignupScreen from '../screens/Signup';
import * as firebase from "firebase";
import StudentScreen from '../screens/StudentScreen';
import ParentScreen from '../screens/ParentScreen';
import WardenScreen from '../screens/WardenScreen';
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDchD5w5AsVr23kVjBrAVN5613mCyQVmRY",
    authDomain: "rn-project-1---medicord.firebaseapp.com",
    projectId: "rn-project-1---medicord",
    storageBucket: "rn-project-1---medicord.appspot.com",
    messagingSenderId: "793703252059",
    appId: "1:793703252059:web:89e53d4ce963ed5de23f7e"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);



const Stack = createStackNavigator();

function AuthStack() {
    const [isFirstlaunch, setIsFirstlaunch] = useState(null)
    let routeName;

    useEffect(() => {
        AsyncStorage.getItem('alreadyLaunched').then((value) => {
            if (value === null) {
                AsyncStorage.setItem('alreadyLaunched', 'true')
                setIsFirstlaunch(true)
            }
            else {
                setIsFirstlaunch(false)
            }
        })
    }, [])

    if (isFirstlaunch === null) {
        return null;
    }
    else if (isFirstlaunch === true) {
        routeName = "Onboarding"
    }
    else {
        routeName = "Login";
    }
    return (
        <Stack.Navigator initialRouteName={routeName}>
            <Stack.Screen name="StudentScreen" component={StudentScreen} options={{ header: () => null }}
            /><Stack.Screen name="ParentScreen" component={ParentScreen} options={{ header: () => null }}
            /><Stack.Screen name="WardenScreen" component={WardenScreen} options={{ header: () => null }}
            />
            <Stack.Screen
                name="Onboarding"
                component={OnBoardingScene}
                options={{ header: () => null }}
            />
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ header: () => null }}
            />
            <Stack.Screen
                name="Signup"
                component={SignupScreen}
                options={{ header: () => null }}
            />

        </Stack.Navigator>
    )
}
export default AuthStack;