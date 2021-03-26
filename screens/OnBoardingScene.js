import React from 'react'
import { View, Text, Button, Image, StyleSheet } from "react-native"
import Onboarding from 'react-native-onboarding-swiper';

const OnBoardingScene = ({ navigation }) => {
    return (
        <Onboarding
            onDone={() => navigation.navigate("Login")}
            onSkip={() => navigation.replace("Login")}
            pages={[
                {
                    backgroundColor: '#f7f7f7',
                    image: <Image source={require('../assets/onboarding-1.png')} />,
                    title: 'Login as Parent',
                    subtitle: 'Make sure your child’s health is in good condition anyday , anytime and from anywhere in just a single click of this app',
                },
                {
                    backgroundColor: '#007AFE',
                    image: <Image source={require('../assets/onboarding-2.png')} />,
                    title: 'Updated Time to Time',
                    subtitle: 'Get an updated records of your child’s checkup history',
                },
                {
                    backgroundColor: '#f7f7f7',
                    image: <Image source={require('../assets/onboarding-3.png')} />,
                    title: 'Login as Student',
                    subtitle: 'Request Sick Leave from your Parent and Warden officially in the App',
                },
            ]}
        />
    )
}

export default OnBoardingScene

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})