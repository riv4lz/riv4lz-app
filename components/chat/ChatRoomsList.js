import { View } from "react-native";
import type { ChatRoom } from "../../stores/chatStore";
import React from "react";
import { useStore } from "../../stores/store";

// styles
import {
    ChatRoomContainer,
    ChatRoomName,
    InnerContainerGrid,
    RoomButtons,
    RoomButtonsImage,
} from "../styles";

const ChatRoomsList = ({ navigation }) => {
    const { chatStore } = useStore();

    return (
        <InnerContainerGrid>
            {chatStore.chatRooms.map((chatRoom: ChatRoom) => (
                <ChatRoomContainer key={chatRoom.id}>
                    <RoomButtons onPress={() => navigation.navigate('ChatScreen', {
                        id: chatRoom.id,
                    })}>
                        <RoomButtonsImage imageStyle={{ borderRadius: 50}} source={require("../../assets/images/GameLogos/lol.jpg")}>
                        </RoomButtonsImage>
                    </RoomButtons>
                    <ChatRoomName>{chatRoom.name}</ChatRoomName>
                </ChatRoomContainer>
            ))}
        </InnerContainerGrid>
    )
}

export default ChatRoomsList;