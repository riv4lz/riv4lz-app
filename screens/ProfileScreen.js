import {
    Button,
    Image,
    StyleSheet,
    View,
    TouchableOpacity, Pressable, Alert, Text, Modal
} from "react-native";
import {useStore} from "../stores/store";
import {useEffect, useState} from "react";
import React from 'react';
import * as ImagePicker from 'expo-image-picker';
import {observer} from "mobx-react";
import {InnerContainer, PageTitle, StyledContainer, SubTitle} from "../components/styles";
import {runInAction} from "mobx";


function ProfileScreen({ navigation }) {
    const [image, setImage] = useState(null);
    const [imageUrl1, setImageUrl1] = useState(null);
    const { userStore, authStore } = useStore();
    const [imageUrlCaster, setImageUrlCaster] = useState(null);
    const [test, setTest] = useState(null);
    const [showState, setShowState] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [profileImageUrl, setProfileImageUrl] = useState('');

    useEffect(() => {
        //userStore.loadUser(authStore.user.id);
    });


    const test1 = async () => {
        await updateInfo();
        await sendInfo();
    }

    const test2 = async () => {
        await pickImageCamera();
        await sendImage();
        await sendImage();
    }

    const updateInfo = async () => {
        runInAction(() => {
            userStore.user.profileImageUrl = profileImageUrl;
        })
        await sendInfo();
    }

    const sendInfo = () => {
        userStore.updateUserProfile(userStore.user);
    }

    const sendImage = async () => {
        userStore.user.profileImageUrl = imageUrl1;
        userStore.updateUserProfile(userStore.user);
        console.log("TETSTAERWEAWEWADAD" + userStore.user.profileImageUrl);
        setShowState(true);
    }

    const pickImage = async () => {
        setModalVisible(!modalVisible);
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            base64: true
        });

        if (!result.cancelled) {
            setImage(result.uri)

            let base64Img = `data:image/jpg;base64,${result.base64}`

            //Add your cloud name
            let apiUrl = 'https://api.cloudinary.com/v1_1/riv4lz/image/upload';

            let data = {
                "file": base64Img,
                "upload_preset": "profileImage",
            }

            fetch(apiUrl, {
                body: JSON.stringify(data),
                headers: {
                    'content-type': 'application/json'
                },
                method: 'POST',
            }).then(async r => {
                let data = await r.json()
                await setProfileImageUrl(data.secure_url)
                return data.secure_url
                console.log("fisk");
                test1();
            }).catch(err=>console.log(err))
        }

    }

    const pickImageCamera = async () => {
        setModalVisible(!modalVisible);
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            base64: true
        });
        if (!result.cancelled) {
            setImage(result.uri)
            let base64Img = `data:image/jpg;base64,${result.base64}`
            //Add your cloud name
            let apiUrl = 'https://api.cloudinary.com/v1_1/riv4lz/image/upload';
            let data = {
                "file": base64Img,
                "upload_preset": "profileImage",
            }
            fetch(apiUrl, {
                body: JSON.stringify(data),
                headers: {
                    'content-type': 'application/json'
                },
                method: 'POST',
            }).then(async r => {
                let data = await r.json()
                await setProfileImageUrl(data.secure_url)
                return data.secure_url

                test1();
            }).catch(err=>console.log(err))
        }
    }

    return (
        <StyledContainer>
            <InnerContainer>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Choose type</Text>
                            <Button title={"Media"} onPress={()=>pickImage()} style={{marginTop: 10}}></Button>
                            <Button title={"Camera"} onPress={()=>pickImageCamera()} style={{marginTop: 10}}></Button>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={styles.textStyle}>Hide Modal</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
                <TouchableOpacity onPress={()=>setModalVisible(true)} style={{width: 200, alignSelf: 'center'}}>
                    {showState ?
                        <View></View> : null
                    }
                    <View style={{backgroundColor:'transparent'}}>
                            <Image source={{uri: userStore.user.profileImageUrl}} style={{width: 200, height: 200, borderRadius: 100, alignSelf:'center'}}/>
                    </View>
                </TouchableOpacity>
                <Button title={"UPLOAD IMAGE"} onPress={()=>updateInfo()} style={{marginTop: 10}}></Button>
                <PageTitle>{userStore.user.name}</PageTitle>
                <SubTitle>{userStore.user.description}</SubTitle>
                <Button title={"Edit profile"} onPress={()=>navigation.navigate('EditProfileScreen')}></Button>
            </InnerContainer>
        </StyledContainer>
    );
}

const styles = StyleSheet.create({
        centeredView: {
            flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 22
        },
        modalView: {
            margin: 20,
                backgroundColor: "white",
                borderRadius: 20,
                padding: 35,
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: {
                width: 0,
                    height: 2
            },
            shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5
        },
        button: {
            borderRadius: 20,
                padding: 10,
                elevation: 2
        },
        buttonOpen: {
            backgroundColor: "#F194FF",
        },
        buttonClose: {
            backgroundColor: "#2196F3",
        },
        textStyle: {
            color: "white",
                fontWeight: "bold",
                textAlign: "center"
        },
        modalText: {
            marginBottom: 15,
                textAlign: "center"
        }
    });

export default observer(ProfileScreen);
