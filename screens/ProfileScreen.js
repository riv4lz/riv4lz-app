import {
    Button,
    Image,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from "react-native";
import {useStore} from "../stores/store";
import {useEffect, useState} from "react";
import React from 'react';
import * as ImagePicker from 'expo-image-picker';
import {observer} from "mobx-react";
import ImageUpload from "./ImageUpload";
import {InnerContainer, PageTitle, StyledContainer, SubTitle} from "../components/styles";
import {action} from "mobx";

export const delay = (ms) => new Promise((res) => setTimeout(res, ms));

function ProfileScreen({ navigation }) {
    const [image, setImage] = useState(null);
    const [imageUrl1, setImageUrl1] = useState(null);
    const { userStore, authStore } = useStore();
    const [imageUrlCaster, setImageUrlCaster] = useState(null);
    const [test, setTest] = useState(null);
    const [showState, setShowState] = useState(false);

    useEffect(() => {
        //userStore.loadUser(authStore.user.id);
    });

    const imgTest: ImageUpload = {
        userId: authStore.user.id,
        imageUrl: imageUrl1,
        imageType: 0,
    }

    const test1 = async () => {
        await pickImageCamera();
        await sendImage();
        setShowState(false);
    }

    const test2 = async () => {
        await pickImageCamera();
        await sendImage();
        await sendImage();
    }

    const sendImage = async () => {
        userStore.user.profileImageUrl = imageUrl1;
        userStore.updateUserProfile(userStore.user);
        setShowState(true);
    }

    const pickImage = async () => {
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
                setImageUrl1(data.secure_url)
                await console.log(data.secure_url)

                return data.secure_url
            }).catch(err=>console.log(err))
        }

    }

    const pickImageCamera = async () => {
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
                setImageUrl1(data.secure_url)
                return data.secure_url
            }).catch(err=>console.log(err))
        }
    }

    return (
        <StyledContainer>
            <InnerContainer>
                <TouchableOpacity onPress={()=>test1()} style={{width: 200, alignSelf: 'center'}}>
                    {showState ?
                        <View></View> : null
                    }
                    <View style={{backgroundColor:'transparent'}}>
                        {image?
                            <Image source={{uri: userStore.user.profileImageUrl}} style={{width: 200, height: 200, borderRadius: 100, alignSelf:'center'}}/>
                            :
                            <View style={{ backgroundColor: 'grey',width: 200, height: 200, borderRadius: 100}}/>
                        }
                    </View>
                </TouchableOpacity>
                <Button title={"UPLOAD IMAGE"} onPress={()=>sendImage()} style={{marginTop: 10}}></Button>
                <PageTitle>{userStore.user.name}</PageTitle>
                <SubTitle>{userStore.user.description}</SubTitle>
            </InnerContainer>
        </StyledContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default observer(ProfileScreen);
