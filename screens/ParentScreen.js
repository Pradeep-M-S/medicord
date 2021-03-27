import React, { useContext, useRef, useEffect, useState } from "react"
import { View, StyleSheet, Text, StatusBar, ScrollView } from "react-native"
import firebase from "firebase";
import { Appbar, Title, Portal, Dialog, Paragraph, Button, Card, Divider, DataTable, Subheading, ActivityIndicator, Colors } from 'react-native-paper';
import Icon from 'react-native-vector-icons/EvilIcons';
import AnimatedCircularProgress from 'react-native-animated-circular-progress';
import 'firebase/firestore';
import "firebase/auth"


const ParentScreen = ({ navigation, route }) => {
    const
        { userID,
            email,
            userName,
            studentEmail } = route.params;
    const [visible, setVisible] = useState(false);
    const [childsName, setChildsName] = useState()
    const [height, setHeight] = useState()
    const [weight, setWeight] = useState()
    const [lastCheckedTemperature, setLastCheckedTemperature] = useState()
    const [lastCheckupDate, setLastCheckupDate] = useState()
    const [signsOfFeverOrCold, setSignsOfFeverOrCold] = useState()
    const [BMI, setBMI] = useState()
    const [BP, setBP] = useState()
    const [loading, setLoading] = useState(true);
    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);


    useEffect(() => {
        firebase.firestore().collection('users').doc(studentEmail).get().then((doc) => {
            setHeight(doc.data().height);
            setChildsName(doc.data().userName)
            setWeight(doc.data().weight);
            setLastCheckedTemperature(doc.data().lastCheckedTemperature);
            setLastCheckupDate(doc.data().lastCheckupDate);
            setSignsOfFeverOrCold(doc.data().signsOfFeverOrCold);
            setBMI(doc.data().bmi);
            setBP(doc.data().bloodPressure);
        }).then(() => {
            setLoading(false);
        })
    }, [])

    return (
        <View style={styles.container} >
            <Appbar dark style={styles.top}>
                <Title style={styles.appBarTitle}>
                    Parent Dashboard
                </Title>
                <Icon name="user" size={55} color="#fff" onPress={() => {
                    setVisible(true)
                }} />
            </Appbar>
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>Account Info</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>You are logged in as </Paragraph>
                        <Paragraph>{email && JSON.stringify(email)}</Paragraph>
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
            {
                loading ?
                    <View style={{ flex: 1 }}>
                        <ActivityIndicator size="large" style={{ flex: 1, alignItems: "center", justifyContent: 'center' }} animating={true} color={Colors.blue800} />
                    </View>
                    :
                    <>
                        <Card style={styles.cardContainer} elevation={8}>
                            <Card.Content>
                                {/* <Title>{childName}'s Medical Data</Title> */}
                                <Title style={styles.whiteText}>Welcome Mr/Mrs.{userName}</Title>
                            </Card.Content>
                        </Card>
                        <ScrollView style={styles.scrollView}>
                            <Title style={{ marginTop: StatusBar.currentHeight + 10 }}>Child's Name : {childsName && childsName}</Title>
                            <Title>Last Health Checkup Date : {lastCheckupDate && lastCheckupDate}</Title>
                            <Card style={styles.medicalData}>
                                <Card.Cover source={{ uri: 'https://image.freepik.com/free-photo/overhead-view-healthcare-accessories-near-clipboard-with-plank-paper-spectacles-background_23-2148213997.jpg' }} />
                                <Divider />
                                <Card.Content>

                                    <Title>{childsName}</Title>
                                    <Divider />
                                    <Title>Overall Health Condition</Title>
                                    <View style={
                                        { padding: 5, marginTop: 10, justifyContent: "space-around", alignItems: "center", flexDirection: "row" }
                                    }>

                                        <AnimatedCircularProgress
                                            startDeg={45}
                                            radius={50}
                                            endDeg={358}
                                            innerRadius={0}
                                            duration={300}
                                            color="#9ede73"
                                            style={{ justifyContent: "flex-end" }}
                                        />
                                        <Title>Good</Title>
                                    </View>
                                    <Subheading>Height: {height}</Subheading>
                                    <Subheading>Weight: {weight}</Subheading>
                                    <Subheading>BMI: {BMI}</Subheading>
                                    <Subheading>Blood Pressure: {BP}</Subheading>
                                    <Subheading>Any Signs Of Fever and Cold: {signsOfFeverOrCold}</Subheading>
                                    <Subheading>Last Checked Temperature : {lastCheckedTemperature} F</Subheading>
                                    <Divider />

                                </Card.Content>
                                <DataTable>
                                    <DataTable.Header>
                                        <DataTable.Title>Checkups</DataTable.Title>
                                        <DataTable.Title>Date</DataTable.Title>
                                    </DataTable.Header>

                                    <DataTable.Row>
                                        <DataTable.Cell>Eye Checkup</DataTable.Cell>
                                        <DataTable.Cell>{lastCheckupDate}</DataTable.Cell>
                                    </DataTable.Row>

                                    <DataTable.Row>
                                        <DataTable.Cell>Fever/Cold</DataTable.Cell>
                                        <DataTable.Cell>{lastCheckupDate}</DataTable.Cell>
                                    </DataTable.Row>

                                </DataTable>
                            </Card>
                        </ScrollView>
                    </>
            }
        </View >
    )
}

export default ParentScreen

const styles = StyleSheet.create({
    top: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        backgroundColor: "dodgerblue",
        flex: 1,
        justifyContent: "space-between"
    }, container: {
        marginTop: StatusBar.currentHeight,
        backgroundColor: "#f7f7f7",
        flex: 1,
        padding: 20,
    },
    text: {
        fontSize: 20,
        color: "#333"
    }, appBarTitle: {
        padding: 10,
        color: "#fff"
    }, avatar: {
        backgroundColor: "#000",
        justifyContent: "flex-end",
        margin: 4,
    }, cardContainer:
    {
        marginTop: StatusBar.currentHeight + 15,
        backgroundColor: "#f3f4ed",
        borderRadius: 5,
        backgroundColor: "dodgerblue",
        shadowColor: "#000",
        shadowOffset: {
            width: 20,
            height: 20
        }
    }, medicalData: {
        marginTop: 10,
        elevation: 5
    }, scrollView: {
        marginHorizontal: -15,
    }, whiteText: {
        color: "#fff"
    }
})


// firebase.firestore().collection('users').doc(userID).get().then(doc => {
//     console.log(doc.data().type)
//     userType = doc.data().type;
//     studentName = doc.data().studentName;
//     lastHealthCheckup = doc.data().lastHealthCheckup;
//     console.log("userType,studentName,lastHealthCheckup", userType, studentName, lastHealthCheckup)
// })

// useEffect(() => {
//     userID && firebase.firestore().collection('users').doc(userID).get().then(doc => {
//         console.log(doc.data().type)
//         userType = doc.data().type;
//         studentName = doc.data().studentName;
//         lastHealthCheckup = doc.data().lastHealthCheckup;
//         console.log("userType,studentName,lastHealthCheckup", userType, studentName, lastHealthCheckup)
//     })
// }, [userID])
