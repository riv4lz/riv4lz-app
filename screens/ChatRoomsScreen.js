import React from "react";
import { StatusBar } from "expo-status-bar";
import ChatRoomsListComponent from "../components/chat/ChatRoomsListComponent";

// styles
import {
    InnerContainer,
    PageLogo,
    PageTitle,
    StyledContainerGrid,
    SubTitle
} from "../components/styles";

function ChatRoomsScreen () {

    return (
        <StyledContainerGrid>
            <StatusBar style={"dark"}></StatusBar>
            <InnerContainer>
                <PageLogo resizeMode="contain" source={require("../assets/svgs/logos/Brand_Logo.png")}></PageLogo>
                <PageTitle>ChatRooms</PageTitle>
                <SubTitle>Select a room to begin</SubTitle>
                <ChatRoomsListComponent/>
            </InnerContainer>
        </StyledContainerGrid>
    );
}
export default ChatRoomsScreen;
