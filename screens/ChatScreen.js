import {observer} from "mobx-react";
import {useStore} from "../stores/store";
import {useEffect, useState} from "react";
import {Image, StyleSheet, Text, View} from "react-native";
import * as React from "react";
import { v4 } from 'uuid';
import 'react-native-get-random-values';
import type {messageSent} from "../stores/commentStore";
import {StatusBar} from "expo-status-bar";
import {
    BackIcon,
    ChatContainer,
    ChatFrame, ChatHeaderContainer, ChatInnerFrame, Colors,
    InnerContainer, LeftIcon,
    Message, MessageInput, PageTitle, PageTitleChat,
    ProfileImage, RightIcon, SendIcon,
    StyledContainer, StyledContainerChat, StyledFormArea, StyledInputLabel, StyledTextInput, Test,
    UserName,
} from "../components/styles";
import KeyBoardAvoidingWrapper from "../components/KeyBoardAvoidingWrapper";
import {Ionicons, Octicons} from "@expo/vector-icons";
import {Formik} from "formik";


// colors
const {darkLight, tertiary} = Colors;

function ChatScreen ({ route, navigation }) {
    const {commentStore, casterStore} = useStore();
    const { id } = route.params;
    const [currentRoomId, setCurrentRoomId] = useState('');
    const [localMessage, setLocalMessage] = useState('');

    // Function to enter a chat room
    const enterRoom = (id) => {
        // For future changing
        setCurrentRoomId("ad4cff79-928d-4efc-9e28-a86151a95436");

        // Method to join a chatroom
        commentStore.joinRoom(id, currentRoomId).then(() => {
            navigation.setOptions({ title: commentStore.test2.name });
        });
    }

    // Function to send a message
    const sendMessage = () => {
        const message: messageSent = {
            ChatRoomId: commentStore.test2.id,
            Id: v4(),
            Text: localMessage,
            Username: casterStore.caster.name,
        }
        commentStore.addComment(message).then(() => {
        });
        setLocalMessage('');
    }

    useEffect(() => {
        enterRoom(id);
    }, []);

    const listItems = commentStore.test2.messages.map((message: message, index) => (
        <View style={styles.flexRow} key={index}>
            <View>
                <Image
                    style={styles.message_Image}
                    source={require('../assets/images/1646754967359.png')}
                />
            </View>
            <View style={styles.flexColumn}>
                <Text style={styles.message_UserName}>{message.username}</Text>
                <Text style={styles.message_Text}>{message.text}</Text>
            </View>
        </View>
    ));

    const ChatMessage = commentStore.test2.messages.map((message: message, index) => (
            <ChatFrame key={index}>
                <ProfileImage source={require('../assets/images/1646754967359.png')} />
                <ChatInnerFrame>
                    <UserName>{message.username}</UserName>
                    <Message>{message.text}</Message>
                </ChatInnerFrame>
            </ChatFrame>
    ));

    const ChatMessageContainer = () => {
        return (
            <ChatContainer>{ChatMessage}</ChatContainer>
        )
    };

    const GoBack = () => {
        navigation.navigate("ChatRooms");
    }


    const ChatHeader = () => {
        return (
            <ChatHeaderContainer>
                <BackIcon onPress={() => navigation.navigate("Chat1")}>
                    <Ionicons name={"arrow-back-outline"} size={30} color={tertiary} />
                </BackIcon>
                <Test>
                <PageTitleChat>{commentStore.test2.name}</PageTitleChat>
                </Test>
            </ChatHeaderContainer>
        )
    };

    const MyTextInput = () => {
        return (
            <View>
                <MessageInput placeholder={"fisk"} value={localMessage} onChangeText={setLocalMessage}></MessageInput>
                <SendIcon onPress={() => sendMessage}>
                    <Ionicons name={"paper-plane-outline"} size={30} color={darkLight} />
                </SendIcon>
            </View>
        )
    }




    return (
            <StyledContainerChat>
                <StatusBar style={"dark"}></StatusBar>
                <InnerContainer>
                    <ChatHeader />
                    <ChatMessageContainer />
                    <MessageInput placeholder={"Message.."} value={localMessage} onChangeText={setLocalMessage}></MessageInput>
                    <SendIcon onPress={sendMessage}>
                        <Ionicons name={"paper-plane-outline"} size={30} color={darkLight} />
                    </SendIcon>
                </InnerContainer>
            </StyledContainerChat>
    );
}

const styles = StyleSheet.create({
    message_Image: {
        width: 50,
        height: 50,
        marginRight: 15,
        borderRadius: 30,
    },
    message_List: {
        height: 400,
        backgroundColor: '#181818',
    },
    flexColumn: {
        flexDirection: 'column',
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 40,
        paddingBottom: 20,
    },
    message_Text: {
        color: '#FFFFFF',
        fontSize: 12,
        fontFamily: 'Uranium',
    },
    message_UserName: {
        color: '#FFFFFF',
        fontSize: 15,
        fontFamily: 'Uranium',
        fontWeight: 'bold',
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    connectedto: {
        fontSize: 10,
        fontStyle: 'italic',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
    fields: {
        marginTop: 20,
        paddingLeft: 10,
        fontSize: 15,
        height: 40,
        borderWidth: 1,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: 'black',
    },
    button: {
        borderWidth: 2,
        borderColor: '#89AAFF',
        width: 109,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginRight: 20,
    },
    buttonText_enabled: {
        fontSize: 20,
        color: 'black',
    },
    buttonText_disabled: {
        fontSize: 20,
        color: '#dfe1e6',
    },
    messagelogitem: {
        backgroundColor: '#f9c2ff',
        padding: 10,
        marginVertical: 4,
        marginHorizontal: 4,
    },
    messageList: {
        marginTop: 90,
    },
    test: {
        backgroundColor: '#181818',
    },
    test4: {
        backgroundColor: '#181818',
        maxHeight: 300,
    },
    test2: {
        color: '#FFFFFF',
        fontSize: 25,
        textAlign: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        fontFamily: 'StateWideSoft-Bold',
    },
    MessageElement__Text: {},
    MessageElement__Image: {},
    MessageElement__Username: {},
    test5: {
        backgroundColor: "#21FA21",
    }
});

export default observer(ChatScreen);
