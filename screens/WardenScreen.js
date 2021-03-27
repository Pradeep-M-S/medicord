import React, { useEffect, useState } from "react"
import { View, StyleSheet, Text, StatusBar, ScrollView } from "react-native"
import FormButton from "../components/FormButton"
import { Searchbar, Appbar, Title, Portal, Dialog, Paragraph, Button, ActivityIndicator, Colors, Card, Subheading } from "react-native-paper"
import Icon from 'react-native-vector-icons/EvilIcons';
import firebase from "firebase"
import "firebase/auth"
import "firebase/firestore"

const WardenScreen = ({ navigation, route }) => {
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState("")
    const [searchQuery, setSearchQuery] = React.useState('');
    const { email } = route.params;
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
            <View style={{ marginTop: StatusBar.currentHeight + 30 }}>
                <Searchbar
                    style={{
                        marginBottom: 10,
                        borderRadius: 20
                    }}
                    placeholder="Search"
                    onChangeText={(text) => setSearchQuery(text)}
                    value={searchQuery}
                />
                {
                    loading ?
                        <View style={{ flex: 1, marginTop: StatusBar.currentHeight + StatusBar.currentHeight + 10 }}>
                            <ActivityIndicator size="large" style={{ flex: 1, alignItems: "center", justifyContent: 'center' }} animating={true} color="white" />
                        </View>
                        :
                        <ScrollView >
                            {
                                studentsArr.map(item => {
                                    if (!searchQuery || item.userName.toLowerCase().includes(searchQuery.toLowerCase())) {
                                        return (
                                            <Card style={styles.cardStyles}>
                                                <Card.Content>
                                                    <View>
                                                        <View >
                                                            <Icon name="user" size={55} color="#000" onPress={() => {
                                                                setVisible(true)
                                                            }} />
                                                        </View>
                                                        <View >
                                                            <Title>{item.userName}</Title>
                                                            <Subheading>Height :{item.height ? item.height : "Nil"}</Subheading>
                                                            <Subheading>Weight :{item.weight ? item.weight : "Nil"}</Subheading>
                                                            <Subheading>Last Checked Temperature: {item.lastCheckedTemperature ? item.lastCheckedTemperature : "Nil"}</Subheading>
                                                            <Subheading>Last Checkup Date : {item.lastCheckupDate ? item.lastCheckupDate : "Nil"}</Subheading>
                                                            <Subheading>Parent Email : {item.parentEmailID ? item.parentEmailID : "Nil"}</Subheading>
                                                            <Subheading>Signs of Fever or Cold :{item.signsOfFeverOrCold ? item.signsOfFeverOrCold : "Nil"}</Subheading>
                                                            <Subheading>Blood Pressure :{item.bloodPressure ? item.bloodPressure : "Nil"}</Subheading>
                                                            <Subheading>Body Mass Index :{item.bmi ? item.bmi : "Nil"}</Subheading>
                                                        </View>
                                                    </View>
                                                </Card.Content>
                                            </Card>
                                        )
                                    }
                                }
                                )
                            }
                            <View style={{ margin: 40 }}></View>
                        </ScrollView>
                }
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
            </View>
        </View >
    )
}

export default WardenScreen

const styles = StyleSheet.create({
    top: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        backgroundColor: "#0a043c",
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
        backgroundColor: "#161d6f"
    },
    text: {
        fontSize: 20,
        color: "#333"
    }, cardStyles: {
        marginBottom: 10,
        marginTop: 10,
        elevation: 10,
        borderRadius: 20,
        backgroundColor: "#f7f7f7"

    }, cardContainer: {
        flex: 1,
        height: 200,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexGrow: 1,
    }, avatarContainer: {
        flex: 1,
        width: 100,
        height: 100,
    }, detailsContainer: {
        flex: 1,
        width: 300,
        height: 150,
    }
})