import type {ChatRoom} from "../stores/chatStore";
import {useStore} from "../stores/store";
import React, { useEffect } from "react";

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

function ChatRoomsScreen ({ navigation }) {
    const { chatStore } = useStore();

    useEffect(() => {
    }, []);


    // Creating the
    const roomsList = chatStore.chatRooms.map((chatRoom: ChatRoom) => (
        <ChatRoomContainer key={chatRoom.id}>
            <RoomButtons onPress={() => navigation.navigate('Chat2', {
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
            <InnerContainerGrid>{roomsList}</InnerContainerGrid>
            </InnerContainer>
        </StyledContainerGrid>
    );
}
export default ChatRoomsScreen;
