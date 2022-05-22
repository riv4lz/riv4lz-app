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
import {ImageUpload} from "../stores/casterStore";

function ProfileScreen({ navigation }) {
    const [image, setImage] = useState(null);
    const [imageUrl1, setImageUrl1] = useState(null);
    const { casterStore, authStore } = useStore();


    useEffect(() => {
        if (authStore.user.id) {
            casterStore.loadCaster(authStore.user.id).then(console.log(authStore.user.id));
            console.log("USER ID" + authStore.user.id)
            console.log("CASTER" + casterStore.caster)
        }
    });

    const sendImage = async () => {
        const img: ImageUpload = {
            userId: authStore.user.id,
            imageUrl: imageUrl1,
            imageType: 0,
        }
        casterStore.postImage(img).then(() => {
            console.log(casterStore.caster);
        }).catch((error) => console.log( error.response.request._response ) );
        casterStore.loadCaster(authStore.user.id).then(console.log(authStore.user.id));
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
                console.log(data.secure_url)
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
                console.log(data.secure_url)
                return data.secure_url
            }).catch(err=>console.log(err))
        }

    }

    return (
        <View style={styles.container}>
            <Text>PROFILE SCREEN</Text>
            <Button title={"UPLOAD IMAGE"} onPress={()=>sendImage()}></Button>
            <TouchableOpacity style={{width: 200, alignSelf: 'center'}}>
                <View style={{backgroundColor:'transparent'}}>
                    {image?
                        <Image source={{uri: casterStore.caster.profileImage}} style={{width: 200, height: 200, borderRadius: 100, alignSelf:'center'}}/>
                        :
                        <View style={{ backgroundColor: 'grey',width: 200, height: 200, borderRadius: 100}}/>
                    }
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>pickImage()} style={{width: 200, alignSelf: 'center'}}>
                <View style={{backgroundColor:'transparent'}}>
                    {image?
                        <Image source={{uri: image}} style={{width: 200, height: 200, borderRadius: 100, alignSelf:'center'}}/>
                        :
                        <View style={{ backgroundColor: 'grey',width: 200, height: 200, borderRadius: 100}}/>
                    }
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>pickImageCamera()} style={{width: 200, alignSelf: 'center'}}>
                <View style={{backgroundColor:'transparent'}}>
                    {image?
                        <Image source={{uri: image}} style={{width: 200, height: 200, borderRadius: 100, alignSelf:'center'}}/>
                        :
                        <View style={{ backgroundColor: 'grey',width: 200, height: 200, borderRadius: 100}}/>
                    }
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default ProfileScreen;
