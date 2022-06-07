import * as React from "react";
import { useStore } from "../../stores/store";

// styles
import { ChatContainer,
    ChatFrame,
    ChatInnerFrame,
    Message,
    ProfileImage,
    UserName
} from "../styles";

const ChatMessageContainerComponent = () => {
    const { chatStore } = useStore();

    const ChatMessages = chatStore.chatMessages.map((message: message, index) => (
        <ChatFrame key={index}>
            <ProfileImage source={{uri: message.profileImageUrl !== '' ? message.profileImageUrl : "../assets/images/Temp/ProfileImagePlaceholder.jpg"}} />
            <ChatInnerFrame>
                <UserName>{message.username}</UserName>
                <Message>{message.text}</Message>
            </ChatInnerFrame>
        </ChatFrame>
    ));

    return (
        <ChatContainer>{ChatMessages}</ChatContainer>
    )
};

export default ChatMessageContainerComponent;