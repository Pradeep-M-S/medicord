import React, { useContext, useEffect, useState } from "react"
import { View, StyleSheet, Text, SafeAreaView, StatusBar, TouchableOpacity, Clipboard } from "react-native"
import FormButton from "../components/FormButton"
import { Appbar, Title, Card, Subheading, Divider, Portal, Dialog, Button, Paragraph } from "react-native-paper"
import Icon from 'react-native-vector-icons/EvilIcons';
import firebase from "firebase"
import "firebase/firestore"
import "firebase/auth"
// import RNSmtpMailer from "react-native-smtp-mailer";

const StudentScreen = ({ navigation, route }) => {
    const { userID,
        email } = route.params;
    const [parentEmailID, setparentEmailID] = useState()
    const [userName, setUserName] = useState()
    const [height, setHeight] = useState()
    const [weight, setWeight] = useState()
    const [lastCheckedTemperature, setLastCheckedTemperature] = useState()
    const [lastCheckupDate, setLastCheckupDate] = useState()
    const [signsOfFeverOrCold, setSignsOfFeverOrCold] = useState()
    const [BMI, setBMI] = useState()
    const [BP, setBP] = useState()
    const [visible, setVisible] = useState(false);
    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);
    const copyToClipboard = () => {
        Clipboard.setString(userID)
    }
    const sendNotifications = () => {
        // RNSmtpMailer.sendMail({
        //     mailhost: "smtp.gmail.com",
        //     port: "465",
        //     ssl: true, // optional. if false, then TLS is enabled. Its true by default in android. In iOS TLS/SSL is determined automatically, and this field doesn't affect anything
        //     username: " ",
        //     password: "password",
        //     fromName: "Some Name", // optional
        //     replyTo: "usernameEmail", // optional
        //     recipients: "pradeepmsblogspot@gmail.com",
        //     bcc: ["bccEmail1", "bccEmail2"], // optional
        //     subject: "subject",
        //     htmlBody: "<h1>header</h1><p>body</p>",
        // })
        //     .then(success => console.log(success))
        //     .catch(err => console.log(err));
    }

    useEffect(() => {
        firebase.firestore().collection('users').doc(email).get().then((doc) => {
            setparentEmailID(doc.data().parentEmailID);
            setUserName(doc.data().userName);
            setHeight(doc.data().height);
            setWeight(doc.data().weight);
            setLastCheckedTemperature(doc.data().lastCheckedTemperature);
            setLastCheckupDate(doc.data().lastCheckupDate);
            setSignsOfFeverOrCold(doc.data().signsOfFeverOrCold);
            setBMI(doc.data().bmi);
            setBP(doc.data().bloodPressure);
        })
    }, [])
    return (
        <SafeAreaView style={styles.studentContainer}>
            <Appbar dark style={styles.top}>
                <Title style={styles.appBarTitle}>
                    Student Dashboard
                </Title>
                <Icon name="user" size={55} color="#fff" onPress={() => {
                    setVisible(true)
                }} />
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
            </Appbar>
            <View style={styles.studentContent}>
                <Card elevation={5} style={styles.welcomeCard}>
                    <Card.Content>
                        <Title style={styles.whiteText}>Welcome to Medicord - {userName}</Title>
                    </Card.Content>
                </Card>
                <View style={{ padding: 10 }} />
                {/* <Card>
                    <Card.Content>
                        <Subheading>Your unique ID</Subheading>
                        <TouchableOpacity onPress={() => copyToClipboard()}>
                            <Subheading>
                                {userID}
                            </Subheading>
                        </TouchableOpacity>
                        <Divider />
                        <Text>Click to Copy your unique ID to Clipboard</Text>
                    </Card.Content>
                </Card> */}
                <View style={{ padding: 10 }} />

                <Card style={{
                    elevation: 5,
                    borderRadius: 5
                }}>
                    <Card.Content>
                        <Divider />
                        <Subheading>Parent Email ID- {parentEmailID}</Subheading>
                        <Subheading>Your Height- {height}cm</Subheading>
                        <Subheading>Your Weight - {weight}kg</Subheading>
                        <Subheading>Your Body Mass Index- {BMI}</Subheading>
                        <Subheading>Your Blood Pressure - {BP}</Subheading>
                        <Subheading>Last Health Checkup - {lastCheckupDate}</Subheading>
                        <Subheading>Last Checked temp - {lastCheckedTemperature} F</Subheading>
                        <Subheading>Signs of Fever and Cold - {signsOfFeverOrCold}</Subheading>
                        <Button onPress={() => sendNotifications()}>Change Signs to Yes</Button>
                        <Button>Apply Leave</Button>
                    </Card.Content>
                </Card>
            </View>
        </SafeAreaView>
    )
}

export default StudentScreen

const styles = StyleSheet.create({
    studentContainer: {
        marginTop: StatusBar.currentHeight + 10,
        padding: 20
    },
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
    }, top: {
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
    }, studentContent: {
        marginTop: StatusBar.currentHeight + 30
    }, welcomeCard: {
        backgroundColor: "dodgerblue",
        marginBottom: 10,
    }, whiteText: {
        color: "#ffffff"
    }
})