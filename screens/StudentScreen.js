import React, { useContext, useEffect } from "react"
import { View, StyleSheet, Text, SafeAreaView } from "react-native"
import FormButton from "../components/FormButton"

const StudentScreen = ({ navigation }) => {

    useEffect(() => {

    }, [])
    return (
        <SafeAreaView>
            <View>
                <Text style={styles.container}>
                    StudentScreen
            </Text>
                <Text>Student</Text>
                <FormButton style={styles.text} buttonTitle="Logout" onPress={() => { }} />
            </View>
        </SafeAreaView>
    )
}

export default StudentScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        marginTop: 200,
    },
    text: {
        fontSize: 20,
        color: "#333"
    }
})