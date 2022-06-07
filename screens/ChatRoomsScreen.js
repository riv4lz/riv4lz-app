import type {ChatRoom} from "../stores/chatStore";
import {useStore} from "../stores/store";
import React from "react";

// styles
import {
    ChatRoomContainer,
    ChatRoomName,
    InnerContainer,
    InnerContainerGrid,
    PageLogo,
    PageTitle,
    RoomButtons,
    RoomButtonsImage,
    StyledContainerGrid,
    SubTitle
} from "../components/styles";

import { StatusBar } from "expo-status-bar";
import ChatRoomsList from "../components/chat/ChatRoomsList";

function ChatRoomsScreen ({ navigation }) {
    const { chatStore } = useStore();

    // Creating the list of chat rooms
    const roomsList = chatStore.chatRooms.map((chatRoom: ChatRoom) => (
        <ChatRoomContainer key={chatRoom.id}>
            <RoomButtons onPress={() => navigation.navigate('ChatScreen', {
                id: chatRoom.id,
            })}>
                <RoomButtonsImage imageStyle={{ borderRadius: 50}} source={require("../assets/images/GameLogos/" + "lol" + ".jpg")}>
                </RoomButtonsImage>
            </RoomButtons>
                <ChatRoomName>{chatRoom.name}</ChatRoomName>
        </ChatRoomContainer>
    ));


    return (
        <StyledContainerGrid>
            <StatusBar style={"dark"}></StatusBar>
            <InnerContainer>
                <PageLogo resizeMode="contain" source={require("../assets/svgs/logos/Brand_Logo.png")}></PageLogo>
                <PageTitle>ChatRooms</PageTitle>
                <SubTitle>Select a room to begin</SubTitle>
            <ChatRoomsList/>
            </InnerContainer>
        </StyledContainerGrid>
    );
}
export default ChatRoomsScreen;
