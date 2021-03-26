import React, { useContext, useEffect } from "react"
import { View, StyleSheet, Text } from "react-native"
import FormButton from "../components/FormButton"

const WardenScreen = ({ navigation }) => {

    useEffect(() => {

    }, [])
    return (
        <View>
            <Text style={styles.container}>
                WardenScreen
            </Text>
            <FormButton style={styles.text} buttonTitle="Logout" onPress={() => { }} />
        </View>
    )
}

export default WardenScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f9fa4d",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    text: {
        fontSize: 20,
        color: "#333"
    }
})