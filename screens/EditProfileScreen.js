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
import {BackIcon, Colors, InnerContainer, PageTitle, StyledContainer, SubTitle} from "../components/styles";
import MyTextInput from "../components/login/MyTextInput";
import {runInAction} from "mobx";
import {Ionicons} from "@expo/vector-icons";

// colors
const { darkLight, tertiary } = Colors;


function EditProfileScreen({ navigation }) {
    const { userStore } = useStore();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [facebookUrl, setFacebookUrl] = useState('');
    const [twitterUrl, setTwitterUrl] = useState('');
    const [discordUrl, setDiscordUrl] = useState('');
    const [twitchUrl, setTwitchUrl] = useState('');


    useEffect(() => {
        console.log(name);
        setName(userStore.user.name);
        setDescription(userStore.user.description);
        setFacebookUrl(userStore.user.facebookUrl);
        setTwitterUrl(userStore.user.twitterUrl);
        setDiscordUrl(userStore.user.discordUrl);
        setTwitchUrl(userStore.user.twitchUrl);
    }, []);

    const updateInfo = async () => {
        runInAction(() => {
            userStore.user.name = name;
            userStore.user.description = description;
            userStore.user.facebookUrl = facebookUrl;
            userStore.user.twitterUrl = twitterUrl;
            userStore.user.discordUrl = discordUrl;
            userStore.user.twitchUrl = twitchUrl;
        })
        userStore.updateUserProfile(userStore.user);
        navigation.navigate('ProfileScreen');

    }

    const deleteProfile = async () => {

    }



    return (
        <StyledContainer>
            <InnerContainer>
                <BackIcon onPress={() => navigation.navigate("ProfileScreen")}>
                    <Ionicons name={"arrow-back-outline"} size={30} color={tertiary} />
                </BackIcon>
                <MyTextInput
                    icon={"mail"}
                    placeholder={"Message..."}
                    placerholderTextColor={darkLight}
                    onChangeText={setName}
                    defaultValue={name}
                />
                <MyTextInput
                    icon={"mail"}
                    placeholder={"Message..."}
                    placerholderTextColor={darkLight}
                    onChangeText={newDescription=> setDescription(newDescription)}
                    defaultValue={description}
                />
                <MyTextInput
                    icon={"mail"}
                    placeholder={"Message..."}
                    placerholderTextColor={darkLight}
                    onChangeText={setFacebookUrl}
                    defaultValue={facebookUrl}
                />
                <MyTextInput
                    icon={"mail"}
                    placeholder={"Message..."}
                    placerholderTextColor={darkLight}
                    onChangeText={setTwitterUrl}
                    defaultValue={twitterUrl}
                />
                <MyTextInput
                    icon={"mail"}
                    placeholder={"Message..."}
                    placerholderTextColor={darkLight}
                    onChangeText={setDiscordUrl}
                    defaultValue={discordUrl}
                />
                <MyTextInput
                    icon={"mail"}
                    placeholder={"Message..."}
                    placerholderTextColor={darkLight}
                    onChangeText={setTwitchUrl}
                    defaultValue={twitchUrl}
                />
                <Button title={"Confirm edit"} onPress={updateInfo}> </Button>
            </InnerContainer>
        </StyledContainer>
    );
}


export default observer(EditProfileScreen);