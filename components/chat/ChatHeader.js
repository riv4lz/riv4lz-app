import {BackIcon, ChatHeaderContainer, Colors, PageTitleChat, Test} from "../styles";
import {Ionicons} from "@expo/vector-icons";
import * as React from "react";
import {useStore} from "../../stores/store";
import {useNavigation} from "@react-navigation/native";
import {observer} from "mobx-react";

// colors
const { tertiary } = Colors;

const ChatHeaderComponent = () => {
    const { chatStore } = useStore();
    const navigation = useNavigation();

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

export default observer(ChatHeaderComponent);