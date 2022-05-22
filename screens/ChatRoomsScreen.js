import { View } from "react-native";
import type {ChatRoom} from "../stores/commentStore";
import {useStore} from "../stores/store";
import React, {useEffect, useState} from "react";
import {
    InnerContainer,
    PageLogo,
    PageTitle,
    RoomButtons,
    RoomButtonsImage,
    StyledContainer,
    SubTitle
} from "../components/styles";
import { StatusBar } from "expo-status-bar";

function ChatRoomsScreen ({ navigation }) {
    const {commentStore} = useStore();

    useEffect(() => {
    }, []);

    const roomsList = commentStore.test.map((chatRoom: ChatRoom) => (
        <View key={chatRoom.id}>
            <RoomButtons onPress={() => navigation.navigate('Chat2', {
                id: chatRoom.id,
            })}>
                <RoomButtonsImage imageStyle={{ borderRadius: 50}} source={require("../assets/images/GameLogos/" + "lol" + ".jpg")}>
                </RoomButtonsImage>
            </RoomButtons>
        </View>
    ));


    return (
        <StyledContainer>
            <StatusBar style={"dark"}></StatusBar>
            <InnerContainer>
                <PageLogo resizeMode="contain" source={require("../assets/svgs/logos/Brand_Logo.png")}></PageLogo>
                <PageTitle>ChatRooms</PageTitle>
                <SubTitle>Select a room to begin</SubTitle>
            <View>{roomsList}</View>
            </InnerContainer>
        </StyledContainer>
    );
}
export default ChatRoomsScreen;
