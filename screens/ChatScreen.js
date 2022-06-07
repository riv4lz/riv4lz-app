import {observer} from "mobx-react";
import {useStore} from "../stores/store";
import {useEffect, useState} from "react";
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
import ProfileImagePlaceholder from "../assets/images/Temp/ProfileImagePlaceholder.jpg"


// colors
const {darkLight, tertiary} = Colors;

function ChatScreen ({ route, navigation }) {
    const { chatStore , userStore } = useStore();
    const { id } = route.params;
    const [currentRoomId, setCurrentRoomId] = useState('');
    const [localMessage, setLocalMessage] = useState('');

    // Function to enter a chat room
    const enterRoom = (id) => {
        // For future changing
        setCurrentRoomId("ad4cff79-928d-4efc-9e28-a86151a95436");

        // Method to join a chatroom
        chatStore.joinRoom(id, currentRoomId).then(() => {
            navigation.setOptions({ title: chatStore.currentRoom.name });
        });
    }

    // Function to send a message
    const sendMessage = () => {
        const message: messageSent = {
            ChatRoomId: chatStore.currentRoom.id,
            Id: v4(),
            Text: localMessage,
            Username: userStore.user.name,
            userId: userStore.user.id,
            profileImageUrl: userStore.user.profileImageUrl,
        }
        chatStore.addComment(message).then(() => {
        });
        setLocalMessage('');
    }

    useEffect(() => {
        enterRoom(id);
    }, []);

    const ChatMessage = chatStore.chatMessages.map((message: message, index) => (
            <ChatFrame key={index}>
                <ProfileImage source={{uri: message.profileImageUrl !== '' ? message.profileImageUrl : "../assets/images/Temp/ProfileImagePlaceholder.jpg"}} />
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

    const ChatHeader = () => {
        return (
            <ChatHeaderContainer>
                <BackIcon onPress={() => navigation.navigate("ChatRoomScreen")}>
                    <Ionicons name={"arrow-back-outline"} size={30} color={tertiary} />
                </BackIcon>
                <Test>
                <PageTitleChat>{chatStore.currentRoom.name}</PageTitleChat>
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
