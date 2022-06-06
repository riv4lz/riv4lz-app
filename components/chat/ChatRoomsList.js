import { View, Text } from "react-native";
import type {ChatRoom} from "../stores/commentStore";
import {useStore} from "../stores/store";
import React, {useEffect, useState} from "react";

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

function ChatRoomsList ({ navigation }) {

    const {commentStore} = useStore();

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
}
