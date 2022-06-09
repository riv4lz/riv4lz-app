import { observer } from "mobx-react";
import { useStore } from "../stores/store";
import { useEffect, useState } from "react";
import * as React from "react";
import { v4 } from 'uuid';
import 'react-native-get-random-values';
import type { messageSent } from "../stores/chatStore";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import MyTextInput from "../components/login/MyTextInput";
import ChatHeaderComponent from "../components/chat/ChatHeader";
import ChatMessageContainerComponent from "../components/chat/ChatMessageContainerComponent";

// styles
import {
    Colors,
    InnerContainer,
    SendIcon,
    StyledContainerChat,
} from "../components/styles";


// colors
const { darkLight } = Colors;

function ChatScreen ({ route, navigation }) {
    const { chatStore , userStore } = useStore();
    const { id } = route.params;
    const [currentRoomId, setCurrentRoomId] = useState('');
    const [localMessage, setLocalMessage] = useState('');

    useEffect(() => {
        console.log(id);
        enterRoom(id);
    }, []);


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

    return (
            <StyledContainerChat>
                <StatusBar style={"dark"}></StatusBar>
                <InnerContainer>
                    <ChatHeaderComponent />
                    <ChatMessageContainerComponent />
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
