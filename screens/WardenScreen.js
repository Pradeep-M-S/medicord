import React, { useEffect, useState } from "react"
import { View, StyleSheet, Text, StatusBar } from "react-native"
import FormButton from "../components/FormButton"
import { Appbar, Title, Portal, Dialog, Paragraph, Button, ActivityIndicator, Colors } from "react-native-paper"
import Icon from 'react-native-vector-icons/EvilIcons';
import firebase from "firebase"
import "firebase/auth"
import "firebase/firestore"

const WardenScreen = ({ navigation }) => {
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState("")
    const [studentsArr, setStudentsArr] = useState()
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    let tempArray = []

    useEffect(() => {
        firebase.firestore().collection('users').where("type", "==", "student").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.id, "=>", doc.data());
                let tempData = {
                    bloodPressure: doc.data().bloodPressure,
                    bmi: doc.data().bmi,
                    height: doc.data().height,
                    lastCheckedTemperature: doc.data().lastCheckedTemperature,
                    lastCheckupDate: doc.data().lastCheckupDate,
                    parentEmailID: doc.data().parentEmailID,
                    signsOfFeverOrCold: doc.data().signsOfFeverOrCold,
                    type: doc.data().type,
                    userName: doc.data().userName,
                    weight: doc.data().weight,
                    id: doc.id
                }
                tempArray.push(tempData)
            })
        }).then(() => {
            setStudentsArr(tempArray)
            setLoading(false)
        })
    }, [])
    return (
        <View style={styles.container}>
            {
                console.log("students Array", studentsArr)
            }
            <Appbar dark style={styles.top}>
                <Title style={styles.appBarTitle}>
                    Warden Dashboard
                </Title>
                <Icon name="user" size={55} color="#fff" onPress={() => {
                    setVisible(true)
                }} />
            </Appbar>

            {
                loading ?
                    <View style={{ flex: 1 }}>
                        <ActivityIndicator size="large" style={{ flex: 1, alignItems: "center", justifyContent: 'center' }} animating={true} color={Colors.blue800} />
                    </View>
                    : <View style={{ marginTop: StatusBar.currentHeight + 10 }}>
                        <View>
                            {
                                studentsArr.map(item =>
                                    <Title>{item.id}</Title>
                                )
                            }
                        </View>
                    </View>
            }
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>Account Info</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>You are logged in as </Paragraph>
                        {/* <Paragraph>{email && JSON.stringify(email)}</Paragraph> */}
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => {
                            firebase.auth().signOut().then(() => {
                                navigation.navigate("Login")
                            })
                        }}>Logout</Button>
                        <Button onPress={hideDialog}>Close</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    )
}

export default WardenScreen

const styles = StyleSheet.create({
    top: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        backgroundColor: "dodgerblue",
        flex: 1,
        justifyContent: "space-between"
    }, appBarTitle: {
        padding: 10,
        color: "#fff"
    }, container: {
        marginTop: StatusBar.currentHeight,
        backgroundColor: "#f7f7f7",
        flex: 1,
        padding: 20,
    },
    text: {
        fontSize: 20,
        color: "#333"
    }
})