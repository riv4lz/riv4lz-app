import { View, Text } from "react-native";
import type {ChatRoom} from "../stores/commentStore";
import {useStore} from "../stores/store";
import React, {useEffect, useState} from "react";
import {
    ChatRoomContainer, ChatRoomName,
    InnerContainer, InnerContainerGrid,
    PageLogo,
    PageTitle,
    RoomButtons,
    RoomButtonsImage,
    StyledContainer, StyledContainerGrid,
    SubTitle, TestContainer
} from "../components/styles";
import { StatusBar } from "expo-status-bar";

function ChatRoomsScreen ({ navigation }) {

    const numbers = ["counter strike", "lol", "wow", "general"];
    const doubled = numbers.map((name) => console.log(name));

    const {commentStore} = useStore();

    useEffect(() => {
        const doubled = numbers.map((name) => console.log(name));
    }, []);

    const roomsList = commentStore.test.map((chatRoom: ChatRoom) => (
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
