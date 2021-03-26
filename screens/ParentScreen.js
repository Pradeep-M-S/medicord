import React, { useContext, useRef, useEffect, useState } from "react"
import { View, StyleSheet, Text, StatusBar, ScrollView } from "react-native"
import firebase from "firebase";
import { Appbar, Title, Portal, Dialog, Paragraph, Button, Card, Divider, DataTable, Subheading } from 'react-native-paper';
import Icon from 'react-native-vector-icons/EvilIcons';
import AnimatedCircularProgress from 'react-native-animated-circular-progress';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import 'firebase/firestore';
import "firebase/auth"
import * as Permissions from "expo-permissions"

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

const ParentScreen = ({ navigation, route }) => {
    const
        { userID,
            email,
            childName,
            lastHealthCheckup,
            signsOfFeverOrCold,
            lastCheckedTemperature } = route.params;
    const [visible, setVisible] = useState(false);
    console.log(route.params)
    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };

    }, []);
    firebase.firestore()
        .collection("users")
        .doc(userID)
        .update({
            "pushToken": expoPushToken
        })
        .then(() => {
            alert("expo push token addded")
        })
    return (
        <View style={styles.container} >
            <Appbar dark style={styles.top}>
                {/* <Appbar.Action
                    icon="archive"
                    onPress={() => console.log('Pressed archive')}
                />
                <Appbar.Action icon="mail" onPress={() => console.log('Pressed mail')} />
                <Appbar.Action icon="label" onPress={() => console.log('Pressed label')} />
                <Appbar.Action
                    icon="delete"
                    onPress={() => console.log('Pressed delete')}
                /> */}
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
            <Card style={styles.cardContainer} elevation={8}>
                <Card.Content>
                    <Title>{childName}'s Medical Data</Title>
                </Card.Content>
            </Card>
            <ScrollView style={styles.scrollView}>
                {/* <Title style={{ marginTop: StatusBar.currentHeight + 10 }}>Child's Name : {childName && childName}</Title>
            <Title>Last Health Checkup Date : {lastHealthCheckup && lastHealthCheckup}</Title> */}
                <Card style={styles.medicalData}>
                    <Card.Cover source={{ uri: 'https://image.freepik.com/free-photo/overhead-view-healthcare-accessories-near-clipboard-with-plank-paper-spectacles-background_23-2148213997.jpg' }} />
                    <Divider />
                    <Card.Content>
                        <Title>{childName}</Title>
                        <Divider />
                        <Subheading>Last Checkup Date : {lastHealthCheckup}</Subheading>
                        <Subheading>Last Checked Temperature : {lastCheckedTemperature} F</Subheading>
                        <Subheading>Signs of Fever/Cold : {signsOfFeverOrCold}</Subheading>
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
                    </Card.Content>
                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title>Checkups</DataTable.Title>
                            <DataTable.Title>Date</DataTable.Title>
                        </DataTable.Header>

                        <DataTable.Row>
                            <DataTable.Cell>Eye Checkup</DataTable.Cell>
                            <DataTable.Cell>{lastHealthCheckup}</DataTable.Cell>
                        </DataTable.Row>

                        <DataTable.Row>
                            <DataTable.Cell>Fever/Cold</DataTable.Cell>
                            <DataTable.Cell>{lastHealthCheckup}</DataTable.Cell>
                        </DataTable.Row>

                    </DataTable>
                    <Button onPress={() => sendPushNotification(expoPushToken)}>Details</Button>
                </Card>
            </ScrollView>
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
    },
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

async function sendPushNotification(expoPushToken) {
    const message = {
        to: expoPushToken,
        sound: 'default',
        title: 'Original Title',
        body: 'And here is the body!',
        data: { someData: 'goes here' },
    };

    await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    });
}

async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
    } else {
        alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    return token;
}