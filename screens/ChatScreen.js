import {observer} from "mobx-react";
import {useStore} from "../stores/store";
import {useEffect, useState} from "react";
import {Image, StyleSheet, Text, View} from "react-native";
import * as React from "react";
import { v4 } from 'uuid';
import 'react-native-get-random-values';
import type {messageSent} from "../stores/chatStore";
import {StatusBar} from "expo-status-bar";
import {
    BackIcon,
    ChatContainer,
    ChatFrame, ChatHeaderContainer, ChatInnerFrame, Colors,
    InnerContainer, LeftIcon,
    Message, MessageInput, PageTitle, PageTitleChat,
    ProfileImage, RightIcon, SendIcon,
    StyledContainer, StyledContainerChat, StyledFormArea, StyledInputLabel, StyledTextInput, Test,
    UserName,
} from "../components/styles";
import KeyBoardAvoidingWrapper from "../components/KeyBoardAvoidingWrapper";
import {Ionicons, Octicons} from "@expo/vector-icons";
import {Formik} from "formik";
import MyTextInput from "../components/login/MyTextInput";


// colors
const {darkLight, tertiary} = Colors;

function ChatScreen ({ route, navigation }) {
    const {commentStore, casterStore} = useStore();
    const { id } = route.params;
    const [currentRoomId, setCurrentRoomId] = useState('');
    const [localMessage, setLocalMessage] = useState('');

    // Function to enter a chat room
    const enterRoom = (id) => {
        // For future changing
        setCurrentRoomId("ad4cff79-928d-4efc-9e28-a86151a95436");

        // Method to join a chatroom
        commentStore.joinRoom(id, currentRoomId).then(() => {
            navigation.setOptions({ title: commentStore.currentRoom.name });
        });
    }

    // Function to send a message
    const sendMessage = () => {
        const message: messageSent = {
            ChatRoomId: commentStore.currentRoom.id,
            Id: v4(),
            Text: localMessage,
            Username: casterStore.caster.name,
        }
        commentStore.addComment(message).then(() => {
        });
        setLocalMessage('');
    }

    useEffect(() => {
        enterRoom(id);
    }, []);

    const ChatMessage = commentStore.chatMessages.map((message: message, index) => (
            <ChatFrame key={index}>
                <ProfileImage source={require('../assets/images/1646754967359.png')} />
                <ChatInnerFrame>
                    <UserName>{message.username}</UserName>
                    <Message>{message.text}</Message>
                </ChatInnerFrame>
            </ChatFrame>
    ));

    const ChatMessageContainer = () => {
        return (
            <ChatContainer>{ChatMessage}</ChatContainer>
        )
    };

    const GoBack = () => {
        navigation.navigate("ChatRooms");
    }


    const ChatHeader = () => {
        return (
            <ChatHeaderContainer>
                <BackIcon onPress={() => navigation.navigate("Chat1")}>
                    <Ionicons name={"arrow-back-outline"} size={30} color={tertiary} />
                </BackIcon>
                <Test>
                <PageTitleChat>{commentStore.currentRoom.name}</PageTitleChat>
                </Test>
            </ChatHeaderContainer>
        )
    };



    return (
            <StyledContainerChat>
                <StatusBar style={"dark"}></StatusBar>
                <InnerContainer>
                    <ChatHeader />
                    <ChatMessageContainer />
                    <MyTextInput
                        icon={"mail"}
                        placeholder={"Message..."}
                        placerholderTextColor={darkLight}
                        onChangeText={setLocalMessage}
                        value={localMessage}
                    />
                    <SendIcon onPress={sendMessage}>
                        <Ionicons name={"paper-plane-outline"} size={30} color={darkLight} />
                    </SendIcon>
                </InnerContainer>
            </StyledContainerChat>
    );
}

export default observer(ChatScreen);
